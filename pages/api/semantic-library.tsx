import natural from "natural";
import { TfIdf } from "natural";
import { bookSearch, extractLibraryData } from '../../utils/weaviate';
import AUTHOR_INFO from "../../data/author_data";

const key = process.env.OPENAI_API_KEY;

const authorsDescriptions = {};

for (const author of AUTHOR_INFO) {
    authorsDescriptions[author.cluster] = author.description;
}

let tfidf = new TfIdf();

for (let author in authorsDescriptions) {
    tfidf.addDocument(authorsDescriptions[author]);
}

function getMostRelatedAuthors(query, tfidf, authorsDescriptions) {
    const similarities = {};

    tfidf.tfidfs(query, (i, measure) => {
        const author = Object.keys(authorsDescriptions)[i];
        similarities[author] = measure;
    });

    const sortedAuthors = Object.keys(similarities).sort((a, b) => similarities[b] - similarities[a]);
    return sortedAuthors.slice(0, 6);
}

// // OG Handler
// export default async function handler(req, res) {
//     try {
//         const { query } = req.body;

//         const relatedAuthors = getMostRelatedAuthors(query, tfidf, authorsDescriptions);

//         let combinedData = {
//             titles: [],
//             headings: [],
//             contents: [],
//             summaries: [],
//         };

//         for (const authorCluster of relatedAuthors) {
//             const authorInfo = AUTHOR_INFO.find(a => a.cluster === authorCluster);

//             if (authorInfo) {
//                 const sources = await bookSearch(query, 1, authorInfo.cluster, key);
//                 const data = await extractLibraryData(sources);

//                 combinedData.titles.push(...data.titles);
//                 combinedData.headings.push(...data.headings);
//                 combinedData.contents.push(...data.contents);
//                 combinedData.summaries.push(...data.summaries);
//             }
//         }

//         res.status(200).json(combinedData);

//     } catch (error) {
//         console.error("Error in semantic-library API endpoint:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }









export default async function handler(req, res) {
    try {
        const { query } = req.body;

        const relatedAuthors = getMostRelatedAuthors(query, tfidf, authorsDescriptions);

        let combinedData = {
            authors: [], // New field to store author related data
            titles: [],
            headings: [],
            contents: [],
            summaries: [],
        };

        for (const authorCluster of relatedAuthors) {
            const authorInfo = AUTHOR_INFO.find(a => a.cluster === authorCluster);

            if (authorInfo) {
                const sources = await bookSearch(query, 1, authorInfo.cluster, key);
                const data = await extractLibraryData(sources);

                combinedData.titles.push(...data.titles);
                combinedData.headings.push(...data.headings);
                combinedData.contents.push(...data.contents);
                combinedData.summaries.push(...data.summaries);

                // Add the required fields from authorInfo to combinedData
                combinedData.authors.push({
                    id: authorInfo.id,
                    first: authorInfo.first,
                    last: authorInfo.last,
                    image: authorInfo.image,
                    description: authorInfo.description,
                    category: authorInfo.category,
                    cap_first: authorInfo.cap_first,
                    cluster: authorInfo.cluster,
                    books: authorInfo.books,
                    sentences_json: authorInfo.sentences_json,
                    segments_json: authorInfo.segments_json,
                    paragraphs_json: authorInfo.paragraphs_json,
                });
            }
        }

        res.status(200).json(combinedData);

    } catch (error) {
        console.error("Error in semantic-library API endpoint:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

