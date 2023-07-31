import { createClient } from '@supabase/supabase-js';

const publicSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async (req, res) => {
  const { messageId } = req.query;

  // Get the full response without destructuring
  const response = await publicSupabase
    .from('Message Cards')
    .select('*')
    .eq('message_id', messageId)
    .single();


  // Now, destructure to get data and error
  const { data, error } = response;

  if (error) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(data);
};
