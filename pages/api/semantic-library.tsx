import expressRateLimit from "express-rate-limit";
import { TfIdf } from "natural";
import { bookSearch, extractLibraryData } from '../../utils/weaviate';
import AUTHOR_INFO from "../../data/author_data";

const key = process.env.OPENAI_API_KEY;

const apiLimiter = expressRateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
    max: 40, // limit each IP to 50 requests per windowMs
    message: "Too many queries created from this IP, please try again after an hour",
    keyGenerator: (req) => {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }
});


const authorsDescriptions = {};

for (const author of AUTHOR_INFO) {
    authorsDescriptions[author.cluster] = author.description;
}

let tfidf = new TfIdf();

for (let author in authorsDescriptions) {
    tfidf.addDocument(authorsDescriptions[author]);
}

function getMostRelatedAuthors(query, tfidf, authorsDescriptions, num = 3) {
    const similarities = {};

    tfidf.tfidfs(query, (i, measure) => {
        const author = Object.keys(authorsDescriptions)[i];
        similarities[author] = measure;
    });

    const sortedAuthors = Object.keys(similarities).sort((a, b) => similarities[b] - similarities[a]);
    return sortedAuthors.slice(0, num);
}

export default async function handler(req, res) {
    const isRateLimited = await new Promise((resolve) => {
        apiLimiter(req, res, (next) => {
            if (res.headersSent) resolve(true);
            else resolve(false);
        });
    });

    if (isRateLimited) {
        return res.status(429).json({ error: "Too many requests. Please try again later." });
    }    

    try {
        const { query, author: authorId } = req.body; 

        let relatedAuthors;

        if (authorId) {
            const authorCluster = AUTHOR_INFO.find(a => a.id === authorId)?.cluster;
            if (authorCluster) {
                relatedAuthors = [authorCluster];
            } else {
                relatedAuthors = getMostRelatedAuthors(query, tfidf, authorsDescriptions);
            }
        } else {
            relatedAuthors = getMostRelatedAuthors(query, tfidf, authorsDescriptions);
        }

        let combinedData = {
            authors: [],
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
