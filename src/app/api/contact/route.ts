// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // For now, just log the data
    console.log('Contact form submission:', data);

    // You can later save this to a database or send an email

    return NextResponse.json({ message: 'Message received successfully!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}
