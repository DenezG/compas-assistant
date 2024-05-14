import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";
import { Dewy } from 'dewy-ts'; 

export const runtime = "nodejs";

const dewy = new Dewy({
  BASE: process.env.DEWY_ENDPOINT
})

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  const { content } = await request.json();

  const context = await dewy.kb.retrieveChunks({
    collection: process.env.DEWY_COLLECTION ?? "main",
    query: content, 
    n: 10,
});

  await openai.beta.threads.messages.create(threadId,{
    role: 'user',
    content: `
            You will take into account any CONTEXT BLOCK 
            that is provided in a conversation.
            START CONTEXT BLOCK
            ${context.text_results.map((c: any) => c.text).join("\n")}
            END OF CONTEXT BLOCK`,
  })

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });

  const stream = openai.beta.threads.runs.createAndStream(threadId, {
    assistant_id: assistantId,
  });

  return new Response(stream.toReadableStream());
}
