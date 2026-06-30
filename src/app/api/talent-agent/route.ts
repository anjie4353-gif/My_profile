import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { composeDeterministicAnswer } from "@/lib/deterministic-agent";
import { parseJsonBody } from "@/lib/parse-json-body";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

export async function POST(request: NextRequest) {
  try {
    const parsedBody = await parseJsonBody<unknown>(request);
    if ("error" in parsedBody) return parsedBody.error;

    const parsed = requestSchema.safeParse(parsedBody.data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid request" },
        { status: 400 }
      );
    }

    const lastUserMessage = [...parsed.data.messages]
      .reverse()
      .find((m) => m.role === "user");

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No question found." },
        { status: 400 }
      );
    }

    const { reply, meta } = composeDeterministicAnswer(lastUserMessage.content);

    return NextResponse.json({ reply, meta });
  } catch (error) {
    console.error("Talent agent error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}