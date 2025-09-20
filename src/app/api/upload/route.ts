// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: NextRequest) {
  try {
    // Read raw request body as ArrayBuffer (we'll send the raw file from the client)
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // parse PDF
    const data = await pdfParse(buffer);
    const text = data?.text ?? "";

    // return the extracted text (for now)
    return NextResponse.json({ text });
  } catch (err) {
    console.error("PDF parse error:", err);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
