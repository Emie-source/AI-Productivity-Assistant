import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { BRAND_CONTEXT, MODE_PROMPTS, type AssistantMode } from "@/lib/blade-queens-prompts";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "AI is not configured (missing API key)." }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }

        let body: { messages?: UIMessage[]; mode?: AssistantMode };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid request body." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const messages = body.messages ?? [];
        const mode: AssistantMode =
          body.mode && body.mode in MODE_PROMPTS ? body.mode : "chat";

        const gateway = createLovableAiGatewayProvider(apiKey);

        try {
          const result = streamText({
            model: gateway("google/gemini-2.5-flash"),
            system: `${BRAND_CONTEXT}\n\n${MODE_PROMPTS[mode]}`,
            messages: convertToModelMessages(messages),
            abortSignal: request.signal,
          });

          return result.toUIMessageStreamResponse();
        } catch (error) {
          const status =
            typeof error === "object" && error && "statusCode" in error
              ? Number((error as { statusCode?: number }).statusCode) || 500
              : 500;
          const message =
            status === 402
              ? "AI credits are exhausted. Please add credits to keep the assistant running."
              : status === 429
                ? "The assistant is rate limited right now. Please try again in a moment."
                : error instanceof Error
                  ? error.message
                  : "The assistant could not respond.";
          return new Response(JSON.stringify({ error: message }), {
            status,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
