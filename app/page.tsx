import QuoteStudio from "./_components/QuoteStudio";
import ImportDemo from "./_components/ImportDemo";
import SiteHeader from "./_components/SiteHeader";
import SiteFooter from "./_components/SiteFooter";
import HeroScene from "./_components/HeroScene";

const LADDER: { name: string; note: string; tag?: string; soon?: boolean }[] = [
  { name: "screening", note: "income, credit, and background — a vetted renter, once.", tag: "where we start" },
  { name: "deposit alternative", note: "a small monthly cover instead of a deposit they have to front." },
  { name: "rent guarantee", note: "a fixed monthly payout, vacancy or not — priced on the risk." },
  { name: "full management", note: "leasing, rent, maintenance, renewals — the whole thing.", soon: true },
  { name: "landlord insurance", note: "the property covered, on the same rails.", soon: true },
  { name: "maintenance subscriptions", note: "a vetted local crew on call.", soon: true },
  { name: "the next property", note: "when you're ready to buy another, we help.", soon: true },
];

const ARROW = (
  <span className="arrow" aria-hidden="true">
    ↗
  </span>
);

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="herofull">
          <div className="hero-card">
            <HeroScene />
            <div className="hero-scrim" aria-hidden="true" />
            <div className="hero-copy">
              <h1>You bought a rental to work less. So work less.</h1>
              <p className="lede">
                Guaranteed rent, full-service management, and the deepest sleep in
                real estate.
              </p>
              <div className="cta-row">
                <a href="#quote" className="btn btn--hero">
                  Start your Siesta
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="quote">
          <div className="wrap">
            <div className="section-head" style={{ textAlign: "center", marginInline: "auto" }}>
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                about ninety seconds
              </p>
              <h2>see your numbers before you commit to anything.</h2>
            </div>
            <div style={{ maxWidth: 640, marginInline: "auto" }}>
              <QuoteStudio />
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">the whole start</p>
              <h2>three unhurried steps, then you rest.</h2>
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

        <section className="section section--warm" id="earn">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">more ways to earn</p>
              <h2>your property can earn between tenants, too.</h2>
              <p>
                guaranteed rent is the floor. when a place sits empty, these two
                channels turn the downtime into income. both are outside partners —
                we just point you to them.
              </p>
            </div>
            <div className="earn">
              <div className="earn-card">
                <div className="tagrow">
                  <span className="badge">new mexico film</span>
                </div>
                <h3>list it as a film set</h3>
                <p>
                  new mexico shoots constantly. put your place on the state's film
                  location registry and earn when a production needs it — a few
                  days can pay a month of mortgage.
                </p>
                <span className="spacer" />
                <a
                  className="ext-link"
                  href="https://nmfilm.location.pro/list-property"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  list on the nm film registry {ARROW}
                </a>
              </div>

              <div className="earn-card">
                <div className="tagrow">
                  <span className="badge">by the hour</span>
                </div>
                <h3>rent it by the hour</h3>
                <p>
                  host meetings, photo shoots, and small gatherings by the hour on
                  peerspace — a way to earn from the space on the days it would
                  otherwise sit quiet.
                </p>
                <span className="spacer" />
                <a
                  className="ext-link"
                  href="https://www.peerspace.com/host"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  host on peerspace {ARROW}
                </a>
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
                <li className={`rung${r.soon ? " soon" : ""}`} key={r.name}>
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
