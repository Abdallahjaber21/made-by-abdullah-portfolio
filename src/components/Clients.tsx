"use client";
/* eslint-disable @next/next/no-img-element */

import ClientMarquee from "./ClientMarquee";
import { useT } from "./LocaleProvider";

const CLIENT_LOGOS: Array<{ name: string; src: string }> = [
  { name: "Samar", src: "/assets/clients/samar.png" },
  { name: "Saxon", src: "/assets/clients/saxon.png" },
  { name: "Pepsi Lebanon", src: "/assets/clients/pepsi.png" },
  { name: "Almawi", src: "/assets/clients/almawi.png" },
  { name: "Zmerly", src: "/assets/clients/zmerly.png" },
  { name: "Zakey", src: "/assets/clients/zakey.png" },
  { name: "Nasaq Agency", src: "/assets/clients/nasaq.svg" },
];

type EngagementKey = "samar" | "saxon" | "pepsi";

const ENGAGEMENTS: Array<{ key: EngagementKey; logo: string; who: string; initials: string }> = [
  { key: "samar", logo: "/assets/clients/samar.png", who: "Samar", initials: "SA" },
  { key: "saxon", logo: "/assets/clients/saxon.png", who: "Saxon", initials: "SX" },
  { key: "pepsi", logo: "/assets/clients/pepsi.png", who: "Pepsi Lebanon", initials: "PL" },
];

export default function Clients() {
  const t = useT();
  return (
    <section id="clients" data-screen-label="Clients" className="clients">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.clients.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              {t.clients.headingA}
              <br />
              {t.clients.headingB}
            </h2>
          </div>
          <p className="lead reveal">{t.clients.lead}</p>
        </div>
      </div>

      <ClientMarquee logos={CLIENT_LOGOS} />

      <div className="container">
        <div className="testimonials">
          {ENGAGEMENTS.map((e) => (
            <div className="test-card reveal" key={e.key}>
              <p className="quote">{t.clients.testimonials[e.key]}</p>
              <div className="author">
                <span className="author-logo" title={e.who}>
                  <img src={e.logo} alt={e.who} loading="lazy" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
