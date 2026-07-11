import type { Metadata } from "next";
import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import VerifyStudio from "../_components/VerifyStudio";

export const metadata: Metadata = {
  title: "propertymgt — get vetted once, apply anywhere",
  description:
    "renters verify income, credit, and background once, then apply to any propertymgt listing with a single trusted profile.",
};

const HOW: { k: string; free: string; partner: string }[] = [
  {
    k: "income",
    free: "link your bank in seconds, or upload two pay stubs. the free path uses plaid's sandbox and open-source ocr to read documents.",
    partner: "in production, bank-linked income runs through plaid; payroll through a provider like truv or argyle.",
  },
  {
    k: "credit",
    free: "you can pull your own free federal report at annualcreditreport.com — but a self-supplied report is easy to fake, so we don't lean on it.",
    partner: "the real check is a soft pull you authorize through a screening partner. no score impact, and the partner carries the fcra burden.",
  },
  {
    k: "background",
    free: "the national sex-offender registry is public and free; county eviction and court records can be searched by hand.",
    partner: "a licensed provider like checkr runs a compliant criminal and eviction check, filtered for fair-housing rules.",
  },
];

export default function Renters() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">for renters</p>
              <h1>
                get vetted <em>once</em>.
              </h1>
              <p className="lede">
                verify income, credit, and background a single time. then apply to
                any propertymgt place with one trusted profile — no re-doing it,
                no paying twice.
              </p>
              <p className="hero-note">
                you authorize each check. nothing is pulled without your say-so.
              </p>
            </div>
            <VerifyStudio />
          </div>
        </section>

        <section className="section" id="how-verify">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">plainly, how each check works</p>
              <h2>what's free and diy, and what runs through a partner.</h2>
              <p>
                income you can largely verify yourself. credit and background are
                regulated — they go through a partner, on your authorization, so
                it's done right.
              </p>
            </div>
            <div className="beats">
              {HOW.map((h) => (
                <div className="beat" key={h.k}>
                  <p className="t">{h.k}</p>
                  <h3 style={{ marginBottom: "0.7rem" }}>the free path</h3>
                  <p style={{ marginBottom: "1rem" }}>{h.free}</p>
                  <h3 style={{ marginBottom: "0.7rem", fontSize: "1.05rem" }}>
                    the partner path
                  </h3>
                  <p>{h.partner}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="quietpanel">
              <p className="eyebrow">your rights, plainly</p>
              <h2>consent, and the limits of it.</h2>
              <p>
                credit and background checks are governed by the fair credit
                reporting act. you give written authorization before anything is
                pulled, you can see what a landlord sees, and if you're turned down
                over a report you're owed an adverse-action notice telling you why.
              </p>
              <p>
                screening is also bound by fair-housing law — criminal and credit
                history can't be used to quietly discriminate. and your ssn and
                financial documents are sensitive: they're encrypted, access is
                logged, and we're building toward soc 2 before any of this goes
                live.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
