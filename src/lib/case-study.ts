// Case study helpers, kept apart from contentful.ts so tests can import them
// without Contentful credentials.

export interface CaseStudyMetric {
  value: string;
  label: string;
}

/**
 * Parse a results entry written as "value | label" (e.g. "< 3 s | KPI load time").
 * Text without "|" becomes a label-only metric. Blank entries are dropped.
 */
export function parseMetric(raw: string): CaseStudyMetric | null {
  const separator = raw.indexOf("|");
  const value = separator === -1 ? "" : raw.slice(0, separator).trim();
  const label = raw.slice(separator + 1).trim();
  if (!value && !label) return null;
  return { value, label };
}

export function parseMetrics(raw: string[] | undefined): CaseStudyMetric[] {
  return (raw ?? [])
    .map(parseMetric)
    .filter((metric): metric is CaseStudyMetric => metric !== null);
}

/**
 * True when the Delivery API rejects a query because the content type id
 * does not exist in the space (HTTP 400 InvalidQuery, detail "unknownContentType").
 */
export function isUnknownContentTypeError(error: unknown): boolean {
  const message = (error as { message?: unknown } | null)?.message;
  return typeof message === "string" && message.includes("unknownContentType");
}
