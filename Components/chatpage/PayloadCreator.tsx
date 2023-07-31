import settingsModal from "./SettingsModal";


const prompt1 = (authorId, query, contentString) => [
  {
    role: 'system',
    content: `You are ${authorId}, the acclaimed author. Provide clear, direct answers based on your writings and in your distinct style. Avoid ambiguity.`
  },
  {
    role: 'user',
    content: `${query}`
  },
  {
    role: 'system',
    content: `Here's a specific excerpt from ${authorId}'s writings that may be relevant to your response: \n """ \n ${contentString} \n """ \n Use this context to craft a concise and clear answer that does not introduce further questions.`
  }
];

const prompt5 = (authorId, query, contentString) => [
  {
    role: 'system',
    content: `You are channeling the essence of ${authorId}. Your answers should strictly draw from the provided context and be expressed in a straightforward manner.`
  },
  {
    role: 'user',
    content: `Given this specific passage from ${authorId}'s work: \n """ \n ${contentString} \n """ \n Answer the following question without ambiguity: ${query}.`
  }
];


const prompt10 = (authorId, query, contentString) => [
  {
    role: 'system',
    content: `Embody the persona of ${authorId}. Provide a clear summary based on the context provided, ensuring the essence of ${authorId}'s writings is maintained. Avoid generalities and aim for precision.`
  },
  {
    role: 'user',
    content: `Here's a passage from ${authorId}'s work: \n """ \n ${contentString} \n """ \n Create a direct and unambiguous summary of this content as if you are ${authorId}.`
  }
];


const createPayload = (contentString, authorId, query, settings, promptStyle) => {

  let selectedPrompt;
  
  switch (promptStyle) {
    case 1:
      selectedPrompt = prompt1(authorId, query, contentString);
      break;
    case 5:
      selectedPrompt = prompt5(authorId, query, contentString);
      break;
    case 9:
      selectedPrompt = prompt10(authorId, query, contentString);
      break;
    default:
      selectedPrompt = prompt1(authorId, query, contentString);
      break;
  }

  const openAIPayload = {
    model: process.env.MODEL_NAME || 'gpt-3.5-turbo',
    messages: selectedPrompt,
    max_tokens: settings.maxTokens,
    temperature: settings.temperature,
    stream: true,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1,
  };

  return {
    payload: openAIPayload,
    query: query,
    promptStyleString: `prompt${promptStyle}` 
  };
};

export default createPayload;























// // OG
// const createPayload = (contentString, authorId, query, settings ) => {
//   return {
//     model: process.env.MODEL_NAME || 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content: `You are the renowned author ${authorId}. You have a deep and direct knowledge on the subjects you've written about. Your responses should be in the exact style and manner of ${authorId}, direct and to the point.`
//       },
//       {
//         role: 'user',
//         content: `${query}`
//       },
//       {
//         role: 'system',
//         content: `The following is the relevant context from ${authorId}'s works that could be useful in generating a response: \n ${contentString} \n Draw from this context to give a direct and clear response in ${authorId}'s style.`
//       }
//     ],
//     max_tokens: settings.maxTokens,
//     temperature: settings.temperature,
//     stream: true,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     n: 1,
//   };
// };

// export default createPayload;