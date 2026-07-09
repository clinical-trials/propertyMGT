// listing import. a url -> structured listing data, always landing in a review
// state with gaps flagged. never auto-publishes.
//
// two paths:
//   1. known-source demo adapters — the two real prospects we were handed. we
//      only encode fields we actually know; beds/baths/sqft/photos are left as
//      gaps, not invented.
//   2. a generic best-effort extractor — fetches the page server-side and reads
//      opengraph / json-ld / meta. whatever it can't find becomes a gap.
//
// import is meant to be user-initiated on the user's own listing; the review
// screen is where the user confirms ownership.

export interface ImportedFields {
  address?: string | null;
  statedRent?: number | null;
  beds?: number | null;
  baths?: number | null;
  sqft?: number | null;
  description?: string | null;
  photos?: string[];
  contactName?: string | null;
  contactPhone?: string | null;
}

export interface ImportResult {
  sourceUrl: string;
  platform: string;
  source: "demo-adapter" | "generic-extractor";
  fields: ImportedFields;
  /** field names we could not fill and the landlord should provide */
  gaps: string[];
  /** anything worth telling the user (e.g. a fetch that failed) */
  notes: string[];
}

const TRACKED_FIELDS: (keyof ImportedFields)[] = [
  "address",
  "statedRent",
  "beds",
  "baths",
  "sqft",
  "description",
];

export function detectPlatform(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("turbotenant")) return "turbotenant";
    if (host.includes("zillow")) return "zillow";
    if (host.includes("craigslist")) return "craigslist";
    if (host.includes("facebook")) return "marketplace";
    return host;
  } catch {
    return "other";
  }
}

// the two real prospects, keyed by the stable id in their turbotenant url.
// only fields we genuinely know are filled in.
export const DEMO_LISTINGS: Record<string, { url: string; platform: string; fields: ImportedFields }> = {
  "6048506c-49d2-44df-ab7a-15b622fe10be": {
    url: "https://rental.turbotenant.com/p/410-harvard-drive-southeast-albuquerque-nm-unit-c/6048506c-49d2-44df-ab7a-15b622fe10be",
    platform: "turbotenant",
    fields: {
      address: "410 Harvard Drive Southeast, C, Albuquerque, NM 87106",
      statedRent: 1250,
      contactName: "Jose Levario",
      contactPhone: "(940) 782-9855",
    },
  },
  "3d997e4b-9163-483f-b62f-a655b6aedc69": {
    url: "https://rental.turbotenant.com/p/1100a-10th-st-sw-albuquerque-nm-unit-a/3d997e4b-9163-483f-b62f-a655b6aedc69",
    platform: "turbotenant",
    fields: {
      address: "1100A 10th St SW, A, Albuquerque, NM 87102",
      statedRent: 1950,
      contactName: "Paulette Baca",
      contactPhone: "(505) 595-4424",
    },
  },
};

function gapsOf(fields: ImportedFields): string[] {
  return TRACKED_FIELDS.filter((f) => fields[f] == null || fields[f] === "");
}

/** does this url match one of our known demo listings? */
function matchDemo(url: string): { id: string; entry: (typeof DEMO_LISTINGS)[string] } | null {
  for (const [id, entry] of Object.entries(DEMO_LISTINGS)) {
    if (url.includes(id)) return { id, entry };
  }
  return null;
}

/** parse a rent figure like "$1,250/mo" or "1250" out of text */
function parseRent(text: string): number | null {
  const m = text.match(/\$\s?([\d,]{3,7})/);
  if (!m) return null;
  const n = parseInt(m[1].replace(/,/g, ""), 10);
  return Number.isFinite(n) && n >= 200 && n <= 100000 ? n : null;
}

/** pull an opengraph / meta value out of raw html */
function meta(html: string, property: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const m = html.match(re);
  return m ? m[1] : null;
}

/**
 * best-effort extraction from an arbitrary listing page. runs server-side.
 * gracefully degrades: on any failure it returns whatever it has plus a note,
 * and everything unfilled is a gap. never throws.
 */
export async function genericExtract(url: string): Promise<ImportResult> {
  const platform = detectPlatform(url);
  const result: ImportResult = {
    sourceUrl: url,
    platform,
    source: "generic-extractor",
    fields: {},
    gaps: [],
    notes: [],
  };

  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; propertymgt-import/0.1)" },
      redirect: "follow",
    });
    if (!res.ok) {
      result.notes.push(`the source returned ${res.status}; fill the fields in by hand.`);
      result.gaps = gapsOf(result.fields);
      return result;
    }
    const html = await res.text();

    const title = meta(html, "og:title") ?? (html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? null);
    const description = meta(html, "og:description");
    const image = meta(html, "og:image");

    result.fields.description = description ?? title;
    if (image) result.fields.photos = [image];

    const rent = parseRent(`${title ?? ""} ${description ?? ""}`);
    if (rent) result.fields.statedRent = rent;

    result.notes.push(
      "imported best-effort from the page's public preview data. confirm everything before use — source listings go stale.",
    );
  } catch {
    result.notes.push("couldn't reach the source page; fill the fields in by hand.");
  }

  result.gaps = gapsOf(result.fields);
  return result;
}

/** the entry point: a url -> an import result in review state. */
export async function importFromUrl(url: string): Promise<ImportResult> {
  const demo = matchDemo(url);
  if (demo) {
    return {
      sourceUrl: demo.entry.url,
      platform: demo.entry.platform,
      source: "demo-adapter",
      fields: { ...demo.entry.fields },
      gaps: gapsOf(demo.entry.fields),
      notes: [
        "imported from a known listing. beds, baths, and square footage weren't in the source — add them below.",
      ],
    };
  }
  return genericExtract(url);
}
