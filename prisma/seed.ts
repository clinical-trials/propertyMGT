// seeds the two real prospects we were handed, as imported listings sitting in
// review. only fields we actually know are set; beds/baths/sqft stay null so
// they show up as gaps — a live demo of the review workflow, not fabricated specs.

import { PrismaClient } from "@prisma/client";
import { DEMO_LISTINGS } from "../lib/import";
import { parseAddress } from "../lib/address";

const prisma = new PrismaClient();

async function main() {
  // clean slate for a repeatable dev seed
  await prisma.quote.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.property.deleteMany();
  await prisma.landlord.deleteMany();

  for (const [id, entry] of Object.entries(DEMO_LISTINGS)) {
    const f = entry.fields;
    const parsed = parseAddress(f.address ?? "");

    const landlord = await prisma.landlord.create({
      data: {
        name: f.contactName ?? "unknown owner",
        phone: f.contactPhone ?? null,
      },
    });

    const property = await prisma.property.create({
      data: {
        landlordId: landlord.id,
        rawAddress: f.address ?? "",
        street: parsed.street,
        unit: parsed.unit,
        city: parsed.city,
        state: parsed.state,
        zip: parsed.zip,
      },
    });

    const unit = await prisma.unit.create({
      data: {
        propertyId: property.id,
        statedRent: f.statedRent ?? null,
        beds: null,
        baths: null,
        sqft: null,
        status: "review",
      },
    });

    await prisma.listing.create({
      data: {
        unitId: unit.id,
        sourceUrl: entry.url,
        platform: entry.platform,
        rawExtract: JSON.stringify(f),
        reviewStatus: "review",
        ownershipConfirmed: false,
      },
    });

    console.log(`seeded ${f.contactName} — ${f.address} ($${f.statedRent}) [${id.slice(0, 8)}]`);
  }
}

main()
  .then(() => console.log("seed complete."))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
