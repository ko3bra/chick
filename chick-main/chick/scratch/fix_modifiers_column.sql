-- RUN THIS IN YOUR SUPABASE SQL EDITOR TO FIX THE EXTRAS ISSUE
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS modifiers JSONB DEFAULT '[]'::jsonb;

-- Verify the column is added
-- SELECT id, name, modifiers FROM menu_items LIMIT 5;
