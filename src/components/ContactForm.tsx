"use client";

import { useEffect, useRef, useState } from "react";
import { emitContact } from "./canvas/ContactCore";
import { siteConfig } from "@/config/site";
import { useT } from "./LocaleProvider";

type ProjectTypeKey = "web" | "mobile" | "saas" | "backend" | "ai" | "other";
const PROJECT_TYPE_KEYS: ProjectTypeKey[] = ["web", "mobile", "saas", "backend", "ai", "other"];

type Status = "idle" | "sending" | "sent" | "error";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function ContactForm() {
  const t = useT();
  const f = t.contact.form;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState<ProjectTypeKey>("web");
  const [company, setCompany] = useState(""); // honeypot — must stay empty
  const [status, setStatus] = useState<Status>("idle");
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    emitContact({ kind: "transmit" });

    try {
      // Run the request alongside a short floor so the transmit animation reads.
      const [res] = await Promise.all([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, projectType, message, ref, company }),
        }),
        sleep(1200),
      ]);
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
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
          <span className="form-title">{f.title}</span>
          <span className="form-id">{ref}</span>
        </div>

        {/* Honeypot — hidden from real users; bots that fill it are dropped. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />

        <div className="field-grid">
          <div className="field">
            <label htmlFor="cf-name">
              {f.name} <span className="lbl-id">01</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              placeholder={f.namePlaceholder}
              required
              value={name}
              onChange={(e) => { setName(e.target.value); onType(); }}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
            />
          </div>
          <div className="field">
            <label htmlFor="cf-email">
              {f.email} <span className="lbl-id">02</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              placeholder={f.emailPlaceholder}
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); onType(); }}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
            />
          </div>

          <div className="field full">
            <label>
              {f.projectType} <span className="lbl-id">03</span>
            </label>
            <div className="project-types">
              {PROJECT_TYPE_KEYS.map((key) => (
                <button
                  type="button"
                  key={key}
                  className={`chip${projectType === key ? " is-active" : ""}`}
                  onClick={() => { setProjectType(key); emitContact({ kind: "pulse" }); }}
                >
                  {f.types[key]}
                </button>
              ))}
            </div>
          </div>

          <div className="field full">
            <label htmlFor="cf-msg">
              {f.details} <span className="lbl-id">04</span>
            </label>
            <textarea
              id="cf-msg"
              name="message"
              placeholder={f.detailsPlaceholder}
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

        {status === "error" && (
          <p className="form-error" role="alert">
            {f.error}
          </p>
        )}

        <div className="transmit-row">
          <div className="transmit-meta">
            <span><span className="key">{f.repliesKey}</span> {f.repliesVal}</span>
            <span>·</span>
            <span>
              <span className="key">{f.basedKey}</span> {siteConfig.location} · {siteConfig.timezone}
            </span>
          </div>
          <button
            type="submit"
            className="btn-transmit"
            disabled={status === "sending" || status === "sent"}
          >
            {status === "sending" ? f.sending : status === "error" ? f.retry : f.send}{" "}
            <span className="arrow">→</span>
          </button>
        </div>

        <div className={`transmission-confirm${status === "sent" ? " show" : ""}`}>
          <div className="ring-icon">✓</div>
          <h3>
            {f.sentHeadingA}
            <em>{f.sentHeadingEm}</em>
          </h3>
          <p>{f.sentBody}</p>
          <div className="signal-meta">
            <span>{f.sentRef} <b>{ref}</b></span>
            <span>·</span>
            <span>{f.sentStatus} <b>{f.sentStatusVal}</b></span>
            <span>·</span>
            <span>{f.sentReply} <b>&lt; 24h</b></span>
          </div>
        </div>
      </form>
    </div>
  );
}
