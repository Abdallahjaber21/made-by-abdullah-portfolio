/* eslint-disable @next/next/no-img-element */
import ClientMarquee from "./ClientMarquee";

const CLIENT_LOGOS: Array<{ name: string; src: string }> = [
  { name: "Samar", src: "/assets/clients/samar.png" },
  { name: "Saxon", src: "/assets/clients/saxon.png" },
  { name: "Pepsi Lebanon", src: "/assets/clients/pepsi.png" },
  { name: "Almawi", src: "/assets/clients/almawi.png" },
  { name: "Zmerly", src: "/assets/clients/zmerly.png" },
  { name: "Zakey", src: "/assets/clients/zakey.png" },
  { name: "Nasaq Agency", src: "/assets/clients/nasaq.svg" },
];

interface Engagement {
  logo?: string;
  initials: string;
  who: string;
  sector: string;
  text: string;
  stack: string;
}

const ENGAGEMENTS: Engagement[] = [
  {
    logo: "/assets/clients/samar.png",
    initials: "SA",
    who: "Samar",
    sector: "Mobile Development",
    text: "“Abdallah turned our idea into a polished multiplayer game that just works. The real-time gameplay is smooth, the backend never buckles under load, and he delivered on time. Our players love it.”",
    stack: "Flutter · Yii2 · Redis",
  },
  {
    logo: "/assets/clients/saxon.png",
    initials: "SX",
    who: "Saxon",
    sector: "SaaS",
    text: "“He rebuilt our entire point-of-sale from the ground up — inventory, barcodes, reporting, the lot. It's fast, reliable, and the team picked it up in a day. Easily one of the best engineers we've worked with.”",
    stack: "Yii2 · MySQL · Redis",
  },
  {
    logo: "/assets/clients/pepsi.png",
    initials: "PL",
    who: "Pepsi Lebanon",
    sector: "Custom Solutions",
    text: "“Our mobile store has never run better. Orders, delivery tracking, promotions — everything is seamless and the app feels genuinely premium. Abdallah is a true professional, start to finish.”",
    stack: "Yii2 · Cordova · Framework7",
  },
];

export default function Clients() {
  return (
    <section id="clients" data-screen-label="Clients" className="clients">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">04 · Clients</span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              Teams I&apos;ve<br />built for.
            </h2>
          </div>
          <p className="lead reveal">
            A range of clients across games, retail, FMCG, real estate, and agencies — work shipped
            and running in production, not slideware.
          </p>
        </div>
      </div>

      <ClientMarquee logos={CLIENT_LOGOS} />

      <div className="container">
        <div className="testimonials">
          {ENGAGEMENTS.map((e) => (
            <div className="test-card reveal" key={e.who}>
              <p className="quote">{e.text}</p>
              <div className="author">
                {e.logo ? (
                  <span className="author-logo" title={e.who}>
                    <img src={e.logo} alt={e.who} loading="lazy" />
                  </span>
                ) : (
                  <div className="avatar">{e.initials}</div>
                )}
                <div>
                  <div className="who">{e.who}</div>
                  <div className="role">{e.sector} · {e.stack}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
