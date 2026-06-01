/**
 * Central site configuration — identity + external links.
 * Edit this one file to update everything across the site.
 *
 * Links render only when their `href` is non-empty, so leaving a field blank
 * simply hides that link (nothing points to a dead URL).
 */

export interface SocialLink {
  label: string;
  href: string;
  /** key into SocialIcons (e.g. "Github", "LinkedIn", "Instagram", "X") */
  icon: string;
}

export const siteConfig = {
  name: "Abdullah Jaber Mohamad",
  shortName: "Abdullah Jaber Mohamad",
  role: "Staff Software Engineer",
  location: "Lebanon",
  timezone: "GMT+3",
  availability: "Available",
  email: "abdallahjaber719@gmail.com",
  cvUrl: "/abdallah-jaber-cv.pdf",

  /**
   * Blank URLs are hidden
   */
  socials: [
    { label: "GitHub", icon: "Github", href: "https://github.com/Abdallahjaber21" },
    { label: "LinkedIn", icon: "LinkedIn", href: "https://linkedin.com/in/abdallah-jaber-mohammad" },
  ] as SocialLink[],
} as const;

/** Socials that have a real URL configured. */
export const activeSocials = (): SocialLink[] =>
  siteConfig.socials.filter((s) => s.href.trim().length > 0);
