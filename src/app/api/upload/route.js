"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
// src/app/api/upload/route.ts
const server_1 = require("next/server");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
async function POST(req) {
    try {
        // Read raw request body as ArrayBuffer (we'll send the raw file from the client)
        const arrayBuffer = await req.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // parse PDF
        const data = await (0, pdf_parse_1.default)(buffer);
        const text = data?.text ?? "";
        // return the extracted text (for now)
        return server_1.NextResponse.json({ text });
    }
    catch (err) {
        console.error("PDF parse error:", err);
        return server_1.NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
    }
}
