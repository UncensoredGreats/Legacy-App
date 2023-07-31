import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function useRequestLimit() {
  const [isRateLimited, setIsRateLimited] = useState(false);

  const checkRateLimit = async (userId) => {
    // Get the current user's id

    // Only apply rate limiting if a user is logged in
    if (userId) {
      // Check the number of requests made by this user today
      let { data: requestCount, error: countError } = await supabase
        .from('requestCounts')
        .select('count')
        .eq('user_id', userId)
        .eq('date', new Date().toISOString().split('T')[0]);

      if (countError) {
        console.error('Error fetching request count:', countError);
        return;
      }

      // If the request limit has been reached, set isRateLimited state to true
      if (requestCount && requestCount.length > 0 && requestCount[0].count >= 60) {
        setIsRateLimited(true);
        return;
      }

      // If the request limit has not been reached, increment the count or initialize it
      if (!requestCount || requestCount.length === 0) {
        // Initialize the count
        let { error: initError } = await supabase
          .from('requestCounts')
          .insert([
            { 
              user_id: userId,
              date: new Date().toISOString().split('T')[0],
              count: 1 
            },
          ]);

        if (initError) {
          console.error('Error initializing request count:', initError);
        }
      } else {
        // Increment the count
        let { data: currentCount, error: getCountError } = await supabase
          .from('requestCounts')
          .select('count')
          .eq('user_id', userId)
          .eq('date', new Date().toISOString().split('T')[0]);

        if (getCountError) {
          console.error('Error fetching request count:', getCountError);
          return;
        }

        if (currentCount && currentCount.length > 0) {
          let { error: updateError } = await supabase
            .from('requestCounts')
            .update({ count: currentCount[0].count + 1 })
            .eq('user_id', userId)
            .eq('date', new Date().toISOString().split('T')[0]);

          if (updateError) {
            console.error('Error updating request count:', updateError);
          }
        }
      }
    }
  }

  return { isRateLimited, checkRateLimit };
}




