// Adding setUserInteractions to have realtime UI Updates.
import { useState, useEffect } from 'react';
import { supabase } from '../../../../app/authModal';

interface UserInteractions {
  like?: number;
  rating?: number;
  report?: number;
  // Add other interaction types here if needed
}

const useUserInteractions = (userId, messageId) => {
  const [userInteractions, setUserInteractions] = useState<UserInteractions>({});

  useEffect(() => {
    const fetchUserInteractions = async () => {
      const { data: interactions, error } = await supabase
        .from('PostInteractions')
        .select('interaction_type, value')
        .eq('user_id', userId)
        .eq('message_id', messageId);

      if (error) {
        console.error('Error fetching user interactions: ', error);
      } else {
        const interactionMap = interactions.reduce((acc, {interaction_type, value}) => {
          acc[interaction_type] = value;
          return acc;
        }, {});

        setUserInteractions(interactionMap);
      }
    };

    if (userId && messageId) {
      fetchUserInteractions();
    }
  }, [userId, messageId]);

  return { userInteractions, setUserInteractions };
};

export default useUserInteractions;
