// Added real time updates.
import { supabase } from '../../../../app/authModal';

const handleLikeClick = async (someUserId, msgId, callback) => {
  let { data: existingLike, error } = await supabase
    .from('PostInteractions')
    .select('*')
    .eq('user_id', someUserId)
    .eq('message_id', msgId)
    .eq('interaction_type', 'like');

  if (error) {
    console.error('Error fetching data: ', error);
    return;
  }

  // If the post is already liked, delete it
  if (existingLike.length > 0) {
    let { error } = await supabase
      .from('PostInteractions')
      .delete()
      .eq('user_id', someUserId)
      .eq('message_id', msgId)
      .eq('interaction_type', 'like');

    if (error) {
      console.error('Error deleting data: ', error);
    } else { 
      console.log('Successfully deleted data');
      callback(false);
    }

    // Return the updated like state
    return false;
  }

  // If the post is not liked, add it
  else {
    let { data, error } = await supabase
      .from('PostInteractions')
      .insert([
        { 
          user_id: someUserId,
          message_id: msgId, 
          interaction_type: 'like',
          value: 1
        },
      ]);

    if (error) {
      console.error('Error inserting data: ', error);
    } else { 
      console.log('Successfully inserted data: ', data);
      callback(true);
    }

    return true;
  }
}

export default handleLikeClick;
