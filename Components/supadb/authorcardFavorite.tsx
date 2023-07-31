import { supabase } from '../../app/authModal';

// The goal here is to add "promptStyleString" and "query" to Supabase.
// The Column Names are "user_query" and "prompt_type" 

const handleStarClick = async (someUserId, msgId, author, messageContent, sourceTitle, sourceHeading, sourceContent, sourceSummaries, sourceMetasummary, payload, callback, query, promptStyleString) => {

  let { data: existingFavorite, error } = await supabase
    .from('Message Cards')
    .select('*')
    .eq('user_id', someUserId)
    .eq('message_id', msgId);

  if (error) {
    console.error('Error fetching data: ', error);
    return;
  }

  // If the card is already favorited, delete it
  if (existingFavorite.length > 0) {
    let { error } = await supabase
      .from('Message Cards')
      .delete()
      .eq('user_id', someUserId)
      .eq('message_id', msgId);

    if (error) {
      console.error('Error deleting data: ', error);
    } else { 
      console.log('Successfully deleted data');
      callback(false); // new
    }
  }

  // If the card is not favorited, add it
  else {
    let { data, error } = await supabase
      .from('Message Cards')
      .insert([
        { 
          user_id: someUserId,
          created_at: new Date(),
          message_id: msgId, 
          author_id: author,
          message_content: messageContent,
          source_title: sourceTitle,
          source_heading: sourceHeading,
          source_content: sourceContent,
          source_summaries: sourceSummaries,
          source_metasummary: sourceMetasummary,
          metadata: payload,
          user_query: query,
          prompt_type: promptStyleString,
        },
      ]);

    if (error) {
      console.error('Error inserting data: ', error);
    } else { 
      console.log('Successfully inserted data: ', data);
      callback(true);
    }
  }
}

export default handleStarClick;




