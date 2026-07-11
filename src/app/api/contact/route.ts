import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot — humans never see this field
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request): Promise<NextResponse> {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  if (payload.company) {
    return NextResponse.json({ success: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please fill in all fields with a valid email." },
      { status: 400 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Contact: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing");
    return NextResponse.json(
      { success: false, message: "Message delivery is not configured." },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `New portfolio message from ${name}\n\nEmail: ${email}\n\n${message}`,
      }),
    });
    const data = await res.json();
    if (!data.ok) {
      throw new Error(`Telegram API error: ${JSON.stringify(data)}`);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact: delivery failed", error);
    return NextResponse.json(
      { success: false, message: "Could not send your message." },
      { status: 500 },
    );
  }
}
