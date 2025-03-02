import axios from "axios";
import { NextResponse } from "next/server";

interface RecaptchaRequest {
  token: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  const reqBody: RecaptchaRequest = await request.json();
  const secret_key: string | undefined = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  if (!secret_key) {
    return NextResponse.json({
      error: "Missing reCAPTCHA secret key",
      success: false,
    }, { status: 500 });
  }

  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${reqBody.token}`;
    const res = await axios.post(url);

    if (res.data.success) {
      return NextResponse.json({
        message: "Captcha verification success!!",
        success: true,
      });
    }

    return NextResponse.json({
      error: "Captcha verification failed!",
      success: false,
    }, { status: 500 });
  } catch {
    return NextResponse.json({
      error: "Captcha verification failed!",
      success: false,
    }, { status: 500 });
  }
}
