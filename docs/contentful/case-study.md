# Content type `caseStudy`

Definition: [`case-study.content-type.json`](./case-study.content-type.json) (body of the Content Management API call).

## Create it

The content type id is in the URL, not in the body. The code queries `caseStudy`: keep that id.

1. `PUT /spaces/{space_id}/environments/master/content_types/caseStudy` with the JSON file as body
   (`Content-Type: application/vnd.contentful.management.v1+json`).
2. `PUT /spaces/{space_id}/environments/master/content_types/caseStudy/published`
   with header `X-Contentful-Version: <sys.version from step 1>`. An unpublished content type cannot hold entries.

Locales: `fr` (default) and `en` (falls back to `fr`). Localized fields need both values; an empty `en` shows the `fr` text.

## Fields

| Field          | Type                                                  | Localized | Required | Why                                                                                                                                                                        |
| -------------- | ----------------------------------------------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`        | Symbol                                                | yes       | yes      | Card headline, written as the outcome ("10 billion transactions, KPIs in under 3 s").                                                                                      |
| `slug`         | Symbol, unique                                        | no        | yes      | Stable anchor `#case-study-<slug>`; ready for a detail page later.                                                                                                         |
| `context`      | Symbol                                                | yes       | no       | Client and setting in one line ("Carrefour Links · retail data").                                                                                                          |
| `period`       | Symbol                                                | yes       | no       | Dates as shown on the timeline; localized because month names differ.                                                                                                      |
| `role`         | Symbol                                                | yes       | no       | What the owner was accountable for.                                                                                                                                        |
| `problem`      | Text, max 600                                         | yes       | yes      | The situation before, in 2–3 plain sentences; plain text keeps it short.                                                                                                   |
| `approach`     | RichText (paragraphs, lists, links, bold/italic/code) | yes       | no       | What was built and how; lists and emphasis help scanning.                                                                                                                  |
| `architecture` | Symbol list, max 5                                    | yes       | no       | Short architecture highlights, rendered as bullets under the approach.                                                                                                     |
| `results`      | Symbol list, max 4, format `value \| label`           | yes       | no       | Metrics as big number + caption. A list editor per locale is easier than raw JSON; the regex blocks malformed entries. Optional: not every mission has a published number. |
| `stack`        | Symbol list                                           | no        | no       | Technology tags; names do not translate.                                                                                                                                   |
| `experience`   | Link → `experiences`                                  | no        | no       | Ties the case study to its timeline entry. Not rendered yet.                                                                                                               |
| `cover`        | Link → image asset                                    | no        | no       | Optional banner image on the card.                                                                                                                                         |
| `order`        | Integer                                               | no        | yes      | Display order, ascending (1 first).                                                                                                                                        |

## Results format

One entry per metric: `value | label`. The text before the first `|` is the big number, the rest is the caption.

```
< 3 s | KPI access on 10 billion+ retail transactions
8 weeks | MVP delivery
```

## Rendering

The homepage section and its navbar link appear only when at least one published `caseStudy` entry exists.
While the content type does not exist, the Delivery API answers 400 `unknownContentType`: the code treats that as "no case studies" and the build continues. Any other Contentful error still fails the build.
