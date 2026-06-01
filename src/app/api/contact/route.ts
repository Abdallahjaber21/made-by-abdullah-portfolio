import { NextResponse } from "next/server";

/**
 * Contact endpoint. Currently accepts the payload and logs it.
 *
 * To actually deliver email, wire a provider here — e.g. Resend:
 *
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "portfolio@yourdomain.dev",
 *     to: "abdallahjaber719@gmail.com",
 *     subject: `New enquiry — ${data.engagement}`,
 *     text: `${data.name} <${data.email}>\n\n${data.message}`,
 *   });
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data?.name || !data?.email) {
      return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
    }
    console.log("[contact] new enquiry", {
      name: data.name,
      email: data.email,
      engagement: data.engagement,
      pkt: data.pkt,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }
}
