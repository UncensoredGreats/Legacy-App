import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.from('cards').select();
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
