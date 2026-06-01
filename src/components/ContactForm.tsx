"use client";

import { useEffect, useRef, useState } from "react";
import { emitContact } from "./canvas/ContactCore";
import { siteConfig } from "@/config/site";

const PROJECT_TYPES = [
  "Web app",
  "Mobile app",
  "SaaS platform",
  "Backend / API",
  "AI integration",
  "Other",
];

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [btnText, setBtnText] = useState("Send message");
  const [ref, setRef] = useState("REF-2026-AJ-····");
  const activity = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setRef(`REF-2026-AJ-${Math.floor(Math.random() * 9000 + 1000)}`);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const onFieldFocus = () => emitContact({ kind: "activation", level: 0.45 });
  const onFieldBlur = () => {
    const filled = [name, email, message].some((v) => v.trim().length > 0);
    emitContact({ kind: "activation", level: filled ? 0.2 : 0 });
  };
  const onType = () => {
    activity.current += 1;
    emitContact({ kind: "activation", level: Math.min(0.85, 0.45 + activity.current * 0.01) });
    if (activity.current % 4 === 0) emitContact({ kind: "pulse" });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    setBtnText("Sending…");
    emitContact({ kind: "transmit" });

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, projectType, message, ref }),
    }).catch(() => {});

    timers.current.push(setTimeout(() => setStatus("sent"), 1600));
  };

  return (
    <div className="contact-form-wrap reveal">
      <form
        className={`contact-form${status === "sending" ? " is-transmitting" : ""}${
          status === "sent" ? " is-sent" : ""
        }`}
        onSubmit={onSubmit}
        autoComplete="off"
        noValidate
      >
        <div className="form-head">
          <span className="form-title">Project enquiry</span>
          <span className="form-id">{ref}</span>
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="cf-name">
              Name <span className="lbl-id">01</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => { setName(e.target.value); onType(); }}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
            />
          </div>
          <div className="field">
            <label htmlFor="cf-email">
              Email <span className="lbl-id">02</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); onType(); }}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
            />
          </div>

          <div className="field full">
            <label>
              Project type <span className="lbl-id">03</span>
            </label>
            <div className="project-types">
              {PROJECT_TYPES.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`chip${projectType === t ? " is-active" : ""}`}
                  onClick={() => { setProjectType(t); emitContact({ kind: "pulse" }); }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="field full">
            <label htmlFor="cf-msg">
              Project details <span className="lbl-id">04</span>
            </label>
            <textarea
              id="cf-msg"
              name="message"
              placeholder="What are you building, and what's making it hard? Stack, timeline, and scope all help."
              maxLength={1000}
              value={message}
              onChange={(e) => { setMessage(e.target.value); onType(); }}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
            />
            <span className="char-count">
              <b>{message.length}</b> / 1000
            </span>
          </div>
        </div>

        <div className="transmit-row">
          <div className="transmit-meta">
            <span><span className="key">REPLIES</span> within ~1 day</span>
            <span>·</span>
            <span>
              <span className="key">BASED IN</span> {siteConfig.location} · {siteConfig.timezone}
            </span>
          </div>
          <button type="submit" className="btn-transmit" disabled={status !== "idle"}>
            {btnText} <span className="arrow">→</span>
          </button>
        </div>

        <div className={`transmission-confirm${status === "sent" ? " show" : ""}`}>
          <div className="ring-icon">✓</div>
          <h3>
            Message <em>sent.</em>
          </h3>
          <p>
            Thanks for reaching out — I&apos;ll get back to you within one working day. Feel free to
            email me directly in the meantime.
          </p>
          <div className="signal-meta">
            <span>REF <b>{ref}</b></span>
            <span>·</span>
            <span>STATUS <b>received</b></span>
            <span>·</span>
            <span>REPLY <b>&lt; 24h</b></span>
          </div>
        </div>
      </form>
    </div>
  );
}
