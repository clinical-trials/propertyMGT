import QuoteStudio from "./_components/QuoteStudio";
import ImportDemo from "./_components/ImportDemo";
import SiteHeader from "./_components/SiteHeader";
import SiteFooter from "./_components/SiteFooter";

const LADDER: { name: string; note: string; tag?: string; soon?: boolean }[] = [
  { name: "screening", note: "income, credit, and background — a vetted renter, once.", tag: "where we start" },
  { name: "deposit alternative", note: "a small monthly cover instead of a deposit they have to front." },
  { name: "rent guarantee", note: "a fixed monthly payout, vacancy or not — priced on the risk." },
  { name: "full management", note: "leasing, rent, maintenance, renewals — the whole thing.", soon: true },
  { name: "landlord insurance", note: "the property covered, on the same rails.", soon: true },
  { name: "maintenance subscriptions", note: "a vetted local crew on call.", soon: true },
  { name: "the next property", note: "when you're ready to buy another, we help.", soon: true },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">property management, new mexico</p>
              <h1>
                renting, <em>made light</em>.
              </h1>
              <p className="lede">
                for small landlords in albuquerque. type an address and get a
                management quote or a guaranteed-rent offer — with the math shown,
                not hidden.
              </p>
              <p className="hero-note">
                no account, no wait. the numbers are indicative, and honest about it.
              </p>
            </div>
            <QuoteStudio />
          </div>
        </section>

        <section className="section" id="how">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">about ninety seconds</p>
              <h2>a landlord's whole start, in three unhurried steps.</h2>
            </div>
            <div className="beats">
              <div className="beat">
                <p className="t">the address</p>
                <h3>type it once</h3>
                <p>
                  an address becomes a property and a unit. paste an existing
                  listing and it fills itself in.
                </p>
              </div>
              <div className="beat">
                <p className="t">the offer</p>
                <h3>see two numbers</h3>
                <p>
                  a flat 8% management quote, or a guaranteed monthly you're paid
                  vacancy or not — each with its reasoning laid out.
                </p>
              </div>
              <div className="beat">
                <p className="t">the handoff</p>
                <h3>hand it over</h3>
                <p>
                  upload the lease, move the tenant across, connect a bank.
                  minutes, where the old way took weeks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="ladder">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">the plan</p>
              <h2>a ladder we climb with you.</h2>
              <p>
                start with the cheap, useful thing. grow into the rest only when it
                earns its place. risk gets priced and laid off — we stay a fee
                business, not a balance sheet.
              </p>
            </div>
            <ol className="ladder">
              {LADDER.map((r, i) => (
                <li className={`rung${r.soon ? " soon" : ""}${r.tag ? " now" : ""}`} key={r.name}>
                  <span className="step">{String(i + 1).padStart(2, "0")}</span>
                  <span className="name">
                    {r.name}
                    <em>{r.note}</em>
                  </span>
                  {r.tag && <span className="tag">{r.tag}</span>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="import">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">already listed somewhere</p>
              <h2>bring a listing over, keep the work.</h2>
              <p>
                paste a link from turbotenant, zillow, craigslist, or marketplace.
                we pull what's there, flag what's missing, and hold it in review —
                nothing publishes until you say so.
              </p>
            </div>
            <ImportDemo />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="quietpanel">
              <p className="eyebrow">plainly, before anything else</p>
              <h2>what this is, and isn't.</h2>
              <p>
                this is an early demo. the quote is a simple, shown-in-full
                estimate — not a market data feed, and not a binding offer.
                imported listings land in review because source listings go stale.
              </p>
              <p>
                managing property for others in new mexico is regulated work. a
                real service needs a qualifying broker of record, trust accounting
                for rents and deposits, and licensed leasing staff — verified with
                the new mexico real estate commission first. we'd rather say so up
                front than dress it up.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
