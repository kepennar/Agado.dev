import { describe, expect, it } from "vitest";

import {
  isUnknownContentTypeError,
  parseMetric,
  parseMetrics,
} from "./case-study";

describe("parseMetric", () => {
  it("splits value and label on the first pipe and trims both", () => {
    expect(parseMetric("  < 3 s |  KPI access on 10B+ transactions ")).toEqual({
      value: "< 3 s",
      label: "KPI access on 10B+ transactions",
    });
  });

  it("keeps later pipes in the label", () => {
    expect(parseMetric("3 | countries | phased roll-out")).toEqual({
      value: "3",
      label: "countries | phased roll-out",
    });
  });

  it("treats text without a pipe as a label-only metric", () => {
    expect(parseMetric("Shipped on schedule")).toEqual({
      value: "",
      label: "Shipped on schedule",
    });
  });

  it("drops blank entries", () => {
    expect(parseMetric("   ")).toBeNull();
    expect(parseMetric(" | ")).toBeNull();
  });
});

describe("parseMetrics", () => {
  it("returns an empty list for a missing field", () => {
    expect(parseMetrics(undefined)).toEqual([]);
  });

  it("maps entries in order and skips blank ones", () => {
    expect(parseMetrics(["8 weeks | MVP", "", "3 | countries"])).toEqual([
      { value: "8 weeks", label: "MVP" },
      { value: "3", label: "countries" },
    ]);
  });
});

describe("isUnknownContentTypeError", () => {
  it("matches the Delivery API error for an unknown content type", () => {
    // Shape observed from contentful.js: the message is the serialized error body.
    const error = new Error(
      JSON.stringify({
        status: 400,
        message: "The query you sent was invalid.",
        details: {
          errors: [{ name: "unknownContentType", value: "DOESNOTEXIST" }],
        },
      }),
    );
    expect(isUnknownContentTypeError(error)).toBe(true);
  });

  it("does not match other errors", () => {
    expect(isUnknownContentTypeError(new Error('{"status": 401}'))).toBe(false);
    expect(isUnknownContentTypeError(null)).toBe(false);
    expect(isUnknownContentTypeError("unknownContentType")).toBe(false);
  });
});
