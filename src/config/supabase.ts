import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseCreateClient = (token:string) => {
  return createClient(supabaseUrl,supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}}`
      }
    }
  })
}
export const supabaseServiceRole = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
