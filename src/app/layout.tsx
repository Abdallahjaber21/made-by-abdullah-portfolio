import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/config/site";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description:
    "Staff software engineer building and scaling SaaS platforms, backend systems, and AI-powered products. Seven-plus years across startups, SaaS, and enterprise software.",
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: "Engineering, calmly. Systems at scale.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0f24",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Apply the stored theme + locale before first paint to avoid a flash of the
// default (wrong accent / wrong language direction).
const noFlash = `(function(){try{
var deep={"#a160c5":"#7a3d9b","#7a3d9b":"#3d1f55","#8c93cf":"#5d63a8","#5d8dff":"#3358cf","#22d3ee":"#0e8aa2","#d62d49":"#7c1424"};
var a=(localStorage.getItem('mba.accent')||'#d62d49').toLowerCase();
var m=localStorage.getItem('mba.mode')||'dark';
var d=deep[a]||a;var r=document.documentElement;
function ax(al){return Math.round(al*255).toString(16).padStart(2,'0');}
r.setAttribute('data-mode',m);
r.style.setProperty('--accent',a);
r.style.setProperty('--accent-deep',d);
r.style.setProperty('--accent-glow',a+ax(0.55));
r.style.setProperty('--accent-soft',a+ax(0.12));
r.style.setProperty('--grad-purple','linear-gradient(135deg, '+d+' 0%, '+a+' 100%)');
var loc=localStorage.getItem('mba.locale')==='ar'?'ar':'en';
r.setAttribute('lang',loc);
r.setAttribute('dir',loc==='ar'?'rtl':'ltr');
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-mode="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
        {/* If JS is unavailable, GSAP never runs — keep reveal content visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.hero h1 .tline>span{transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <LocaleProvider>
          <ThemeProvider>
            <Loader />
            {children}
            <ThemeSwitcher />
          </ThemeProvider>
        </LocaleProvider>
        <SmoothScroll />
        {/* Vercel Web Analytics — privacy-friendly visitor counts, no cookies.
            Only sends data on Vercel deployments; a no-op locally. */}
        <Analytics />
      </body>
    </html>
  );
}
