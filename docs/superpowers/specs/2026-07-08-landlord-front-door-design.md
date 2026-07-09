# propertymgt — slice 1: the landlord front door (design)

date: 2026-07-08
status: approved, building

## context

propertymgt is a property management platform for new mexico, starting in
albuquerque, aimed at small mom-and-pop landlords (1–10 units). the long-term
shape is a risk-pricing company wearing a services costume, climbing a product
ladder: screening → deposit alternative → rent guarantee → full management →
landlord insurance → maintenance subscriptions → helping them buy the next one.

this spec covers **slice 1 only**: the landlord acquisition front door. every
other product on the ladder becomes its own later spec.

## goal

a landlord enters an address (or pastes a listing url) and, in about ninety
seconds, gets a guaranteed-rent offer or a management quote, with a clear,
cited breakdown — and can bootstrap a property record from an existing listing.

## non-goals (deferred to later slices)

- real payments / bank connection (partner a banking-as-a-service provider later)
- tenant transfer
- the renter side (browse + vetting)
- auth / multi-landlord accounts — slice 1 runs as a single implicit landlord
- real mls/comps api — slice 1 uses a transparent, simplified rent model

## stack

- next.js (app router, typescript)
- prisma orm; sqlite for local dev, postgres when deployed
- fraunces (display) + inter (body) via next/font; editorial, relaxed, lowercase
  voice, no exclamation points
- local-first: runs with `npm run dev`; free deploy later via vercel hobby +
  neon/supabase postgres. code lives on github (clinical-trials/propertyMGT).

## architecture — modules (each one job, testable in isolation)

1. **quote engine** (`lib/quote`) — pure functions, no i/o. unit facts + market
   signals → `{ managementQuote, guaranteedRentOffer, breakdown }`. the breakdown
   cites each input and its contribution (grounding rule: no black box).
2. **listing import** (`lib/import`) — server-side. a url → structured data.
   known-source adapters for the two demo listings + a generic best-effort
   extractor (fetch page, read opengraph / json-ld / meta). always returns a
   draft in `review` state with gaps flagged; never auto-publishes. import is
   user-initiated on the user's own listing; the review screen asks the user to
   confirm ownership.
3. **address parsing** (`lib/address`) — freeform address → components
   (street, unit, city, state, zip); bootstraps the property → unit record.
4. **data layer** (`lib/db`, prisma repositories) — the only code that touches
   the db. the seam that makes sqlite → postgres a clean swap.
5. **api routes** (`app/api/*`) — thin http wrappers over the lib modules:
   `/api/quote`, `/api/import`, `/api/properties`.
6. **ui** (app router pages) — brand shell, 90-second flow, dashboard, import,
   listing review/edit.

## data model

- **Landlord** — id, name, email, phone. (slice 1: a single seeded landlord.)
- **Property** — id, landlordId, raw address + parsed components
  (street, unit, city, state, zip), createdAt.
- **Unit** — id, propertyId, beds, baths, sqft, statedRent, description, photos
  (json), condition, status (draft | review | ready).
- **Listing** — id, unitId, sourceUrl, platform, rawExtract (json),
  reviewStatus (review | confirmed), ownershipConfirmed (bool), importedAt.
- **Quote** — id, propertyId, unitId, inputsSnapshot (json), marketRent,
  managementFeePct, managementFeeMonthly, guaranteedMonthly, breakdown (json),
  createdAt.

## screens

- `/` — brand shell + 90-second hero (address field front and center).
- `/quote` → `/quote/[id]` — the flow: address → parse/confirm → quick unit
  facts or "import from url" → two offers side by side, each with a cited
  breakdown → "claim this property" persists property + quote.
- `/import` — paste a listing url → extract → draft in review.
- `/listings/[id]` — review/edit: fields with source attribution, gap flags,
  confirm-ownership check, save (internal, never auto-published).
- `/dashboard` — properties/units/listings with status + attached quotes.

## quote math (transparent, honest, real computation)

inputs: market rent anchor, beds, baths, sqft, condition, zip.

- **market rent anchor:** if a listing states rent, use it; otherwise estimate
  from a simple abq model: base $/sqft by zip band × sqft, adjusted for
  beds/baths/condition, clamped to a sane range. clearly labeled an estimate;
  inputs shown.
- **management quote:** management fee = flat 8% of monthly rent (undercuts the
  8–12% incumbent range). show monthly fee $ and what's included.
- **guaranteed-rent offer:** `guaranteedMonthly = marketRent × (1 − vacancyReserve
  − riskMargin)`. vacancyReserve and riskMargin come from a small risk score
  (condition, rent level, zip). breakdown lists market rent, minus vacancy
  reserve %, minus risk/service margin %, = guaranteed monthly. labeled
  indicative, not a binding contract.

## honesty constraints

- the rent model is a simplified, clearly-labeled estimate — not presented as a
  market data feed.
- quotes are labeled indicative, not binding contracts.
- imported data lands in review and never auto-publishes; stale-source risk is
  surfaced.
- seeded demo data contains only fields we actually know (address, rent,
  contact, source url). beds/baths/sqft/photos are left as gaps to fill — no
  invented specs.

## seed data (the two real prospects)

- **jose levario** — 410 harvard drive se, unit c, albuquerque, nm 87106 —
  stated rent $1,250 — contact (940) 782-9855 — source: turbotenant.
- **paulette baca** — 1100a 10th st sw, unit a, albuquerque, nm 87102 —
  stated rent $1,950 — contact (505) 595-4424 — source: turbotenant.

beds/baths/sqft/description/photos unknown → seeded as gaps.

## new mexico compliance notes (carried, not resolved here)

managing property for others generally requires a real estate broker's license.
a rent guarantee needs a qualifying broker of record, compliant trust accounting
for rents and deposits, and appropriately licensed leasing staff. verify current
requirements with the new mexico real estate commission and a nm real estate
attorney before business decisions. slice 1 is a software demo, not a live
brokerage offering.

## testing

- quote engine: unit tests over the pure functions (known inputs → expected
  offers + breakdown), including edge cases (missing sqft, extreme rent, poor
  condition).
- address parsing: unit tests over representative abq addresses incl. unit
  designators.
- listing import: tests over the demo adapters (known url → known fields + gaps)
  and the generic extractor against saved html fixtures.
- data layer: exercised via the api-route flows.
