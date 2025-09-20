"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const ragService_1 = require("../../../services/ragService"); // <— correct import
async function POST(req) {
    try {
        const body = await req.json();
        const { query } = body;
        const result = await (0, ragService_1.getRagResponse)(query);
        return server_1.NextResponse.json({ answer: result });
    }
    catch (err) {
        return server_1.NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
