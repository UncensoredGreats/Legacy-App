import { WeaviateResponse, ExtractedData, ExtractedDataLibrary } from '../types/weaviate';
import weaviate, { AuthUserPasswordCredentials } from 'weaviate-ts-client';

const WEAVIATE_USERNAME = process.env.WEAVIATE_USERNAME as string;
const WEAVIATE_PASSWORD = process.env.WEAVIATE_PASSWORD as string;

export async function bookSearch(query: string, breadth: number, scope: string, key: string) {
  const client = weaviate.client ({
    scheme: 'https',
    host: 'uncensoredgreats.weaviate.network',
    headers: { 'X-OpenAI-Api-Key' : key },
    authClientSecret: new AuthUserPasswordCredentials({
      username: WEAVIATE_USERNAME,
      password: WEAVIATE_PASSWORD,
    })
  });

  return client.graphql
    .get()
    .withClassName(scope)
    .withFields('title heading content')
    .withNearText({ concepts: [query] })
    .withLimit(breadth)
    .do()
    .then((res: any) => {
      return res.data.Get[scope]; 
    })
    .catch((err: Error) => {
      console.error(err);
    });
}

async function summarize(content: string, num_sentences: number): Promise<string[]> {
  try {
    const sentences: string[] = content.match(/[^\.!\?]+[\.!\?]+/g) || [];

    while (sentences.length < num_sentences) {
      sentences.push(' ');
    }
    return sentences.slice(0, num_sentences);

  } catch (err) {
    console.error(`Failed to process text: ${err}`);
    return Array(num_sentences).fill(' ');
  }
}

export async function extractData(sources: WeaviateResponse[]): Promise<ExtractedData> {
  if (!sources || sources.length === 0) {
    return Promise.resolve({
      titles: [],
      headings: [],
      contents: [],
      summaries: [], 
      metasummary: [],
    });
  }

  const titles = sources.map((r) => r.title);
  const headings = sources.map((r) => r.heading);
  const contents = sources.map((r) => r.content);

  const formattedContents = contents.map((content, index) => `Excerpt ${index + 1}: \`\n${content}\`\n`);
  const joinedFormattedContents = formattedContents.join('\n');

  const summaries = await Promise.all(contents.map(content => summarize(content, 3)));
  const metasummary = await summarize(joinedFormattedContents, 1000);

  return {
    titles,
    headings,
    contents: formattedContents,
    summaries,
    metasummary,
  };
}




export async function extractLibraryData(sources: WeaviateResponse[]): Promise<ExtractedDataLibrary> {
  if (!sources || sources.length === 0) {
    return Promise.resolve({
      titles: [],
      headings: [],
      contents: [],
      summaries: [], 
      // No metasummary field here
    });
  }

  const titles = sources.map((r) => r.title);
  const headings = sources.map((r) => r.heading);
  const contents = sources.map((r) => r.content);
  
  const summaries = await Promise.all(contents.map(content => summarize(content, 3)));

  return {
    titles,
    headings,
    contents,
    summaries,
    // No metasummary field here
  };
}
