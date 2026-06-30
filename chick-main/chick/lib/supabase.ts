import { createClient } from '@supabase/supabase-js';

const FALLBACK_URL = 'https://szktygmanoyniopzlxwf.supabase.co';
const FALLBACK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6a3R5Z21hbm95bmlvcHpseHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDIxMjUsImV4cCI6MjA5MzQ3ODEyNX0.Wr7I6h_rOAMaqdDxZ4LRKKYJVuaT6YRBEOr3qbCRnLI';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Database functionality will be limited.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
