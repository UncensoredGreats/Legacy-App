import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../app/authModal';

// export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export async function getCurrentUserId() {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.log('An error occurred while fetching user data:', error.message)
    return null
  } else if (data) {
    return data.user.id
  } else {
    console.log('No user is currently logged in.')
    return null
  }
}