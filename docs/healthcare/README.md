# healthcare housing — the GSA stipend vertical (v2 idea)

a furnished, mid-term rental vertical for new mexico's traveling clinicians —
travel nurses, locums, allied-health travelers, and relocating staff at the
state's anchor hospitals. this branch (`version2healthcareGSA`) captures the
idea: the plan, the numbers, a mockup, and what we learned from the market. it
is not wired into the app yet.

## the wedge

travelers are paid a federal housing stipend capped at the **gsa lodging per
diem** for their assignment's location. price a furnished, utilities-included
home *under* that cap and everyone wins: the clinician banks the difference
tax-free, the landlord earns a premium over an unfurnished long-term lease, and
siesta gets a near-zero-default, stipend-backed payer to underwrite guaranteed
rent against.

the signature feature is a **stipend-aware savings widget** on every listing:

> this home is $2,400/mo — $1,920 under your albuquerque housing stipend.
> ≈ $5,760 in your pocket, tax-free, over a 13-week assignment.

nothing else in the market shows travelers this at the point of booking.

## the verified numbers (gsa fy2026)

| market | lodging / night | monthly cap (×30) | notes |
|---|---|---|---|
| albuquerque (bernalillo) | $144 | ~$4,320 | flat year-round |
| santa fe | $167 | ~$5,010 | dips to $122 jan–feb |
| carlsbad | $155 | ~$4,650 | expansion watch |
| taos | $128 | ~$3,840 | expansion watch |

m&ie (meals & incidentals) is a separate $80/day stipend and is not housing.

## anchor demand

unm hospital (level i trauma + academic), presbyterian (largest private system),
lovelace (ardent, multi-campus), raymond g. murphy va.

## who pays vs. who's the product

the landlord is the customer — fees, furnishing, and the guarantee are billed to
them. the traveler is the most valuable *supply* (curated, licensed, stipend-
backed) but is never billed a renter fee. most valuable to attract ≠ most
valuable to bill.

## what we learned from the market

reference: travelnursehousing.com — which is **furnished finder in nurse-specific
branding** (same company, ~300k shared listings, same host base). competing as a
directory is a network-effects trap; borrow the table stakes, exploit the gaps,
and use them as a distribution channel.

**table stakes to match**

- free for travelers, flat fee for hosts ($199/yr), direct connection, no markup
  — this is our who-pays/who's-the-product principle in the wild.
- map-based search + programmatic location/hospital seo pages.
- broad property types (casitas, back-houses, adus, rooms) — maps to nm stock
  and our adu/tiny-house network.
- ~3-month / 30-day-minimum framing; background checks on both tenants *and*
  landlords; owner tools to screen + collect rent.

**their gaps = our wedge**

- no stipend intelligence — they show rent, never against the gsa cap.
- directory, not a manager — landlord still screens, collects, leases, eats
  turnover. we offer full management + guaranteed rent.
- no guarantee — landlord owns the gap-risk between assignments; we remove it.
- 300k listings = noise / stale availability; we curate (verified-available,
  furnished-to-standard).
- no furnishing help — the unit must already be furnished; our turnkey
  furnishing lets unfurnished landlords enter and expands supply.

**the move:** be the managed, guaranteed, stipend-smart, curated layer on top —
nm-native and hospital-relationship-driven — and list managed units *on* furnished
finder / travelnursehousing to borrow their reach while owning the relationship.

## in this folder

- `../siesta-healthcare-housing-plan.pdf` — the full 6-page plan
- `mockup.html` — a static mockup of the `/healthcare` page in siesta's design
- `mockup-desktop.png`, `mockup-mobile.png` — rendered previews

## next step (not built yet)

wire the `/healthcare` route into the app: a furnished mid-term listing type, the
stipend widget computed from the real gsa caps + `lib/quote.ts`, a distance-to-
hospital badge, two-sided verification (traveler + landlord), and optional
turnkey furnishing. note: the pages deploy workflow runs on `main` only, so this
branch does not auto-deploy — merge to main to ship.

## compliance carried forward

nm broker licensing; keep a 30-day minimum to stay in the residential-lease lane
(vs. lodging tax) — verify with a nm cpa/attorney; tax-home rules are the
traveler's responsibility; fair-housing / source-of-income rules apply. quotes
stay indicative; verification runs through named partners.
