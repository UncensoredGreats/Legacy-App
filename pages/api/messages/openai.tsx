import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";
import { OpenAIStream, OpenAIStreamPayload } from "../../../utils/OpenAIStream";

export const config = {
  runtime: "edge",
};

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const handler = async (req: Request): Promise<Response> => {
  const { contentString, authorId, query, payload } = (await req.json()) as {
    contentString: string;
    authorId: string;
    query: string;
    payload: OpenAIStreamPayload;
  };

  if (!contentString || !authorId || !query || !payload) {
    return new Response("Error passing data to OpenAI", { status: 400 });
  }

  const stream = await OpenAIStream(payload);

  return new Response(stream);
};

export default handler;
 