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
  > - Déploiement progressif : équipes internes, puis clients externes
  > - Monitoring Sentry adapté aux contraintes du groupe, avec les ingénieurs Sentry.io
  > - Mentorat des équipes produit qui ont repris l'architecture
- EN:
  > 7 weeks of discovery and architecture: interviews with experts and executives, technical framing. Then code, shipped on schedule.
  >
  > - Co-designed a cloud-native, security-by-design architecture on GCP
  > - Vue.js SPA on a Fastify + tRPC API
  > - Phased roll-out: internal teams first, then external customers
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
  - `Standard | architecture reprise par les autres produits Carrefour Links`
- EN:
  - `< 3 s | KPI access on 10B+ transactions, down from minutes`
  - `8 weeks | MVP to beta, on schedule`
  - `3 countries | thousands of users`
  - `Standard | architecture reused by other Carrefour Links products`

---

## 2. Hoppen: `hoppen-hospital-architecture`

`order`: 2 · `stack`: TypeScript, Node.js, Fastify, React, Docker, Clean Architecture, Domain-Driven Design · `experience`: link the "Hoppen" entry

| Field   | FR                                                        | EN                                               |
| ------- | --------------------------------------------------------- | ------------------------------------------------ |
| title   | Moderniser des solutions hospitalières sans tout réécrire | Modernizing hospital software one step at a time |
| context | Hoppen · solutions hospitalières                          | Hoppen · hospital software                       |
| period  | juil. 2025 / avr. 2026                                    | Jul. 2025 / Apr. 2026                            |
| role    | Tech Lead / Architecte logiciel                           | Tech Lead / Software Architect                   |

**problem**

- FR: Les solutions hospitalières de Hoppen reposaient sur des systèmes legacy, et les processus de développement devaient gagner en maturité. [TO CONFIRM: le point de départ concret, par ex. fréquence de livraison, incidents, taille de l'équipe]
- EN: Hoppen's hospital software ran on legacy systems, and its development process had to mature. [TO CONFIRM: the concrete starting point, e.g. release frequency, incidents, team size]

**approach**

- FR:
  > Faire évoluer l'architecture et l'équipe en même temps.
  >
  > - Conception d'architectures hybrides edge-cloud et event-driven
  > - Refonte progressive des systèmes legacy
  > - Stratégies d'intégration complexes et observabilité
  > - Coaching et montée en compétences des équipes
  > - Modernisation de la CI/CD, de la code review et du monitoring
- EN:
  > Evolve the architecture and the team together.
  >
  > - Designed hybrid edge-cloud and event-driven architectures
  > - Modernized legacy systems step by step
  > - Complex integration strategies and observability
  > - Coached and upskilled the engineering teams
  > - Modernized CI/CD, code review and monitoring

**architecture**

- FR:
  - Hybride edge-cloud, event-driven
  - Clean Architecture et Domain-Driven Design
- EN:
  - Hybrid edge-cloud, event-driven
  - Clean Architecture and Domain-Driven Design

**results** (no number on the site: all placeholders)

- FR:
  - `[TO CONFIRM: valeur] | [TO CONFIRM: par ex. fréquence de déploiement après la modernisation CI/CD]`
  - `[TO CONFIRM: valeur] | [TO CONFIRM: par ex. part du legacy migrée]`
- EN:
  - `[TO CONFIRM: value] | [TO CONFIRM: e.g. deployment frequency after the CI/CD modernization]`
  - `[TO CONFIRM: value] | [TO CONFIRM: e.g. share of the legacy system migrated]`

---

## 3. Jackpot (Bimpli, Groupe BPCE): `jackpot-back-office`

`order`: 3 · `stack`: TypeScript, React, React Query, React Hook Form, Tailwind CSS, Nest.js, Pulumi, GCP · `experience`: link the "Jackpot (Bimpli – Groupe BPCE)" entry

| Field   | FR                                                                       | EN                                                      |
| ------- | ------------------------------------------------------------------------ | ------------------------------------------------------- |
| title   | Un back-office modulaire pour étendre Jackpot au-delà des cartes cadeaux | A modular back-office to take Jackpot beyond gift cards |
| context | Jackpot · Bimpli, Groupe BPCE                                            | Jackpot · Bimpli, Groupe BPCE                           |
| period  | avr. 2022 / févr. 2023                                                   | Apr. 2022 / Feb. 2023                                   |
| role    | Développeur full-stack TypeScript, freelance                             | Full-stack TypeScript developer, freelance              |

**problem**

- FR: L'API Jackpot changeait en profondeur. Le service avait besoin d'un back-office pour l'opérer, et l'offre devait aller au-delà des cartes cadeaux, sur un domaine métier complexe. [TO CONFIRM: comment le service était opéré avant]
- EN: The Jackpot API was going through a major change. The service needed a back-office to operate it, and the offer had to grow beyond gift cards, in a complex business domain. [TO CONFIRM: how the service was operated before]

**approach**

- FR:
  > Un back-office modulaire, une seule base de code, une infrastructure en code.
  >
  > - Monorepo TypeScript : React 18, React Query, React Hook Form, Tailwind CSS côté client, Nest.js côté serveur
  > - Infrastructure GCP automatisée avec Pulumi (IaC)
  > - Chaîne CI/CD
  > - Un domaine métier complexe traduit en une expérience fluide
- EN:
  > One modular back-office, one codebase, infrastructure as code.
  >
  > - TypeScript monorepo: React 18, React Query, React Hook Form, Tailwind CSS on the client, Nest.js on the server
  > - GCP infrastructure automated with Pulumi (IaC)
  > - Unified, repeatable CI/CD pipeline
  > - A complex business domain turned into a smooth user experience

**architecture**

- FR:
  - Back-office modulaire
  - Monorepo TypeScript, front et back
  - Infrastructure as code (Pulumi, GCP)
- EN:
  - Modular back-office
  - TypeScript monorepo, front and back
  - Infrastructure as code (Pulumi, GCP)

**results**

- FR:
  - `Au-delà des cartes cadeaux | back-office modulaire conçu pour étendre l'offre`
  - `IaC | infrastructure GCP automatisée avec Pulumi`
  - `[TO CONFIRM: valeur] | [TO CONFIRM: par ex. nombre de nouvelles offres ou d'opérateurs servis]`
- EN:
  - `Beyond gift cards | modular back-office built to extend the offer`
  - `IaC | GCP infrastructure automated with Pulumi`
  - `[TO CONFIRM: value] | [TO CONFIRM: e.g. number of new offers or operators served]`

---

## Facts used that appear in one language only

- "thousands of users" and "MVP to beta": EN Carrefour entry only (FR says "Livraison du MVP en 8 semaines", "Montée en charge dans 3 pays"). Used in both drafts.
- "solutions hospitalières": FR Hoppen entry only. Used in both drafts (EN "hospital software").
- "unified, repeatable CI/CD pipeline": EN Jackpot entry only. Used in the EN draft only.
