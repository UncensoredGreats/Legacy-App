import { bookSearch, extractData } from '../../../utils/weaviate';

const key = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  const { query, scope, breadth: breadthStr } = req.body;

  const breadth = parseInt(breadthStr, 10);

  // If breadth is not a number, is less than 1, or greater than 10
  if (isNaN(breadth) || breadth < 0 || breadth > 10) {
    res.status(400).json({ error: 'Invalid breadth value. Breadth should be a number between 1 and 10.' });
    return;
  }

  const sources = await bookSearch(query, breadth, scope, key);
  const data = await extractData(sources);
  
  res.status(200).json(data);
}
