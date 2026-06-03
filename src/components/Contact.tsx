"use client";

import { track } from "@vercel/analytics";
import ContactCore from "./canvas/ContactCore";
import ContactForm from "./ContactForm";
import { siteConfig, activeSocials } from "@/config/site";
import { SocialIcons, GeneralIcons, type SocialName } from "./icons";
import { useT } from "./LocaleProvider";

export default function Contact() {
  const t = useT();
  const socials = activeSocials();
  return (
    <section id="contact" data-screen-label="Contact" className="contact-cinematic">
      <ContactCore />

      <div className="contact-stage">
        <div className="channel-meta reveal">
          <span className="dot" />
          <span>{t.contact.meta}</span>
        </div>

        <h2 className="establish reveal">
          {t.contact.headingA}
          <em>{t.contact.headingEm}</em>
          {t.contact.headingB}
        </h2>
        <p className="establish-sub reveal">{t.contact.sub}</p>

        <div className="handshake reveal">
          <span className="hs-dot" />
          <span className="hs-status">{t.contact.available}</span>
          <span className="hs-sep">·</span>
          <span>{t.contact.replies}</span>
          <span className="hs-sep">·</span>
          <span>
            {siteConfig.location.toUpperCase()} · {siteConfig.timezone}
          </span>
        </div>

        <ContactForm />

        <div className="contact-channels reveal">
          <a href={`mailto:${siteConfig.email}`}>
            <GeneralIcons.Mail /> {siteConfig.email}
          </a>
          {socials.map((s) => {
            const SocialIcon = SocialIcons[s.icon as SocialName] ?? SocialIcons.Github;
            return (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                <SocialIcon /> {s.label}
              </a>
            );
          })}
          {siteConfig.cvUrl && (
            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("cv_download")}
            >
              <GeneralIcons.Download /> {t.contact.resume}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
