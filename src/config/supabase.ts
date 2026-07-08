import {create} from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = create(supabaseUrl, supabaseKey);
export const supabaseServiceRole = create(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
