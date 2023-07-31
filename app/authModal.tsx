// Version trying to use supabase login functions.
import { Auth } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export function getAuthState() {
  return supabase.auth.getUser();
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Database creds are not availible.");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const AuthModal = () => (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={['google', 'github']}
    />
  );
  
export default AuthModal;
export { supabase };
