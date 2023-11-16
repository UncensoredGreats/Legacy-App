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
        messages: stancePromptPayload,
        
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
