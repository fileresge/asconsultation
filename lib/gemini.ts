import "server-only";

import { chatbotConfig, ASCONSULTATIONS_SYSTEM_PROMPT } from "./chatbot-config";

export type ChatRole = "user" | "assistant";
export type ChatHistoryMessage = { role: ChatRole; content: string };

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  error?: { code?: number; message?: string; status?: string };
};

export class GeminiRequestError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

export async function generateChatResponse(message: string, history: ChatHistoryMessage[]) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new GeminiRequestError(503, "The assistant is not configured.");

  const contents = [
    ...history.slice(-chatbotConfig.maxHistoryMessages).map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${chatbotConfig.model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: ASCONSULTATIONS_SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.35, maxOutputTokens: 650 },
        }),
        cache: "no-store",
        signal: controller.signal,
      },
    );

    const data = (await response.json().catch(() => ({}))) as GeminiResponse;
    if (!response.ok) throw new GeminiRequestError(response.status, data.error?.status || "Gemini request failed.");

    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();
    if (!text) throw new GeminiRequestError(502, "The assistant returned an empty response.");
    return text;
  } catch (error) {
    if (error instanceof GeminiRequestError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new GeminiRequestError(504, "The assistant request timed out.");
    }
    throw new GeminiRequestError(502, "The assistant is temporarily unavailable.");
  } finally {
    clearTimeout(timeout);
  }
}



