// stipend math for the traveling-nurses vertical.
// travel clinicians are paid a housing stipend capped at the gsa lodging
// per diem for their assignment's location. price a furnished home under that
// cap and the difference is theirs, tax-free. numbers are gsa fy2026 lodging
// per diem (bernalillo/santa fe/eddy/taos counties), converted to a 30-day month.

export interface Market {
  key: string;
  label: string;
  daily: number; // gsa fy2026 lodging per diem, $/night
  note?: string;
}

export const MARKETS: Market[] = [
  { key: "abq", label: "albuquerque", daily: 144, note: "flat year-round" },
  { key: "santafe", label: "santa fe", daily: 167, note: "peak · $122 jan–feb" },
  { key: "carlsbad", label: "carlsbad", daily: 155 },
  { key: "taos", label: "taos", daily: 128 },
];

export const DAYS_PER_MONTH = 30;
export const WEEKS_PER_MONTH = 4.345;

export function monthlyCap(daily: number): number {
  return daily * DAYS_PER_MONTH;
}

export interface Savings {
  cap: number; // monthly stipend ceiling
  rent: number;
  savingsPerMonth: number; // cap - rent; can be negative
  months: number;
  takeHome: number; // savings over the assignment, floored at 0
  overCap: boolean; // rent meets or exceeds the cap
}

export function stipendSavings(
  daily: number,
  rent: number,
  weeks: number,
): Savings {
  const cap = monthlyCap(daily);
  const savingsPerMonth = cap - rent;
  const months = weeks / WEEKS_PER_MONTH;
  const takeHome = Math.max(0, savingsPerMonth) * months;
  return {
    cap,
    rent,
    savingsPerMonth,
    months,
    takeHome,
    overCap: savingsPerMonth <= 0,
  };
}

export function marketByKey(key: string): Market {
  return MARKETS.find((m) => m.key === key) ?? MARKETS[0];
}
