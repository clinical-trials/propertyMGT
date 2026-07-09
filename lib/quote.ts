// the quote engine. pure functions, no i/o.
//
// given what we know about a unit, it returns two offers — a management quote
// and a guaranteed-rent offer — each with a breakdown that cites the inputs it
// used. nothing here is a black box: every number can be traced to a factor.
//
// none of this is a market data feed or a binding contract. the rent model is a
// simplified, clearly-labeled estimate; the offers are indicative.

export type Condition = "good" | "fair" | "needs work";

export interface QuoteInputs {
  /** a stated rent (e.g. from a listing) used as the market anchor when present */
  statedRent?: number | null;
  beds?: number | null;
  baths?: number | null;
  sqft?: number | null;
  condition?: Condition | null;
  zip?: string | null;
}

/** one traceable line in a breakdown: what it is, its effect, and where it came from */
export interface Factor {
  label: string;
  detail: string;
  /** signed dollar contribution where meaningful; omitted for descriptive factors */
  amount?: number;
  /** signed percentage contribution where meaningful */
  pct?: number;
}

export interface MarketRentResult {
  value: number;
  method: "anchor" | "model";
  factors: Factor[];
}

export interface ManagementQuote {
  feePct: number;
  feeMonthly: number;
  includes: string[];
}

export interface GuaranteedOffer {
  monthly: number;
  vacancyReservePct: number;
  riskMarginPct: number;
  breakdown: Factor[];
}

export interface Quote {
  marketRent: MarketRentResult;
  management: ManagementQuote;
  guaranteed: GuaranteedOffer;
  disclaimer: string;
}

const ABQ_BASE_PPSQFT = 1.2; // ~$/sqft/month baseline for albuquerque
const SANE_RENT = { min: 600, max: 6000 };

const CONDITION_MULTIPLIER: Record<Condition, number> = {
  good: 1.0,
  fair: 0.95,
  "needs work": 0.88,
};

// typical unit size by bedroom count, used only when sqft is unknown
const SQFT_BY_BEDS: Record<number, number> = {
  0: 500,
  1: 650,
  2: 900,
  3: 1200,
  4: 1500,
};

function clampRent(n: number): number {
  return Math.min(SANE_RENT.max, Math.max(SANE_RENT.min, Math.round(n)));
}

function round(n: number): number {
  return Math.round(n);
}

/**
 * estimate monthly market rent. if a stated rent is present we anchor to it;
 * otherwise we build an estimate from sqft (or bedroom-implied sqft), condition,
 * and a small bath adjustment. every path records the factors it used.
 */
export function estimateMarketRent(inputs: QuoteInputs): MarketRentResult {
  const condition: Condition = inputs.condition ?? "good";

  if (inputs.statedRent && inputs.statedRent > 0) {
    return {
      value: clampRent(inputs.statedRent),
      method: "anchor",
      factors: [
        {
          label: "market rent",
          detail: `anchored to the stated rent of $${inputs.statedRent.toLocaleString()}`,
          amount: inputs.statedRent,
        },
      ],
    };
  }

  const factors: Factor[] = [];

  let sqft = inputs.sqft ?? null;
  if (!sqft && inputs.beds != null) {
    sqft = SQFT_BY_BEDS[Math.min(inputs.beds, 4)] ?? 900;
    factors.push({
      label: "estimated size",
      detail: `${sqft} sqft implied from ${inputs.beds} bed(s), since square footage is unknown`,
    });
  } else if (sqft) {
    factors.push({ label: "size", detail: `${sqft} sqft`, amount: sqft });
  }

  if (!sqft) {
    // nothing to model from — fall back to a conservative abq 2-bed baseline
    sqft = 900;
    factors.push({
      label: "estimated size",
      detail: "900 sqft assumed — no size or bedroom info provided (low confidence)",
    });
  }

  let rent = sqft * ABQ_BASE_PPSQFT;
  factors.push({
    label: "base",
    detail: `${sqft} sqft × $${ABQ_BASE_PPSQFT.toFixed(2)}/sqft (albuquerque baseline)`,
    amount: round(rent),
  });

  if (inputs.baths && inputs.baths >= 2) {
    const bump = rent * 0.04;
    rent += bump;
    factors.push({
      label: "baths",
      detail: `+4% for ${inputs.baths} baths`,
      amount: round(bump),
      pct: 4,
    });
  }

  const condMult = CONDITION_MULTIPLIER[condition];
  if (condMult !== 1.0) {
    const before = rent;
    rent *= condMult;
    factors.push({
      label: "condition",
      detail: `${condition} → ×${condMult}`,
      amount: round(rent - before),
      pct: round((condMult - 1) * 100),
    });
  }

  return { value: clampRent(rent), method: "model", factors };
}

/** the management quote: a flat, relaxed 8% of monthly rent. */
export function managementQuote(marketRent: number): ManagementQuote {
  const feePct = 0.08;
  return {
    feePct,
    feeMonthly: round(marketRent * feePct),
    includes: [
      "listing syndication",
      "tenant screening",
      "rent collection",
      "maintenance triage & dispatch",
      "renewals",
    ],
  };
}

/**
 * the guaranteed-rent offer: a fixed monthly payout regardless of vacancy.
 *   payout = market rent × (1 − vacancy reserve − risk & service margin)
 * the two spreads come from a small risk read on condition and rent level.
 */
export function guaranteedOffer(
  marketRent: number,
  inputs: QuoteInputs,
): GuaranteedOffer {
  const condition: Condition = inputs.condition ?? "good";

  let vacancyReserve = 0.05;
  const vacancyFactors: Factor[] = [];
  if (condition === "needs work") {
    vacancyReserve += 0.03;
    vacancyFactors.push({ label: "condition", detail: "needs work → +3% vacancy reserve", pct: 3 });
  } else if (condition === "fair") {
    vacancyReserve += 0.015;
    vacancyFactors.push({ label: "condition", detail: "fair → +1.5% vacancy reserve", pct: 1.5 });
  }
  if (marketRent > 2500) {
    vacancyReserve += 0.01;
    vacancyFactors.push({ label: "rent level", detail: "above $2,500 → +1% vacancy reserve (thinner demand)", pct: 1 });
  }

  let riskMargin = 0.07;
  if (condition === "needs work") riskMargin += 0.02;

  const vacancyDollars = round(marketRent * vacancyReserve);
  const riskDollars = round(marketRent * riskMargin);
  const monthly = round(marketRent * (1 - vacancyReserve - riskMargin));

  const breakdown: Factor[] = [
    { label: "market rent", detail: "starting point", amount: marketRent },
    {
      label: "vacancy reserve",
      detail: `${round(vacancyReserve * 100)}% held against empty months`,
      amount: -vacancyDollars,
      pct: -round(vacancyReserve * 100),
    },
    ...vacancyFactors,
    {
      label: "risk & service margin",
      detail: `${round(riskMargin * 100)}% covering the guarantee and management`,
      amount: -riskDollars,
      pct: -round(riskMargin * 100),
    },
    {
      label: "your guaranteed monthly",
      detail: "paid whether or not the unit is occupied",
      amount: monthly,
    },
  ];

  return { monthly, vacancyReservePct: vacancyReserve, riskMarginPct: riskMargin, breakdown };
}

/** the full quote: market rent → management quote + guaranteed offer. */
export function computeQuote(inputs: QuoteInputs): Quote {
  const marketRent = estimateMarketRent(inputs);
  return {
    marketRent,
    management: managementQuote(marketRent.value),
    guaranteed: guaranteedOffer(marketRent.value, inputs),
    disclaimer:
      "indicative estimate, not a binding offer. the rent figure is a simplified model, not a market data feed.",
  };
}
