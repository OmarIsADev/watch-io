import type { NextRequest } from "next/server";

// You can keep the GET function as it is.
export async function GET(req: NextRequest) {
  return new Response("Hello, Next.js!");
}