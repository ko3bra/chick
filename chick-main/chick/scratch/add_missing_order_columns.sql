-- Final migration to fix order persistence and dashboard details
-- RUN THIS IN YOUR SUPABASE SQL EDITOR (https://supabase.com/dashboard/project/_/sql)

ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS service_type TEXT,
ADD COLUMN IF NOT EXISTS scheduled_time TEXT,
ADD COLUMN IF NOT EXISTS promo_code TEXT,
ADD COLUMN IF NOT EXISTS discount NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_method TEXT,
ADD COLUMN IF NOT EXISTS customer_phone TEXT,
ADD COLUMN IF NOT EXISTS delivery_address TEXT,
ADD COLUMN IF NOT EXISTS order_details JSONB;

-- Ensure RLS is configured for public access (as per existing setup)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public all access" ON public.orders;
CREATE POLICY "Public all access" ON public.orders FOR ALL USING (true) WITH CHECK (true);
