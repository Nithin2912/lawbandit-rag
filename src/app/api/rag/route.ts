import { NextRequest, NextResponse } from "next/server";
import { getRagResponse } from "../../../services/ragService"; // <— correct import

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    const result = await getRagResponse(query);
    return NextResponse.json({ answer: result });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
