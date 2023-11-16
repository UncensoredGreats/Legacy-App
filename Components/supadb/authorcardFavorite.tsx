import { supabase } from '../../app/authModal';

// const stancePrompt = (messageContent, query) => [
//   {
//     role: 'system',
//     content: `Analyze the following text and summarize the key viewpoints or stance of the author. Focus on understanding the main themes or arguments presented.`
//   },
//   {
//     role: 'user',
//     content: `Text from the author: \n """ \n ${messageContent} \n """`
//   },
//   {
//     role: 'system',
//     content: `Based on this summary, infer how the author might respond to the following query. Use the key viewpoints or stance identified from their text to guide your inference. The response should reflect what the author's position might be, considering only the information from their text.`
//   },
//   {
//     role: 'user',
//     content: `Query: \n """ \n ${query} \n """`
//   }
// ];


// const stancePrompt = (messageContent, query) => [
//   {
//     role: 'system',
//     content: `Analyze the following text and summarize the main themes or arguments presented.`
//   },
//   {
//     role: 'user',
//     content: `Exerpt: \n """ \n ${messageContent} \n """`
//   },
//   {
//     role: 'system',
//     content: `Using themes identified in the text summary, write the response to the given query that reflects the position of someone who may have written that summary.`
//   },
//   {
//     role: 'user',
//     content: `Query: \n """ \n ${query} \n """`
//   }
// ];



const stancePrompt = (messageContent, query) => [
  {
    role: 'system',
    content: `You are a debater that takes the position of whatever excerpt is given. Your responses are direct, concise, and representing the raw truth of your assigned excerpt without any deviation.`
  },
  {
    role: 'user',
    content: `Write a 3-5 sentence statement in relation to the following query based only on the context provided in the excerpt:
    
    Query: \n """ \n ${query} \n """ \n Excerpt: \n """ \n ${messageContent} \n """`
  }
]



const fetchOpenai = async (stancePromptPayload) => {
  try {
    console.log("fetch initiated")
    const response = await fetch('/api/messages/stanceHandler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stancePromptPayload })
    });
    console.log("fetch finalized")

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.body;
  } catch (error) {
    console.error('Error in fetchOpenai: ', error);
    throw error;
  }
};



const generateStance = async (messageContent, query) => {
  const stancePromptPayload = stancePrompt(messageContent, query);
  try {
    console.log('Attempt to generate stance: ', stancePromptPayload);
    const response = await fetchOpenai(stancePromptPayload);
    if (!response) {
      throw new Error('No response received');
    }

    const reader = response.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let stance = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value, { stream: !done });
      stance += chunkValue;
      console.log('Stance Chunk: ', stance);
    }

    console.log('Stance: ', stance);
    return stance;
  } catch (error) {
    console.error('Error generating stance: ', error);
    throw error;
  }
};


const handleStarClick = async (someUserId, msgId, author, messageContent, sourceTitle, sourceHeading, sourceContent, sourceSummaries, sourceMetasummary, payload, callback, query, promptStyleString) => {
  
  const stance = await generateStance(messageContent, query);

  let { data: existingFavorite, error } = await supabase
    .from('Message Cards')
    .select('*')
    .eq('user_id', someUserId)
    .eq('message_id', msgId);

  if (error) {
    console.error('Error fetching data: ', error);
    return;
  }

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
      callback(false);
    }
  }

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
          stance: stance,
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