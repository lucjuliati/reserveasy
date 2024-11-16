import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
dotenv.config()

const db = createClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.PUBLIC_SUPABASE_ANON_KEY
)

export default db.schema('reserveasy')