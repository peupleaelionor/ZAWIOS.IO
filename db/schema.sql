-- =====================================================
-- ZAWIOS.IO — Supabase Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CATEGORIES
-- =====================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE CHECK (name IN ('finance', 'technology', 'politics', 'sports', 'culture', 'business', 'science', 'world')),
  label TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  prediction_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROFILES (extends Supabase auth.users)
-- =====================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE CHECK (username ~ '^[a-zA-Z0-9_]{3,30}$'),
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT CHECK (char_length(bio) <= 500),
  location TEXT,
  website TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for username lookups
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- =====================================================
-- PREDICTIONS
-- =====================================================
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 10 AND 500),
  description TEXT CHECK (char_length(description) <= 5000),
  category TEXT NOT NULL REFERENCES categories(name),
  type TEXT NOT NULL CHECK (type IN ('yes_no', 'multiple_choice', 'probability')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'archived')),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resolution_date TIMESTAMPTZ NOT NULL,
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  vote_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  moderated_at TIMESTAMPTZ,
  moderated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT resolution_date_future CHECK (resolution_date > created_at)
);

-- Indexes
CREATE INDEX idx_predictions_category ON predictions(category);
CREATE INDEX idx_predictions_status ON predictions(status);
CREATE INDEX idx_predictions_created_by ON predictions(created_by);
CREATE INDEX idx_predictions_resolution_date ON predictions(resolution_date);
CREATE INDEX idx_predictions_featured ON predictions(featured) WHERE featured = TRUE;

-- =====================================================
-- PREDICTION OPTIONS
-- =====================================================
CREATE TABLE prediction_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prediction_id UUID NOT NULL REFERENCES predictions(id) ON DELETE CASCADE,
  label TEXT NOT NULL CHECK (char_length(label) BETWEEN 1 AND 200),
  vote_count INTEGER DEFAULT 0,
  is_correct BOOLEAN,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_prediction_options_prediction ON prediction_options(prediction_id);

-- =====================================================
-- VOTES
-- =====================================================
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prediction_id UUID NOT NULL REFERENCES predictions(id) ON DELETE CASCADE,
  option_id UUID REFERENCES prediction_options(id) ON DELETE SET NULL,
  probability INTEGER CHECK (probability BETWEEN 0 AND 100),
  is_yes BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, prediction_id)
);

CREATE INDEX idx_votes_user ON votes(user_id);
CREATE INDEX idx_votes_prediction ON votes(prediction_id);
CREATE INDEX idx_votes_option ON votes(option_id);

-- =====================================================
-- REPUTATION SCORES
-- =====================================================
CREATE TABLE reputation_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  total_score NUMERIC(10, 2) DEFAULT 0,
  accuracy_score NUMERIC(5, 2) DEFAULT 0,
  prediction_count INTEGER DEFAULT 0,
  correct_predictions INTEGER DEFAULT 0,
  accuracy_rate NUMERIC(5, 2) DEFAULT 0,
  global_rank INTEGER,
  category_ranks JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reputation_user ON reputation_scores(user_id);
CREATE INDEX idx_reputation_rank ON reputation_scores(global_rank);
CREATE INDEX idx_reputation_score ON reputation_scores(total_score DESC);

-- =====================================================
-- BADGES
-- =====================================================
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  criteria JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);

-- =====================================================
-- COMMENTS
-- =====================================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prediction_id UUID NOT NULL REFERENCES predictions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 2000),
  upvotes INTEGER DEFAULT 0,
  is_hidden BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_prediction ON comments(prediction_id);
CREATE INDEX idx_comments_user ON comments(user_id);

-- =====================================================
-- REPORTS
-- =====================================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('prediction', 'comment', 'profile')),
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_reporter ON reports(reporter_id);

-- =====================================================
-- SUBSCRIPTIONS
-- =====================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);

-- =====================================================
-- AUDIT LOGS
-- =====================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('prediction_resolved', 'new_comment', 'rank_change', 'badge_awarded', 'system')),
  title TEXT NOT NULL,
  body TEXT,
  metadata JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read) WHERE read = FALSE;

-- =====================================================
-- HELPER FUNCTION: is_admin()
-- =====================================================
-- Returns TRUE when the current JWT user has is_admin = true in profiles.
-- Used by RLS policies. SECURITY DEFINER so it can always read profiles.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- ----- Categories: public read, admin-only write -----
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are publicly viewable" ON categories FOR SELECT USING (TRUE);
CREATE POLICY "Admins can insert categories" ON categories FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update categories" ON categories FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete categories" ON categories FOR DELETE USING (is_admin());

-- ----- Profiles: public read, own write -----
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are publicly viewable" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own profile" ON profiles FOR DELETE USING (auth.uid() = user_id);

-- ----- Predictions: public read, own write, admin moderation -----
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Predictions are publicly viewable" ON predictions FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can create predictions" ON predictions FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own predictions" ON predictions FOR UPDATE USING (auth.uid() = created_by OR is_admin());
CREATE POLICY "Users can delete own predictions" ON predictions FOR DELETE USING (auth.uid() = created_by OR is_admin());

-- ----- Prediction options: public read, prediction owner write -----
ALTER TABLE prediction_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Prediction options are publicly viewable" ON prediction_options FOR SELECT USING (TRUE);
CREATE POLICY "Prediction owner can insert options" ON prediction_options FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM predictions WHERE id = prediction_id AND created_by = auth.uid())
  );
CREATE POLICY "Prediction owner can update options" ON prediction_options FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM predictions WHERE id = prediction_id AND created_by = auth.uid()) OR is_admin()
  );
CREATE POLICY "Prediction owner can delete options" ON prediction_options FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM predictions WHERE id = prediction_id AND created_by = auth.uid()) OR is_admin()
  );

-- ----- Votes: own read/write, enforce user_id match -----
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own votes" ON votes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own votes" ON votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own votes" ON votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own votes" ON votes FOR DELETE USING (auth.uid() = user_id);

-- ----- Reputation scores: public read -----
ALTER TABLE reputation_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reputation scores are public" ON reputation_scores FOR SELECT USING (TRUE);

-- ----- Badges: public read, admin-only write -----
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges are publicly viewable" ON badges FOR SELECT USING (TRUE);
CREATE POLICY "Admins can insert badges" ON badges FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update badges" ON badges FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete badges" ON badges FOR DELETE USING (is_admin());

-- ----- User badges: public read (awarded by system/triggers via service role) -----
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User badges are publicly viewable" ON user_badges FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage user badges" ON user_badges FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can delete user badges" ON user_badges FOR DELETE USING (is_admin());

-- ----- Comments: public read (non-hidden), own write, admin moderation -----
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments are publicly viewable" ON comments FOR SELECT USING (NOT is_hidden OR auth.uid() = user_id OR is_admin());
CREATE POLICY "Authenticated users can comment" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id OR is_admin());

-- ----- Reports: own insert/read, admin full access -----
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own reports" ON reports FOR SELECT USING (auth.uid() = reporter_id OR is_admin());
CREATE POLICY "Authenticated users can create reports" ON reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Admins can update reports" ON reports FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete reports" ON reports FOR DELETE USING (is_admin());

-- ----- Subscriptions: own read, admin full access -----
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Users can update own subscription" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- ----- Audit logs: admin-only read (inserts via service role) -----
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view audit logs" ON audit_logs FOR SELECT USING (is_admin());

-- ----- Notifications: own only -----
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notifications" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || SUBSTRING(NEW.id::TEXT, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  INSERT INTO reputation_scores (user_id) VALUES (NEW.id);
  INSERT INTO subscriptions (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER predictions_updated_at BEFORE UPDATE ON predictions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER votes_updated_at BEFORE UPDATE ON votes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- RECOMMENDED INDEXES (for RLS policy performance)
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(user_id) WHERE is_admin = TRUE;
CREATE INDEX IF NOT EXISTS idx_reports_target ON reports(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_comments_hidden ON comments(prediction_id) WHERE is_hidden = TRUE;

-- =====================================================
-- SEED: CATEGORIES
-- =====================================================
INSERT INTO categories (name, label, description, icon, color) VALUES
  ('technology', 'Technology', 'AI, software, hardware, and digital innovation', 'cpu', '#4F46E5'),
  ('finance', 'Finance', 'Markets, economics, crypto, and monetary policy', 'trending-up', '#10B981'),
  ('politics', 'Politics', 'Elections, policy, geopolitics, and governance', 'landmark', '#8B5CF6'),
  ('sports', 'Sports', 'Results, records, and sporting outcomes', 'trophy', '#F59E0B'),
  ('science', 'Science', 'Research, discoveries, and scientific milestones', 'flask', '#06B6D4'),
  ('business', 'Business', 'Companies, M&A, startups, and market trends', 'briefcase', '#EC4899'),
  ('culture', 'Culture', 'Entertainment, arts, media, and social trends', 'music', '#F97316'),
  ('world', 'World', 'Global events, climate, international affairs', 'globe', '#6366F1');

-- =====================================================
-- SEED: BADGES
-- =====================================================
INSERT INTO badges (name, description, icon, tier) VALUES
  ('First prediction', 'Made your first prediction on ZAWIOS', 'star', 'bronze'),
  ('10 predictions', 'Made 10 predictions on the platform', 'trending-up', 'bronze'),
  ('Sharp mind', 'Achieved 70%+ accuracy on 20+ predictions', 'target', 'silver'),
  ('Tech oracle', 'Top 10% accuracy in Technology category', 'cpu', 'gold'),
  ('Finance guru', 'Top 10% accuracy in Finance category', 'dollar-sign', 'gold'),
  ('Legend', 'Top 1% of all predictors globally', 'crown', 'platinum');
