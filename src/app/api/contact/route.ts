import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact endpoint — delivers enquiries via Gmail SMTP (nodemailer).
 *
 * Required env (see .env.example):
 *   SMTP_USER   the Gmail address that sends   (e.g. abdallahjaber719@gmail.com)
 *   SMTP_PASS   a Google App Password for that account (NOT the login password;
 *               requires 2-Step Verification — https://myaccount.google.com/apppasswords)
 * Optional env:
 *   CONTACT_TO  where enquiries are delivered (defaults to SMTP_USER)
 *
 * nodemailer needs the Node.js runtime (it opens a TCP socket), not Edge.
 */
export const runtime = "nodejs";

// Tiny HTML escaper so user input can't break the email markup.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  // Honeypot: real users never fill a hidden field. Pretend success to bots.
  if (typeof data.company === "string" && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const projectType = String(data.projectType ?? "").trim();
  const message = String(data.message ?? "").trim();
  const ref = String(data.ref ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ ok: false, error: "too long" }, { status: 400 });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || user;

  if (!user || !pass) {
    // Don't 500 silently in dev without creds — log the payload so it's not lost.
    console.error("[contact] SMTP_USER / SMTP_PASS not set — email NOT sent.");
    console.log("[contact] enquiry (unsent)", { name, email, projectType, ref });
    return NextResponse.json(
      { ok: false, error: "email not configured" },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const subject = `New enquiry${projectType ? ` · ${projectType}` : ""} — ${name}`;
  const text =
    `New portfolio enquiry\n\n` +
    `Name:    ${name}\n` +
    `Email:   ${email}\n` +
    `Type:    ${projectType || "—"}\n` +
    `Ref:     ${ref || "—"}\n\n` +
    `Message:\n${message}\n`;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
      <h2 style="margin:0 0 16px;font-size:18px">New portfolio enquiry</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#666;width:90px">Name</td><td style="padding:6px 0;font-weight:600">${esc(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#666">Type</td><td style="padding:6px 0">${esc(projectType) || "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Ref</td><td style="padding:6px 0;font-family:monospace">${esc(ref) || "—"}</td></tr>
      </table>
      <div style="margin-top:16px;padding:16px;background:#f5f5f7;border-radius:10px;white-space:pre-wrap;font-size:14px;line-height:1.5">${esc(message)}</div>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"Portfolio enquiry" <${user}>`,
      to,
      replyTo: `"${name}" <${email}>`, // reply goes straight to the enquirer
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ ok: false, error: "send failed" }, { status: 502 });
  }
}
