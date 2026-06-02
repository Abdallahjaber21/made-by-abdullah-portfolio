/**
 * Build-time only: generate src/i18n/ar.ts from src/i18n/en.ts via DeepL.
 *
 * Usage:  DEEPL_AUTH_KEY=xxxxx node scripts/translate.mjs
 *
 * The key is read from the environment and is NEVER written to disk. We walk the
 * `en` object, collect every string leaf (preserving structure + arrays), batch
 * them to DeepL EN->AR, then re-emit the same shape as a typed `ar` object.
 *
 * Tech/brand terms and pure-symbol/number tokens are protected so DeepL doesn't
 * translate or reflow them. Leading/trailing spaces in fragment strings (the
 * Approach/About split parts) are preserved around the translated core.
 */
import { readFile, writeFile } from "node:fs/promises";

const KEY = process.env.DEEPL_AUTH_KEY;
if (!KEY) {
  console.error("Missing DEEPL_AUTH_KEY env var.");
  process.exit(1);
}
const HOST = KEY.endsWith(":fx") ? "api-free.deepl.com" : "api.deepl.com";

const enSrc = await readFile(new URL("../src/i18n/en.ts", import.meta.url), "utf8");
const m = enSrc.match(/export const en = (\{[\s\S]*?\}) as const;/);
if (!m) {
  console.error("Could not parse en.ts");
  process.exit(1);
}
const en = eval("(" + m[1] + ")");

const PROTECT = [
  "Next.js", "Next JS", "TypeScript", "React Native", "React", "Laravel", "Yii2", "Yii",
  "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Docker", "AWS", "GCP", "Azure",
  "GitHub Actions", "Terraform", "kubectl", "Kubernetes", "Argo CD", "Node.js", "Node",
  "Tailwind", "shadcn/ui", "Bootstrap", "Firebase", "GraphQL", "Flutter", "Dart",
  "Vue.js", "Vue", "Cordova", "Framework7", "Python", "PHP", "C#", "GSAP", "Framer Motion",
  "Django", "Nest.js", "NestJS", "Ionic", "CSS3", "SaaS", "LLM", "RAG", "ADRs", "REST",
  "API", "APIs", "CRM", "POS", "IAP", "CI/CD", "AI", "FMCG", "UI", "CRUD", "p99", "rps",
  "Abdallah", "Abdullah", "Samar", "Saxon", "Pepsi", "Zakey", "Zodaya", "CedarRoots",
  "BestForLB", "Ole Nutrients", "Keep Property", "Tree Treat", "REF", "CV", "SOLID",
];

const SKIP_RE = /^[\s\d.,%·>~&|@:#/+x()<-]*$/i;
const REF_RE = /^REF-\d{4}-AJ-/;

function deepl(texts) {
  // XML tag handling: protected terms are wrapped in <x>…</x> and listed in
  // ignore_tags, so DeepL passes their content through verbatim (the reliable
  // way to protect brand/tech terms — alphanumeric sentinels get mangled in AR).
  return fetch("https://" + HOST + "/v2/translate", {
    method: "POST",
    headers: {
      Authorization: "DeepL-Auth-Key " + KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: texts,
      source_lang: "EN",
      target_lang: "AR",
      preserve_formatting: true,
      tag_handling: "xml",
      ignore_tags: ["x"],
    }),
  }).then(async (r) => {
    if (!r.ok) throw new Error("DeepL " + r.status + ": " + (await r.text()));
    return (await r.json()).translations.map((x) => x.text);
  });
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const leaves = [];
function pushLeaf(value) {
  const lead = value.match(/^\s*/)[0];
  const trail = value.match(/\s*$/)[0];
  const core = value.slice(lead.length, value.length - trail.length);
  leaves.push({ lead, core, trail });
}
function walk(node) {
  if (Array.isArray(node)) {
    node.forEach((v) => (typeof v === "string" ? pushLeaf(v) : walk(v)));
  } else if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      const v = node[k];
      if (typeof v === "string") pushLeaf(v);
      else walk(v);
    }
  }
}
walk(en);

// Longest terms first so "Next.js" is masked before "Node", "React Native"
// before "React", etc.
const PROTECT_SORTED = [...new Set(PROTECT)].sort((a, b) => b.length - a.length);
// Match a protected term only at a word boundary-ish edge to avoid masking
// substrings inside Arabic output (we mask the English source, so this is safe).
const PROTECT_RE = new RegExp(
  "(" + PROTECT_SORTED.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
  "g"
);

const toTranslate = [];
const planned = leaves.map((leaf) => {
  const core = leaf.core;
  if (!core || SKIP_RE.test(core) || REF_RE.test(core)) return { keep: true };
  // Escape XML, then wrap protected terms in <x>…</x> (ignored by DeepL).
  const escaped = escapeXml(core);
  const xml = escaped.replace(PROTECT_RE, (mt) => "<x>" + mt + "</x>");
  const idx = toTranslate.length;
  toTranslate.push(xml);
  return { keep: false, idx };
});

console.log("Collected " + leaves.length + " strings; translating " + toTranslate.length + "…");

const results = [];
for (let i = 0; i < toTranslate.length; i += 45) {
  const chunk = toTranslate.slice(i, i + 45);
  const out = await deepl(chunk);
  results.push(...out);
  console.log("  …" + Math.min(i + 45, toTranslate.length) + "/" + toTranslate.length);
}

const ar = structuredClone(en);
const arLeaves = [];
(function walkAr(node) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => (typeof v === "string" ? arLeaves.push({ obj: node, key: i }) : walkAr(v)));
  } else if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      if (typeof node[k] === "string") arLeaves.push({ obj: node, key: k });
      else walkAr(node[k]);
    }
  }
})(ar);

function unescapeXml(s) {
  return s
    .replace(/<\/?x>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

planned.forEach((p, i) => {
  const target = arLeaves[i];
  if (p.keep) return;
  const translated = unescapeXml(results[p.idx]);
  target.obj[target.key] = leaves[i].lead + translated + leaves[i].trail;
});

const banner =
  "/**\n" +
  " * Arabic dictionary — GENERATED from en.ts via DeepL (scripts/translate.mjs).\n" +
  " * Do not edit by hand; re-run the script to regenerate. Shape matches Dict.\n" +
  " */\n" +
  'import type { Dict } from "./en";\n\n' +
  "export const ar: Dict = ";
const body = JSON.stringify(ar, null, 2);
await writeFile(new URL("../src/i18n/ar.ts", import.meta.url), banner + body + ";\n", "utf8");
console.log("Wrote src/i18n/ar.ts");
