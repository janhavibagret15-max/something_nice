import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null until you add the two keys to .env.local. The app still works without
// them (no login), so you can keep building before Supabase is set up.
export const supabase = url && key ? createClient(url, key) : null