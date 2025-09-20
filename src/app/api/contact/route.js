"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
// src/app/api/contact/route.ts
const server_1 = require("next/server");
async function POST(request) {
    try {
        const data = await request.json();
        // For now, just log the data
        console.log('Contact form submission:', data);
        // You can later save this to a database or send an email
        return server_1.NextResponse.json({ message: 'Message received successfully!' }, { status: 200 });
    }
    catch (error) {
        return server_1.NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
    }
}
