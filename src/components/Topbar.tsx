import Link from "next/link";
import { siteConfig } from "@/config/site";

const NAV: Array<[string, string, string]> = [
  ["about", "01", "About"],
  ["services", "02", "Services"],
  ["projects", "03", "Work"],
  ["clients", "04", "Clients"],
  ["manifesto", "05", "Manifesto"],
  ["contact", "06", "Contact"],
];

/** `base` is "" on the home page (in-page anchors) and "/" elsewhere. */
export default function Topbar({ base = "" }: { base?: string }) {
  const home = base || "#top";
  const [first, ...rest] = siteConfig.name.split(" ");
  return (
    <header className="topbar" role="banner">
      <Link className="brand" href={home} aria-label="Home">
        <span className="brand-mark">{first.charAt(0)}</span>
        <span className="brand-name">
          <b>{siteConfig.name}</b> <span>· {rest.length ? "Engineer" : siteConfig.role}</span>
        </span>
      </Link>
      <nav className="nav" aria-label="Primary">
        {NAV.map(([id, num, label]) => (
          <Link key={id} href={`${base}#${id}`} data-num={num}>
            {label}
          </Link>
        ))}
      </nav>
      <Link className="topbar-cta" href={`${base}#contact`}>
        <span className="dot" /> {siteConfig.availability}
      </Link>
    </header>
  );
}
