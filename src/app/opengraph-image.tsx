import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Dynamic social-share card served at /opengraph-image (referenced by the
 * default OpenGraph + Twitter metadata). Generated at build via next/og.
 *
 * Styled to match the live default theme a first-time visitor sees:
 * dark navy page bg with the Signal-red accent glow + monogram.
 */
export const runtime = "edge";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Live default theme tokens (see globals.css / theme.ts).
const BG = "#0d0f24";
const FG = "#f4f5fb";
const ACCENT = "#d62d49"; // Signal red — the portfolio default accent
const ACCENT_DEEP = "#7c1424";
const MUTED = "#8b8fae";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent glow, anchored bottom-right like the site's hero. */}
        <div
          style={{
            position: "absolute",
            right: "-160px",
            bottom: "-200px",
            width: "640px",
            height: "640px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}55 0%, ${ACCENT_DEEP}22 45%, transparent 70%)`,
          }}
        />

        {/* Monogram tile — mirrors app/icon.svg. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "96px",
            height: "96px",
            borderRadius: "22px",
            background: `linear-gradient(135deg, ${ACCENT_DEEP} 0%, ${ACCENT} 100%)`,
            color: "#ffffff",
            fontSize: "58px",
            fontWeight: 700,
          }}
        >
          A
        </div>

        {/* Name + role + tagline. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 700,
              color: FG,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: "40px",
              fontWeight: 600,
              color: ACCENT,
              marginTop: "16px",
            }}
          >
            {siteConfig.role}
          </div>
          <div
            style={{
              width: "120px",
              height: "5px",
              background: ACCENT,
              borderRadius: "999px",
              margin: "28px 0",
            }}
          />
          <div style={{ fontSize: "30px", color: MUTED }}>
            Engineering, calmly. Systems at scale.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
