-- ═══════════════════════════════════════════════════════
--  ZAWIOS — Comments + Reactions migration (2026-04-11)
-- ═══════════════════════════════════════════════════════

-- ─── signal_comments ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS signal_comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  signal_id   UUID NOT NULL REFERENCES signals(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id   UUID REFERENCES signal_comments(id) ON DELETE CASCADE,  -- for replies
  body        TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 1000),
  edited      BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_signal_comments_signal ON signal_comments(signal_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_signal_comments_user   ON signal_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_signal_comments_parent ON signal_comments(parent_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_comment_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_comment_updated_at ON signal_comments;
CREATE TRIGGER trg_comment_updated_at
  BEFORE UPDATE ON signal_comments
  FOR EACH ROW EXECUTE FUNCTION update_comment_updated_at();

-- Maintain comment_count on signals table (add column if missing)
ALTER TABLE signals ADD COLUMN IF NOT EXISTS comment_count INTEGER NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION recalc_comment_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  affected_id UUID;
BEGIN
  affected_id := COALESCE(NEW.signal_id, OLD.signal_id);
  UPDATE signals
    SET comment_count = (
      SELECT COUNT(*) FROM signal_comments WHERE signal_id = affected_id
    )
  WHERE id = affected_id;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_recalc_comment_count ON signal_comments;
CREATE TRIGGER trg_recalc_comment_count
  AFTER INSERT OR UPDATE OR DELETE ON signal_comments
  FOR EACH ROW EXECUTE FUNCTION recalc_comment_count();

-- ─── signal_reactions ────────────────────────────────────────────────────────
-- Reaction types: fire | wow | think | skeptic | clap
CREATE TABLE IF NOT EXISTS signal_reactions (
  signal_id     UUID NOT NULL REFERENCES signals(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('fire','wow','think','skeptic','clap')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (signal_id, user_id)  -- one reaction per user per signal (last wins via upsert)
);

CREATE INDEX IF NOT EXISTS idx_signal_reactions_signal ON signal_reactions(signal_id);

-- ─── RLS ─────────────────────────────────────────────────────────────────────
ALTER TABLE signal_comments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE signal_reactions ENABLE ROW LEVEL SECURITY;

-- Comments: anyone can read, authenticated users can insert/update/delete own
DROP POLICY IF EXISTS "comments_read_all"       ON signal_comments;
DROP POLICY IF EXISTS "comments_insert_auth"    ON signal_comments;
DROP POLICY IF EXISTS "comments_update_own"     ON signal_comments;
DROP POLICY IF EXISTS "comments_delete_own"     ON signal_comments;

CREATE POLICY "comments_read_all"    ON signal_comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_auth" ON signal_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_update_own"  ON signal_comments FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "comments_delete_own"  ON signal_comments FOR DELETE
  USING (auth.uid() = user_id);

-- Reactions: anyone can read, authenticated can upsert/delete own
DROP POLICY IF EXISTS "reactions_read_all"    ON signal_reactions;
DROP POLICY IF EXISTS "reactions_insert_auth" ON signal_reactions;
DROP POLICY IF EXISTS "reactions_delete_own"  ON signal_reactions;

CREATE POLICY "reactions_read_all"    ON signal_reactions FOR SELECT USING (true);
CREATE POLICY "reactions_insert_auth" ON signal_reactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reactions_delete_own"  ON signal_reactions FOR DELETE
  USING (auth.uid() = user_id);

-- ─── RPC: get_signal_comments ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_signal_comments(
  p_signal_id UUID,
  p_limit     INTEGER DEFAULT 30,
  p_offset    INTEGER DEFAULT 0
)
RETURNS TABLE (
  id          UUID,
  parent_id   UUID,
  body        TEXT,
  edited      BOOLEAN,
  created_at  TIMESTAMPTZ,
  user_id     UUID,
  username    TEXT,
  full_name   TEXT,
  avatar_url  TEXT,
  is_premium  BOOLEAN
) LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT
    c.id,
    c.parent_id,
    c.body,
    c.edited,
    c.created_at,
    c.user_id,
    p.username,
    p.full_name,
    p.avatar_url,
    p.is_premium
  FROM signal_comments c
  LEFT JOIN profiles p ON p.user_id = c.user_id
  WHERE c.signal_id = p_signal_id
    AND c.parent_id IS NULL        -- top-level only; replies fetched separately
  ORDER BY c.created_at ASC
  LIMIT p_limit
  OFFSET p_offset;
$$;

-- ─── RPC: get_reaction_counts ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_reaction_counts(p_signal_id UUID)
RETURNS TABLE (reaction_type TEXT, count BIGINT) LANGUAGE sql STABLE AS $$
  SELECT reaction_type, COUNT(*) AS count
  FROM signal_reactions
  WHERE signal_id = p_signal_id
  GROUP BY reaction_type;
$$;
