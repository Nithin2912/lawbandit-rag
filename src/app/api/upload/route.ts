// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: NextRequest) {
  try {
    // Ensure the request has a body
    const arrayBuffer = await req.arrayBuffer();
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      return NextResponse.json(
        { error: "No file uploaded or empty file" },
        { status: 400 }
      );
    }

    // Convert ArrayBuffer to Node Buffer
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF
    const data = await pdfParse(buffer);
    const text = data?.text ?? "";

    // Return the extracted text
    return NextResponse.json({ text });
  } catch (err) {
    console.error("PDF parse error:", err);
    return NextResponse.json(
      { error: "Failed to parse PDF" },
      { status: 500 }
    );
  }
}
