import type { Metadata } from "next";
import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import StipendCalculator from "../_components/StipendCalculator";
import { monthlyCap, MARKETS } from "@/lib/stipend";

export const metadata: Metadata = {
  title: "siesta — furnished homes for traveling nurses in new mexico",
  description:
    "furnished, utilities-included homes near new mexico's hospitals, priced under your gsa housing stipend so the difference stays in your pocket.",
};

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const ABQ_CAP = monthlyCap(144);

const HOMES = [
  { name: "casita on silver ave", meta: "furnished · 1 bed · 720 sqft", near: "6 min · unmh", rent: 2400 },
  { name: "loft off central", meta: "furnished · studio · 540 sqft", near: "9 min · presbyterian", rent: 1950 },
  { name: "adobe near uptown", meta: "furnished · 2 bed · 980 sqft", near: "7 min · lovelace", rent: 2700 },
];

export default function TravelingNurses() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="tn-hero">
          <div className="wrap">
            <p className="eyebrow">for traveling clinicians</p>
            <h1 className="tn-h1">stay near the hospital. keep your stipend.</h1>
            <p className="tn-lede">
              furnished, utilities-included homes for travel nurses and clinicians
              across albuquerque and santa fe — priced under your gsa housing
              stipend, so the difference stays in your pocket.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">the stipend view</p>
              <h2>see what you'd keep before you book.</h2>
              <p>
                every home is measured against the gsa lodging cap for your
                assignment. rent under it and the rest is yours, tax-free.
              </p>
            </div>
            <div className="tn-calc-wrap">
              <StipendCalculator />
            </div>
          </div>
        </section>

        <section className="section section--warm">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">furnished homes near your assignment</p>
              <h2>move-in ready, 30-day minimum.</h2>
              <p>
                sample homes shown — the vertical is just opening, and real
                furnished listings land here as landlords come on. savings shown
                against the albuquerque cap of {usd(ABQ_CAP)}/mo.
              </p>
            </div>
            <div className="tn-cards">
              {HOMES.map((h) => (
                <article className="tn-card" key={h.name}>
                  <div className="tn-media">
                    <span className="tn-sun" />
                    <span className="tn-horizon" />
                    <span className="pill tn-tag">sample</span>
                  </div>
                  <div className="tn-body">
                    <p className="tn-meta">{h.meta}</p>
                    <h3>{h.name}</h3>
                    <span className="tn-badge">◍ {h.near}</span>
                    <p className="tn-rent">
                      {usd(h.rent)}
                      <small> / mo · utilities in</small>
                    </p>
                    <span className="tn-save">
                      {usd(ABQ_CAP - h.rent)}/mo under stipend
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">how your stipend works</p>
              <h2>the gsa sets your ceiling. we price below it.</h2>
              <p>
                agencies base your tax-free housing stipend on the federal gsa
                lodging rate for your assignment. these are the fy2026 monthly caps
                across new mexico.
              </p>
            </div>
            <div className="tn-caps">
              {MARKETS.map((m) => (
                <div className="tn-cap" key={m.key}>
                  <div className="c">{m.label} cap</div>
                  <div className="n">
                    {usd(monthlyCap(m.daily))}
                    <small> /mo</small>
                  </div>
                  {m.note && <div className="tn-capnote">{m.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="quietpanel">
              <p className="eyebrow">honest, by design</p>
              <h2>indicative numbers, real rules.</h2>
              <p>
                the savings figures are estimates from published gsa rates, not a
                binding offer. to receive a stipend tax-free you must maintain a tax
                home — that's between you and your agency, and we'll never advise on
                your taxes. homes are a 30-day minimum, which keeps them a
                residential lease rather than hotel-style lodging.
              </p>
              <p>
                siesta manages the home for the owner; you're never charged a renter
                fee to browse or apply. verification, when needed, runs through named
                partners on your authorization.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
