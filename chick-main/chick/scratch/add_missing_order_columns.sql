-- Migration to add missing columns to the orders table
-- Run this in your Supabase SQL Editor to support all application features

ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS service_type TEXT,
ADD COLUMN IF NOT EXISTS scheduled_time TEXT,
ADD COLUMN IF NOT EXISTS promo_code TEXT,
ADD COLUMN IF NOT EXISTS discount NUMERIC DEFAULT 0;

-- Optional: Update RLS if needed
-- ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable insert for everyone" ON public.orders FOR INSERT WITH CHECK (true);
