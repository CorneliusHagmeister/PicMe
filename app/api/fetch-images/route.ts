import { getJson } from "serpapi";
import "dotenv/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchQuery = req.nextUrl.searchParams.get("search_query");
  const response = await getJson({
    engine: "google_images",
    api_key: process.env.SERP_API,
    q: searchQuery ?? "",
  });
  return NextResponse.json({ data: response.images_results }, { status: 200 });
}
