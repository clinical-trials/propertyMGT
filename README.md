# propertymgt

a property management platform for new mexico. renting out a place should feel
like ninety seconds of work, and getting into a vetted rental should feel just
as light.

this is the seed of the repo. the app is being built slice by slice — the
sections below describe the plan, not features that already ship.

## the idea

a risk-pricing company wearing a services costume. management fees run 8–12% of
rent and most of the work is automatable: listing creation, tenant screening,
lease generation, rent collection, maintenance triage, renewals.

the wedge is acquisition. a landlord enters an address, the engine returns a
guaranteed-rent offer or a management quote, and onboarding takes minutes
instead of weeks.

## product ladder

screening → deposit alternative → rent guarantee → full management → landlord
insurance → maintenance subscriptions → helping them buy the next property.

lay the risk off to a bigger balance sheet, stay a fee business, keep
software-like margins per door.

## who it's for

small mom-and-pop landlords, 1–10 units — roughly 70% of us rentals and badly
served by incumbents. starting market: albuquerque, new mexico.

## brand

quiet, unhurried, editorial. lowercase where it reads naturally. no exclamation
points — the brand is relaxed on purpose.

- display / headings: fraunces
- body: inter

## stack

full-stack, local-first, hostable for free later.

- next.js (app router, typescript)
- prisma orm with sqlite for local dev → postgres when deployed
- code lives on github; runs locally with `npm run dev`; free deploy later via
  vercel hobby + neon/supabase postgres

## first slice — the landlord front door

- marketing / brand shell
- the 90-second flow: address → instant guaranteed-rent offer or management quote
- listing import: paste a url (turbotenant, zillow, craigslist, marketplace),
  extract the structured data, pre-fill a property / unit record, flag the gaps,
  and land it in a review state — never auto-published, since source listings go
  stale. import is always user-initiated on the user's own listing.

demoed with two real prospects: jose levario ($1,250, harvard dr se) and
paulette baca ($1,950, 10th st sw).

later slices, each with its own spec: renter vetting, deposit alternative,
rent-guarantee pricing, full management (accounting / payments), maintenance
triage + dispatch, and the compliance / trust-accounting layer.

## compliance notes (new mexico)

managing property for others generally requires a real estate broker's license
in the state. before any business decisions: verify current requirements with
the new mexico real estate commission and consult a new mexico real estate
attorney. a rent guarantee needs a qualifying broker of record, compliant trust
accounting for rents and deposits, and appropriately licensed leasing staff.

## status

seed repo. next: finish the slice-1 design, then scaffold the app.
