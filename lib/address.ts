// address parsing. a freeform us address string -> structured components.
//
// this bootstraps the property -> unit record from whatever the landlord types
// or whatever an imported listing gives us. it is deliberately simple and
// forgiving; anything it can't confidently parse it leaves null and flags.

export interface ParsedAddress {
  raw: string;
  street: string | null;
  unit: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  /** fields we couldn't fill, so callers can flag gaps */
  missing: string[];
}

const STATE_ZIP = /\b([A-Za-z]{2})\s+(\d{5})(?:-\d{4})?\b/;
const UNIT_PREFIX = /^(unit|apt|apartment|ste|suite|#)\b\.?\s*/i;

/** a comma segment counts as a unit if it's short or uses a unit designator */
function looksLikeUnit(segment: string): boolean {
  const s = segment.trim();
  if (UNIT_PREFIX.test(s)) return true;
  // a bare short token like "C" or "A" or "2B"
  return /^[A-Za-z0-9-]{1,4}$/.test(s);
}

function cleanUnit(segment: string): string {
  return segment.trim().replace(UNIT_PREFIX, "").trim();
}

export function parseAddress(raw: string): ParsedAddress {
  const result: ParsedAddress = {
    raw: raw.trim(),
    street: null,
    unit: null,
    city: null,
    state: null,
    zip: null,
    missing: [],
  };

  // pull state + zip out first, wherever they sit
  const sz = raw.match(STATE_ZIP);
  if (sz) {
    result.state = sz[1].toUpperCase();
    result.zip = sz[2];
  }

  // work over comma-separated segments, minus the state/zip tail
  const withoutSz = sz ? raw.replace(STATE_ZIP, "") : raw;
  const segments = withoutSz
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // last non-empty segment is usually the city
  if (segments.length > 0) {
    result.city = segments[segments.length - 1] || null;
  }

  // first segment is the street
  if (segments.length > 0) {
    result.street = segments[0] || null;
  }

  // a middle segment that looks like a unit designator
  for (let i = 1; i < segments.length - 1; i++) {
    if (looksLikeUnit(segments[i])) {
      result.unit = cleanUnit(segments[i]);
      break;
    }
  }

  for (const field of ["street", "city", "state", "zip"] as const) {
    if (!result[field]) result.missing.push(field);
  }

  return result;
}
