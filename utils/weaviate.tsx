// Should be ready to go with individual summaries when we ready.
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


// // OG
// async function summarize(content, num_sentences) {
//   try {
//     const response = await fetch('https://extractivesummarizer-77f3c3288124.herokuapp.com/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text: content, num_sentences }),
//     });
//     const data = await response.json();
//     while (data.summary.length < num_sentences) {
//       data.summary.push(' ');  // or data.summary.push(null);
//     }
    
//     return data.summary;
//   } catch (err) {
//     console.error(`Failed to summarize text: ${err}`);
//     const sentences = content.split('. ');
//     while (sentences.length < num_sentences) {
//       sentences.push(' ');  // or sentences.push(null);
//     }
//     return sentences;
//   }
// }



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

  console.log('joinedFormattedContents', joinedFormattedContents);
  console.log('metasummary', metasummary);

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
