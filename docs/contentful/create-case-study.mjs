// One-off: create the caseStudy content type and the Carrefour Links entry.
// Usage (from the repo root):
//   node --env-file=.env docs/contentful/create-case-study.mjs          # read-only checks
//   node --env-file=.env docs/contentful/create-case-study.mjs --apply  # write and publish
// Needs PUBLIC_CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN (CFPAT-…).

import { readFileSync } from "node:fs";

const SPACE = process.env.PUBLIC_CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const APPLY = process.argv.includes("--apply");
const BASE = `https://api.contentful.com/spaces/${SPACE}/environments/master`;
const CONTENT_TYPE_ID = "caseStudy";
const ENTRY_ID = "carrefour-links-analytics";
const CARREFOUR_EXPERIENCE_ID = "14fFh2adlvWzr2m9YRY815";

if (!SPACE || !TOKEN) {
  throw new Error(
    "Set PUBLIC_CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN",
  );
}

async function cma(method, path, { body, headers = {} } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      ...headers,
    },
    body: body && JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

function expectOk({ status, json }, what) {
  if (status >= 300) {
    throw new Error(`${what} failed (${status}): ${JSON.stringify(json)}`);
  }
  return json;
}

const text = (value) => ({ nodeType: "text", value, marks: [], data: {} });
const paragraph = (value) => ({
  nodeType: "paragraph",
  data: {},
  content: [text(value)],
});
const richText = (intro, items) => ({
  nodeType: "document",
  data: {},
  content: [
    paragraph(intro),
    {
      nodeType: "unordered-list",
      data: {},
      content: items.map((item) => ({
        nodeType: "list-item",
        data: {},
        content: [paragraph(item)],
      })),
    },
  ],
});

const fields = {
  title: {
    fr: "KPI en moins de 3 s sur plus de 10 milliards de transactions retail",
    en: "KPIs in under 3 s on 10 billion+ retail transactions",
  },
  slug: { fr: ENTRY_ID },
  context: {
    fr: "Carrefour Links Growth · donnée retail Carrefour",
    en: "Carrefour Links Growth · Carrefour retail data",
  },
  period: { fr: "févr. 2023 / juil. 2024", en: "Feb. 2023 / Jul. 2024" },
  role: {
    fr: "Lead Full-Stack Engineer, freelance",
    en: "Lead Full-Stack Engineer, freelance",
  },
  problem: {
    fr: "Carrefour Links Growth permet de collaborer autour de la donnée de Carrefour. Les KPI mettaient plusieurs minutes à charger. Il fallait une webapp analytique neuve, sécurisée dès la conception, pour les équipes internes et les clients externes.",
    en: "Carrefour Links Growth lets teams collaborate around Carrefour data. KPIs took minutes to load. The project needed a new analytics web app, secure by design, for internal teams and external customers.",
  },
  approach: {
    fr: richText(
      "7 semaines de discovery et d'architecture : interviews d'experts et de la direction, cadrage technique. Puis le code, livré dans les délais.",
      [
        "Co-conception d'une architecture cloud-native et secure-by-design sur GCP",
        "SPA Vue.js, API Fastify + tRPC",
        "Déploiement progressif auprès des équipes internes et des clients externes",
        "Monitoring Sentry adapté aux contraintes du groupe, avec les ingénieurs Sentry.io",
        "Mentorat des équipes produit qui ont repris l'architecture",
      ],
    ),
    en: richText(
      "7 weeks of discovery and architecture: interviews with experts and executives, technical framing. Then code, shipped on schedule.",
      [
        "Co-designed a cloud-native, security-by-design architecture on GCP",
        "Vue.js SPA on a Fastify + tRPC API",
        "Phased roll-out to internal teams and external customers",
        "Sentry monitoring tailored to Carrefour's constraints, with Sentry.io engineers",
        "Mentored the product teams that reused the architecture",
      ],
    ),
  },
  architecture: {
    fr: [
      "Architecture devenue le standard Carrefour Links",
      "GCP : Cloud Run, Cloud Functions, Pub/Sub, Cloud SQL",
      "Observabilité de bout en bout : alertes et tracing Sentry, front et back",
    ],
    en: [
      "Architecture adopted as the Carrefour Links standard",
      "GCP: Cloud Run, Cloud Functions, Pub/Sub, Cloud SQL",
      "End-to-end observability: Sentry alerts and tracing, front and back",
    ],
  },
  results: {
    fr: [
      "< 3 s | accès aux KPI sur 10 Md+ de transactions, contre plusieurs minutes avant",
      "8 semaines | du MVP à la bêta, dans les délais",
      "3 pays | des milliers d'utilisateurs",
      "Standard | architecture devenue le standard Carrefour Links, reprise par d'autres équipes",
    ],
    en: [
      "< 3 s | KPI access on 10B+ transactions, down from minutes",
      "8 weeks | MVP to beta, on schedule",
      "3 countries | thousands of users",
      "Standard | architecture adopted across Carrefour Links, reused by other teams",
    ],
  },
  stack: {
    fr: [
      "TypeScript",
      "Node.js",
      "Vue.js",
      "Fastify",
      "tRPC",
      "Tailwind CSS",
      "PostgreSQL",
      "Casbin",
      "GCP",
      "Looker",
      "Sentry",
    ],
  },
  experience: {
    fr: {
      sys: { type: "Link", linkType: "Entry", id: CARREFOUR_EXPERIENCE_ID },
    },
  },
  order: { fr: 1 },
};

// ---- Read-only checks ----
const locales = expectOk(
  await cma("GET", "/locales"),
  "Token check (list locales)",
);
console.log("Token OK. Locales:", locales.items.map((l) => l.code).join(", "));

const existingType = await cma("GET", `/content_types/${CONTENT_TYPE_ID}`);
const existingEntry = await cma("GET", `/entries/${ENTRY_ID}`);
const experience = await cma("GET", `/entries/${CARREFOUR_EXPERIENCE_ID}`);
console.log(
  `Content type "${CONTENT_TYPE_ID}":`,
  existingType.status === 200 ? "exists" : "absent",
);
console.log(
  `Entry "${ENTRY_ID}":`,
  existingEntry.status === 200 ? "exists" : "absent",
);
console.log(
  "Carrefour experience entry:",
  experience.status === 200 ? "found" : `NOT FOUND (${experience.status})`,
);

if (experience.status !== 200)
  throw new Error("Linked experience entry is missing");

if (!APPLY) {
  console.log(
    "\nDry run: nothing written. Re-run with --apply to create and publish.",
  );
  process.exit(0);
}

// ---- Writes ----
if (existingType.status !== 200) {
  const definition = JSON.parse(
    readFileSync(
      new URL("./case-study.content-type.json", import.meta.url),
      "utf8",
    ),
  );
  const created = expectOk(
    await cma("PUT", `/content_types/${CONTENT_TYPE_ID}`, { body: definition }),
    "Create content type",
  );
  expectOk(
    await cma("PUT", `/content_types/${CONTENT_TYPE_ID}/published`, {
      headers: { "X-Contentful-Version": String(created.sys.version) },
    }),
    "Publish content type",
  );
  console.log("Content type created and published.");
} else {
  console.log("Content type exists: left unchanged.");
}

if (existingEntry.status === 200) {
  throw new Error(
    `Entry "${ENTRY_ID}" already exists: edit it in the Contentful UI instead.`,
  );
}

const entry = expectOk(
  await cma("PUT", `/entries/${ENTRY_ID}`, {
    body: { fields },
    headers: { "X-Contentful-Content-Type": CONTENT_TYPE_ID },
  }),
  "Create entry",
);
expectOk(
  await cma("PUT", `/entries/${ENTRY_ID}/published`, {
    headers: { "X-Contentful-Version": String(entry.sys.version) },
  }),
  "Publish entry",
);
console.log(`Entry "${ENTRY_ID}" created and published (fr + en).`);
