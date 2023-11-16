// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '1mb'
//     },
//   },
// };

// export default async function stanceHandler(req, res) {
//   // Ensure the method is POST
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   try {
//     const { stancePromptPayload } = req.body;

//     if (!stancePromptPayload) {
//       return res.status(400).json({ error: 'Missing stance prompt payload' });
//     }

//     const openaiResponse = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         prompt: stancePromptPayload.map(item => item.content).join('\n'),
//         max_tokens: 150,
//       })
//     });

//     if (!openaiResponse.ok) {
//       throw new Error(`HTTP error from OpenAI! Status: ${openaiResponse.status}`);
//     }

//     const openaiData = await openaiResponse.json();
//     res.status(200).json(openaiData);
//   } catch (error) {
//     console.error('Error in stanceHandler: ', error);
//     res.status(500).json({ error: 'Error processing request' });
//   }
// }




// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '1mb'
//     },
//   },
// };

// export default async function stanceHandler(req, res) {
//   // Ensure the method is POST
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   try {
//     const { stancePromptPayload } = req.body;

//     if (!stancePromptPayload) {
//       return res.status(400).json({ error: 'Missing stance prompt payload' });
//     }

//     // Convert the payload to the format required by GPT-3.5-turbo
//     const messages = stancePromptPayload.map(item => ({
//       role: item.role,
//       content: item.content
//     }));

//     const openaiResponse = await fetch("https://api.openai.com/v1/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: messages,
//       })
//     });

//     if (!openaiResponse.ok) {
//       throw new Error(`HTTP error from OpenAI! Status: ${openaiResponse.status}`);
//     }

//     const openaiData = await openaiResponse.json();
//     res.status(200).json(openaiData.choices[0].message.content);
//   } catch (error) {
//     console.error('Error in stanceHandler: ', error);
//     res.status(500).json({ error: 'Error processing request' });
//   }
// }






// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '1mb'
//     },
//   },
// };

// export default async function stanceHandler(req, res) {
//   // Ensure the method is POST
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   try {
//     // Using a static test payload for demonstration
//     const messages = [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: "Tell me a joke." }
//     ];

//     const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: messages,
//       })
//     });

//     if (!openaiResponse.ok) {
//       throw new Error(`HTTP error from OpenAI! Status: ${openaiResponse.status}`);
//     }

//     const openaiData = await openaiResponse.json();
//     res.status(200).json(openaiData.choices[0].message.content);
//   } catch (error) {
//     console.error('Error in stanceHandler: ', error);
//     res.status(500).json({ error: 'Error processing request' });
//   }
// }







// pages/api/messages/stanceHandler.tsx

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    },
  },
};

export default async function stanceHandler(req, res) {
  // Ensure the method is POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Receive the payload from the request body
    const { stancePromptPayload } = req.body;

    // Construct the OpenAI API request
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: stancePromptPayload, // Use the received payload here
      })
    });

    if (!openaiResponse.ok) {
      throw new Error(`HTTP error from OpenAI! Status: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    res.status(200).json(openaiData.choices[0].message.content);
  } catch (error) {
    console.error('Error in stanceHandler: ', error);
    res.status(500).json({ error: 'Error processing request' });
  }
}
