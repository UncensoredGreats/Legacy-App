import React, { useState, useEffect } from 'react';
import { Label } from 'semantic-ui-react';
import handleStarClick from './authorcardFavorite';
import { getCurrentUserId } from './getCurrentUserId';
import { supabase } from '../../app/authModal';

const FavoriteStar = ({ msgId, author, messageContent, sourceTitle, sourceHeading, sourceContent, sourceSummaries, sourceMetasummary, payload, query, promptStyleString }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [someUserId, setSomeUserId] = useState(null);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      let userId = await getCurrentUserId();

      if (userId) {
        setSomeUserId(userId);
        let { data: existingFavorite, error } = await supabase
          .from('Message Cards')
          .select('*')
          .eq('user_id', userId)
          .eq('message_id', msgId);

        if (error) {
          console.error('Error fetching data: ', error);
          return;
        }

        setIsFavorited(existingFavorite.length > 0);
      }
    };

    checkFavoriteStatus();
  }, [msgId]);


  const onStarClick = (event) => {
    event.stopPropagation();
    handleStarClick(someUserId, msgId, author, messageContent, sourceTitle, sourceHeading, sourceContent, sourceSummaries, sourceMetasummary, payload, setIsFavorited, query, promptStyleString);
  };
  

  return (
    <Label 
      as='a' 
      corner='left' 
      icon={{name:'favorite', color: isFavorited ? 'yellow' : 'black'}}
      style={{backgroundColor: isFavorited ? 'yellow' : 'black'}} 
      onClick={onStarClick} 
    />
  );
};

export default FavoriteStar;
