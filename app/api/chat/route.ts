import { NextRequest, NextResponse } from "next/server";
import { chatbotConfig } from "../../../lib/chatbot-config";
import { generateChatResponse, GeminiRequestError, type ChatHistoryMessage } from "../../../lib/gemini";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;
const requestLog = new Map<string, number[]>();

function clientAddress(request: NextRequest) {
  return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    requestLog.set(key, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(key, recent);
  if (requestLog.size > 1000) {
    for (const [address, times] of requestLog) {
      if (!times.some((time) => now - time < WINDOW_MS)) requestLog.delete(address);
    }
  }
  return false;
}

function validHistory(value: unknown): value is ChatHistoryMessage[] {
  return Array.isArray(value)
    && value.length <= chatbotConfig.maxHistoryMessages
    && value.every((item) => {
      if (!item || typeof item !== "object") return false;
      const entry = item as Record<string, unknown>;
      return (entry.role === "user" || entry.role === "assistant")
        && typeof entry.content === "string"
        && entry.content.trim().length > 0
        && entry.content.length <= chatbotConfig.maxMessageLength;
    });
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientAddress(request))) {
    return NextResponse.json(
      { error: "You're sending messages a little too quickly. Please try again shortly." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) return NextResponse.json({ error: "This request is too large." }, { status: 413 });

  try {
    const rawBody = await request.text();
    if (rawBody.length > 20_000) return NextResponse.json({ error: "This request is too large." }, { status: 413 });
    const body = JSON.parse(rawBody) as { message?: unknown; history?: unknown };
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const history = body.history ?? [];

    if (!message) return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
    if (message.length > chatbotConfig.maxMessageLength) {
      return NextResponse.json({ error: `Please keep your message under ${chatbotConfig.maxMessageLength} characters.` }, { status: 400 });
    }
    if (!validHistory(history)) return NextResponse.json({ error: "Invalid conversation history." }, { status: 400 });

    const reply = await generateChatResponse(message, history);
    return NextResponse.json({ reply }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof SyntaxError) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const status = error instanceof GeminiRequestError ? error.status : 500;
    const friendly = status === 429
      ? "The assistant is busy right now. Please try again shortly."
      : "Sorry, I'm having trouble responding right now. You can contact AS Consultations directly on WhatsApp.";
    return NextResponse.json({ error: friendly }, { status: status >= 400 && status < 600 ? status : 500 });
  }
}



