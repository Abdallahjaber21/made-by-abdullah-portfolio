import ContactCore from "./canvas/ContactCore";
import ContactForm from "./ContactForm";
import { siteConfig, activeSocials } from "@/config/site";
import { SocialIcons, GeneralIcons, type SocialName } from "./icons";

export default function Contact() {
  const socials = activeSocials();
  return (
    <section id="contact" data-screen-label="Contact" className="contact-cinematic">
      <ContactCore />

      <div className="contact-stage">
        <div className="channel-meta reveal">
          <span className="dot" />
          <span>GET IN TOUCH · /06</span>
        </div>

        <h2 className="establish reveal">
          Let&apos;s <em>build</em> something.
        </h2>
        <p className="establish-sub reveal">
          Tell me about the product, the system, or the problem you&apos;re solving — I&apos;ll reply
          within a day.
        </p>

        <div className="handshake reveal">
          <span className="hs-dot" />
          <span className="hs-status">AVAILABLE FOR WORK</span>
          <span className="hs-sep">·</span>
          <span>REPLIES IN ~1 DAY</span>
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
            <a href={siteConfig.cvUrl} target="_blank" rel="noopener noreferrer">
              <GeneralIcons.Download /> Résumé / CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
