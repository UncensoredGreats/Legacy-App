// // OG

// import { supabase } from '../../app/authModal';

// // The goal here is to add a new variable representing the stance as text to Supabase. The Column name is "stance".

// const handleStarClick = async (someUserId, msgId, author, messageContent, sourceTitle, sourceHeading, sourceContent, sourceSummaries, sourceMetasummary, payload, callback, query, promptStyleString) => {

//   let { data: existingFavorite, error } = await supabase
//     .from('Message Cards')
//     .select('*')
//     .eq('user_id', someUserId)
//     .eq('message_id', msgId);

//   if (error) {
//     console.error('Error fetching data: ', error);
//     return;
//   }

//   // If the card is already favorited, delete it
//   if (existingFavorite.length > 0) {
//     let { error } = await supabase
//       .from('Message Cards')
//       .delete()
//       .eq('user_id', someUserId)
//       .eq('message_id', msgId);

//     if (error) {
//       console.error('Error deleting data: ', error);
//     } else { 
//       console.log('Successfully deleted data');
//       callback(false); // new
//     }
//   }

//   // If the card is not favorited, add it
//   else {
//     let { data, error } = await supabase
//       .from('Message Cards')
//       .insert([
//         { 
//           user_id: someUserId,
//           created_at: new Date(),
//           message_id: msgId, 
//           author_id: author,
//           message_content: messageContent,
//           source_title: sourceTitle,
//           source_heading: sourceHeading,
//           source_content: sourceContent,
//           source_summaries: sourceSummaries,
//           source_metasummary: sourceMetasummary,
//           metadata: payload,
//           user_query: query,
//           prompt_type: promptStyleString,
//         },
//       ]);

//     if (error) {
//       console.error('Error inserting data: ', error);
//     } else { 
//       console.log('Successfully inserted data: ', data);
//       callback(true);
//     }
//   }
// }

// export default handleStarClick;

















import { supabase } from '../../app/authModal';

const stancePrompt = (messageContent, query) => [
  {
    role: 'system',
    content: `Analyze the following text and summarize the key viewpoints or stance of the author. Focus on understanding the main themes or arguments presented.`
  },
  {
    role: 'user',
    content: `Text from the author: \n """ \n ${messageContent} \n """`
  },
  {
    role: 'system',
    content: `Based on this summary, infer how the author might respond to the following query. Use the key viewpoints or stance identified from their text to guide your inference. The response should reflect what the author's position might be, considering only the information from their text.`
  },
  {
    role: 'user',
    content: `Query: \n """ \n ${query} \n """`
  }
];



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
























// import { supabase } from '../../app/authModal';

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

// const fetchOpenai = async (messageContent, query) => {
//   try {
//     console.log("fetch initiated");
//     const response = await fetch('/api/messages/stanceHandler', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ messageContent, query })
//     });
//     console.log("fetch finalized");

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error in fetchOpenai: ', error);
//     throw error;
//   }
// };

// const generateStance = async (messageContent, query) => {
//   try {
//     console.log('Attempt to generate stance');
//     const openaiResponse = await fetchOpenai(messageContent, query);
//     console.log('Stance response: ', openaiResponse);
//     return openaiResponse.choices[0].message.content; // Adjust as per the actual response format
//   } catch (error) {
//     console.error('Error generating stance: ', error);
//     throw error;
//   }
// };

// const handleStarClick = async (someUserId, msgId, author, messageContent, sourceTitle, sourceHeading, sourceContent, sourceSummaries, sourceMetasummary, payload, callback, query, promptStyleString) => {
  
//   // Check for existing favorite
//   let { data: existingFavorite, error } = await supabase
//     .from('Message Cards')
//     .select('*')
//     .eq('user_id', someUserId)
//     .eq('message_id', msgId);

//   if (error) {
//     console.error('Error fetching data: ', error);
//     return;
//   }

//   if (existingFavorite.length > 0) {
//     // Delete existing favorite
//     let { error } = await supabase
//       .from('Message Cards')
//       .delete()
//       .eq('user_id', someUserId)
//       .eq('message_id', msgId);

//     if (error) {
//       console.error('Error deleting data: ', error);
//     } else { 
//       console.log('Successfully deleted data');
//       callback(false);
//     }
//   } else {
//     // Generate stance after checking for existing favorite
//     const stance = await generateStance(messageContent, query);

//     // Insert new favorite with stance
//     let { data, error } = await supabase
//       .from('Message Cards')
//       .insert([
//         { 
//           user_id: someUserId,
//           created_at: new Date(),
//           message_id: msgId, 
//           author_id: author,
//           message_content: messageContent,
//           source_title: sourceTitle,
//           source_heading: sourceHeading,
//           source_content: sourceContent,
//           source_summaries: sourceSummaries,
//           source_metasummary: sourceMetasummary,
//           metadata: payload,
//           user_query: query,
//           prompt_type: promptStyleString,
//           stance: stance,
//         },
//       ]);

//     if (error) {
//       console.error('Error inserting data: ', error);
//     } else { 
//       console.log('Successfully inserted data: ', data);
//       callback(true);
//     }
//   }
// }

// export default handleStarClick;
