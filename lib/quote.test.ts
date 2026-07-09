import { describe, it, expect } from "vitest";
import { computeQuote, estimateMarketRent } from "./quote";

describe("quote engine", () => {
  it("anchors to a stated rent and prices both offers (levario, $1,250)", () => {
    const q = computeQuote({ statedRent: 1250 });
    expect(q.marketRent.value).toBe(1250);
    expect(q.marketRent.method).toBe("anchor");
    // 8% management fee
    expect(q.management.feePct).toBe(0.08);
    expect(q.management.feeMonthly).toBe(100);
    // guaranteed = 1250 * (1 - 0.05 - 0.07) = 1100
    expect(q.guaranteed.monthly).toBe(1100);
    expect(q.guaranteed.vacancyReservePct).toBe(0.05);
    expect(q.guaranteed.riskMarginPct).toBe(0.07);
  });

  it("prices the second prospect (baca, $1,950)", () => {
    const q = computeQuote({ statedRent: 1950 });
    expect(q.management.feeMonthly).toBe(156);
    expect(q.guaranteed.monthly).toBe(1716); // 1950 * 0.88
  });

  it("widens the spread when the unit needs work", () => {
    const q = computeQuote({ statedRent: 2000, condition: "needs work" });
    // vacancy 0.08 + risk 0.09 => 0.83 payout
    expect(q.guaranteed.monthly).toBe(1660);
    expect(q.guaranteed.vacancyReservePct).toBeCloseTo(0.08);
    expect(q.guaranteed.riskMarginPct).toBeCloseTo(0.09);
  });

  it("falls back to a modeled estimate when nothing is stated", () => {
    const r = estimateMarketRent({});
    expect(r.method).toBe("model");
    expect(r.value).toBeGreaterThanOrEqual(600);
    expect(r.value).toBeLessThanOrEqual(6000);
    expect(r.factors.length).toBeGreaterThan(0);
  });

  it("every breakdown line carries a cited detail (no black box)", () => {
    const q = computeQuote({ statedRent: 1250 });
    for (const f of q.guaranteed.breakdown) {
      expect(f.detail.length).toBeGreaterThan(0);
    }
  });
});
