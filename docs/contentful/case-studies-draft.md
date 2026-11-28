# Case studies: draft entries

Ready to paste into Contentful (content type `caseStudy`, see `case-study.md`).
Source: the experience entries on https://agado.dev/ (FR) and https://agado.dev/en (EN), read on 2026-11-27. No other facts are used.
`[TO CONFIRM: …]` marks a fact the site does not state. Replace it or delete the line before publishing: Contentful accepts placeholder text, so it would go live as written.

---

## 1. Carrefour Links: `carrefour-links-analytics`

`order`: 1 · `stack`: TypeScript, Node.js, Vue.js, Fastify, tRPC, Tailwind CSS, PostgreSQL, Casbin, GCP, Looker, Sentry · `experience`: link the "Carrefour Links" entry

| Field   | FR                                                                  | EN                                                   |
| ------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| title   | KPI en moins de 3 s sur plus de 10 milliards de transactions retail | KPIs in under 3 s on 10 billion+ retail transactions |
| context | Carrefour Links Growth · donnée retail Carrefour                    | Carrefour Links Growth · Carrefour retail data       |
| period  | févr. 2023 / juil. 2024                                             | Feb. 2023 / Jul. 2024                                |
| role    | Lead Full-Stack Engineer, freelance                                 | Lead Full-Stack Engineer, freelance                  |

**problem**

- FR: Carrefour Links Growth permet de collaborer autour de la donnée de Carrefour. Les KPI mettaient plusieurs minutes à charger. Il fallait une webapp analytique neuve, sécurisée dès la conception, pour les équipes internes et les clients externes.
- EN: Carrefour Links Growth lets teams collaborate around Carrefour data. KPIs took minutes to load. The project needed a new analytics web app, secure by design, for internal teams and external customers.

**approach** (rich text, one paragraph + list)

- FR:
  > 7 semaines de discovery et d'architecture : interviews d'experts et de la direction, cadrage technique. Puis le code, livré dans les délais.
  >
  > - Co-conception d'une architecture cloud-native et secure-by-design sur GCP
  > - SPA Vue.js, API Fastify + tRPC
  > - Déploiement progressif auprès des équipes internes et des clients externes
  > - Monitoring Sentry adapté aux contraintes du groupe, avec les ingénieurs Sentry.io
  > - Mentorat des équipes produit qui ont repris l'architecture
- EN:
  > 7 weeks of discovery and architecture: interviews with experts and executives, technical framing. Then code, shipped on schedule.
  >
  > - Co-designed a cloud-native, security-by-design architecture on GCP
  > - Vue.js SPA on a Fastify + tRPC API
  > - Phased roll-out to internal teams and external customers
  > - Sentry monitoring tailored to Carrefour's constraints, with Sentry.io engineers
  > - Mentored the product teams that reused the architecture

**architecture**

- FR:
  - Architecture devenue le standard Carrefour Links
  - GCP : Cloud Run, Cloud Functions, Pub/Sub, Cloud SQL
  - Observabilité de bout en bout : alertes et tracing Sentry, front et back
- EN:
  - Architecture adopted as the Carrefour Links standard
  - GCP: Cloud Run, Cloud Functions, Pub/Sub, Cloud SQL
  - End-to-end observability: Sentry alerts and tracing, front and back

**results**

- FR:
  - `< 3 s | accès aux KPI sur 10 Md+ de transactions, contre plusieurs minutes avant`
  - `8 semaines | du MVP à la bêta, dans les délais`
  - `3 pays | des milliers d'utilisateurs`
  - `Standard | architecture devenue le standard Carrefour Links, reprise par d'autres équipes`
- EN:
  - `< 3 s | KPI access on 10B+ transactions, down from minutes`
  - `8 weeks | MVP to beta, on schedule`
  - `3 countries | thousands of users`
  - `Standard | architecture adopted across Carrefour Links, reused by other teams`

---

## Facts used that appear in one language only

- "thousands of users" and "MVP to beta": EN Carrefour entry only (FR says "Livraison du MVP en 8 semaines", "Montée en charge dans 3 pays"). Used in both drafts.
