
-- Fix the SQL function search_path issue
-- Update the existing update_updated_at function to have a secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update OTP expiry time to 10 minutes (600 seconds) for better security
-- This is done through Supabase Auth configuration
-- Note: The OTP expiry time needs to be set in the Supabase Dashboard
-- Authentication → Providers → Email → OTP Expiry Time
-- Set it to 600 seconds (10 minutes) instead of the current >1 hour setting
