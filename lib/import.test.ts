import { describe, it, expect } from "vitest";
import { detectPlatform, importFromUrl, DEMO_LISTINGS } from "./import";

describe("listing import", () => {
  it("detects the platform from the url", () => {
    expect(detectPlatform("https://rental.turbotenant.com/p/x/abc")).toBe("turbotenant");
    expect(detectPlatform("https://www.zillow.com/homedetails/x")).toBe("zillow");
    expect(detectPlatform("https://albuquerque.craigslist.org/apa/x")).toBe("craigslist");
    expect(detectPlatform("not a url")).toBe("other");
  });

  it("imports a known demo listing with only the fields we know, gaps flagged", async () => {
    const id = "6048506c-49d2-44df-ab7a-15b622fe10be";
    const r = await importFromUrl(DEMO_LISTINGS[id].url);
    expect(r.source).toBe("demo-adapter");
    expect(r.fields.statedRent).toBe(1250);
    expect(r.fields.address).toContain("Harvard");
    // beds/baths/sqft are unknown and must surface as gaps, not invented
    expect(r.gaps).toContain("beds");
    expect(r.gaps).toContain("baths");
    expect(r.gaps).toContain("sqft");
    expect(r.fields.beds ?? null).toBeNull();
  });
});
