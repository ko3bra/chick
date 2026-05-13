-- 8. Create promo_codes table
CREATE TABLE IF NOT EXISTS promo_codes (
    code TEXT PRIMARY KEY,
    discount_type TEXT NOT NULL DEFAULT 'percentage',
    discount_value NUMERIC NOT NULL,
    min_order_value NUMERIC DEFAULT 0,
    applicable_categories JSONB DEFAULT '[]'::jsonb,
    applicable_products JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for promo_codes
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public select promo_codes" ON promo_codes FOR SELECT USING (true);
CREATE POLICY "Public all access promo_codes" ON promo_codes FOR ALL USING (true);
