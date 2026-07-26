import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // In production, integrate EmailJS or Nodemailer here.
    // For now, log and return success so the form works gracefully.
    console.log('[Contact Form]', { name, email, subject, messageLength: message.length });

    return NextResponse.json({ ok: true, message: 'Message received.' });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
