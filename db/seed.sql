-- =====================================================
-- ZAWIOS.IO — Demo Seed Data
-- Run after schema.sql in your Supabase SQL editor
-- Note: Replace UUIDs with actual auth user IDs after signup
-- =====================================================

-- This seed data is for demonstration purposes.
-- In production, create users through Supabase Auth first,
-- then their profiles are auto-created via the trigger.

-- Verify categories exist (already seeded in schema.sql)
SELECT * FROM categories;

-- Sample prediction (to be created after real users exist)
-- INSERT INTO predictions (title, description, category, type, status, created_by, resolution_date, vote_count, featured, tags)
-- VALUES (
--   'Will AI surpass human performance on all standard benchmarks by end of 2025?',
--   'Considering recent advances in large language models...',
--   'technology',
--   'yes_no',
--   'open',
--   'YOUR_USER_UUID',
--   '2025-12-31',
--   4821,
--   true,
--   ARRAY['AI', 'machine learning', 'benchmarks']
-- );
