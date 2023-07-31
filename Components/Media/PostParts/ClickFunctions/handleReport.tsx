// handleReport.js
import { supabase } from '../../../../app/authModal';

const handleReport = async (userId, messageId, callback) => {
  console.log('handleReport got called');
  let { data: existingReport, error } = await supabase
    .from('PostInteractions')
    .select('*')
    .eq('user_id', userId)
    .eq('message_id', messageId)
    .eq('interaction_type', 'report');

  if (error) {
    console.error('Error fetching data: ', error);
    return;
  }

  // If the post is already reported, delete it
  if (existingReport.length > 0) {
    let { error } = await supabase
      .from('PostInteractions')
      .delete()
      .eq('user_id', userId)
      .eq('message_id', messageId)
      .eq('interaction_type', 'report');

    if (error) {
    console.error('Error deleting data: ', error);
    return false;
    } else {
    console.log('Successfully deleted data');
    callback(false);
    return false;
    }
  }

  // If the post is not reported, add it
  else {
    let { data, error } = await supabase
      .from('PostInteractions')
      .insert([
        {
          user_id: userId,
          message_id: messageId,
          interaction_type: 'report',
          value: 1,
        },
      ]);
  
    if (error) {
    console.error('Error inserting data: ', error);
    return false;
    } else {
    console.log('Successfully inserted data: ', data);
    callback(true);
    return true;
    }
  }
};

export default handleReport;
