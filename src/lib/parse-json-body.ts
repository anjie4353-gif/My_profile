import { NextResponse } from "next/server";

export async function parseJsonBody<T>(
  request: Request
): Promise<{ data: T } | { error: NextResponse }> {
  try {
    const data = (await request.json()) as T;
    return { data };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        error: NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }),
      };
    }
    throw error;
  }
}