"use client";

import { useState } from "react";
import {
  MARKETS,
  marketByKey,
  stipendSavings,
  TERMS,
  termByWeeks,
  termRent,
} from "@/lib/stipend";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function StipendCalculator() {
  const [marketKey, setMarketKey] = useState("abq");
  const [base, setBase] = useState("2400");
  const [weeks, setWeeks] = useState(13);

  const market = marketByKey(marketKey);
  const term = termByWeeks(weeks);
  const baseNum = Math.max(0, Number(base) || 0);
  const adjRent = termRent(baseNum, weeks);
  const s = stipendSavings(market.daily, adjRent, weeks);

  const pct = Math.round((term.multiplier - 1) * 100);
  const pctLabel = pct === 0 ? "standard" : pct > 0 ? `+${pct}%` : `${pct}%`;

  return (
    <div className="studio" id="calculator">
      <h2>your stipend, in real numbers</h2>
      <p className="sub">
        pick a city, a base rent, and a contract length — see what you'd keep
        against the gsa maximum.
      </p>

      <label className="field">
        <span>assignment city</span>
        <select
          className="select"
          value={marketKey}
          onChange={(e) => setMarketKey(e.target.value)}
        >
          {MARKETS.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label} — ${m.daily}/night max
            </option>
          ))}
        </select>
      </label>

      <div className="facts" style={{ gridTemplateColumns: "1fr 1.25fr" }}>
        <label className="field">
          <span>base rent · 13-wk</span>
          <input
            className="input"
            inputMode="numeric"
            value={base}
            onChange={(e) => setBase(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </label>
        <label className="field">
          <span>contract length</span>
          <select
            className="select"
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
          >
            {TERMS.map((t) => (
              <option key={t.weeks} value={t.weeks}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="tn-readout">
        <div className="frow">
          <span className="k">
            {weeks}-week rate{" "}
            <em className={pct > 0 ? "tn-up" : pct < 0 ? "tn-down" : "tn-flat"}>
              {pctLabel}
            </em>
          </span>
          <span className="v">{usd(adjRent)}</span>
        </div>
        <div className="frow">
          <span className="k">{market.label} max stipend</span>
          <span className="v">{usd(s.cap)}</span>
        </div>
        <div className="frow">
          <span className="k">under the max by</span>
          <span
            className="v"
            style={{ color: s.overCap ? undefined : "var(--teal)" }}
          >
            {s.overCap ? "over the max" : usd(s.savingsPerMonth) + " / mo"}
          </span>
        </div>
      </div>

      {s.overCap ? (
        <div className="tn-stipend flat">
          <span>
            this rate is at or above the max
            <small>lower the base rent or pick a longer term for tax-free room</small>
          </span>
        </div>
      ) : (
        <div className="tn-stipend">
          <span>
            your take-home, tax-free
            <small>{weeks}-week assignment</small>
          </span>
          <b>≈ {usd(s.takeHome)}</b>
        </div>
      )}

      {weeks === 4 && (
        <p className="tn-flag">
          rapid-response is a premium short-term rate. at 28 days it's under 30 —
          hotel-style lodging tax territory, so the shortest tax-clean term is a
          30-day month.
        </p>
      )}

      <p className="disclaimer">
        ${market.daily}/night is the{" "}
        <a
          href="https://www.gsa.gov/travel/plan-book/per-diem-rates/per-diem-rates-results?action=perdiems_report&fiscal_year=2027&state=NM&city=&zip="
          target="_blank"
          rel="noopener noreferrer"
        >
          gsa fy2027
        </a>{" "}
        <strong>maximum</strong> for {market.label} — agencies pay up to that,
        many pay less — converted to a 30-day month. shorter stays cost more per
        month, longer stays less. you must keep a tax home to receive a stipend
        tax-free; check with your agency and a tax advisor.
      </p>
    </div>
  );
}
