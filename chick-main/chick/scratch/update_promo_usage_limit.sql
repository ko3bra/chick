-- Update promo_codes table with usage limits
ALTER TABLE public.promo_codes 
ADD COLUMN IF NOT EXISTS usage_limit INT DEFAULT NULL, -- NULL means unlimited
ADD COLUMN IF NOT EXISTS usage_count INT DEFAULT 0;

-- Optional: Create a function to safely increment usage count
CREATE OR REPLACE FUNCTION increment_promo_usage(promo_code_text TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE promo_codes 
  SET usage_count = usage_count + 1
  WHERE code = promo_code_text;
END;
$$ LANGUAGE plpgsql;
