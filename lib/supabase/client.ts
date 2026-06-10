import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    )
  }

  return createBrowserClient(
    supabaseUrl || '',
    supabaseKey || ''
  )
}
