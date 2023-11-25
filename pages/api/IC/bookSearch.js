// pages/api/bookSearch.js
import { bookSearch as originalBookSearch } from '../../../utils/bookSearch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { query, breadth, scope } = req.body;
      const openAIKey = process.env.OPENAI_API_KEY;

      const result = await originalBookSearch(query, breadth, scope, openAIKey);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
}
