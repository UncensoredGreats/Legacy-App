// handleRating.js
import { supabase } from '../../../../app/authModal';

const handleRating = async (someUserId, msgId, ratingValue, callback) => {
  let { data: existingRating, error } = await supabase
    .from('PostInteractions')
    .select('*')
    .eq('user_id', someUserId)
    .eq('message_id', msgId)
    .eq('interaction_type', 'rating');

  if (error) {
    console.error('Error fetching data: ', error);
    return;
  }

  // If the post is already rated by this user, update it or delete if rating is 0
  if (existingRating.length > 0) {
    if(ratingValue === 0) { // If rating is 0, delete the record
      let { error } = await supabase
        .from('PostInteractions')
        .delete()
        .eq('user_id', someUserId)
        .eq('message_id', msgId)
        .eq('interaction_type', 'rating');

      if (error) {
        console.error('Error deleting data: ', error);
      } else {
        console.log('Successfully deleted data');
        callback(false); // Pass false as the callback to indicate no rating
      }
      return ratingValue;
    } else { // Else, update the rating
      let { data, error } = await supabase
        .from('PostInteractions')
        .update({ value: ratingValue })
        .eq('user_id', someUserId)
        .eq('message_id', msgId)
        .eq('interaction_type', 'rating');

      if (error) {
        console.error('Error updating data: ', error);
      } else {
        console.log('Successfully updated data: ', data);
        callback(true);
      }
      return ratingValue;
    }
  }

  // If the post is not rated by this user, add it
  else {
    let { data, error } = await supabase
      .from('PostInteractions')
      .insert([
        { 
          user_id: someUserId,
          message_id: msgId, 
          interaction_type: 'rating',
          value: ratingValue
        },
      ]);

    if (error) {
      console.error('Error inserting data: ', error);
    } else { 
      console.log('Successfully inserted data: ', data);
      callback(true);
    }
    return ratingValue;
  }
}

export default handleRating;