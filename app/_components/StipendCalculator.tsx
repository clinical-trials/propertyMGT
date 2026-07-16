"use client";

import { useState } from "react";
import { MARKETS, marketByKey, stipendSavings } from "@/lib/stipend";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const LENGTHS = [8, 13, 26];

export default function StipendCalculator() {
  const [marketKey, setMarketKey] = useState("abq");
  const [rent, setRent] = useState("2400");
  const [weeks, setWeeks] = useState(13);

  const market = marketByKey(marketKey);
  const rentNum = Math.max(0, Number(rent) || 0);
  const s = stipendSavings(market.daily, rentNum, weeks);

  return (
    <div className="studio" id="calculator">
      <h2>your stipend, in real numbers</h2>
      <p className="sub">
        pick your assignment and rent — see what you'd keep against the gsa
        housing cap.
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
              {m.label} — ${m.daily}/night cap
            </option>
          ))}
        </select>
      </label>

      <div className="facts" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
        <label className="field">
          <span>monthly rent</span>
          <input
            className="input"
            inputMode="numeric"
            value={rent}
            onChange={(e) => setRent(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </label>
        <label className="field">
          <span>assignment length</span>
          <select
            className="select"
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
          >
            {LENGTHS.map((w) => (
              <option key={w} value={w}>
                {w} weeks
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="tn-readout">
        <div className="frow">
          <span className="k">monthly rent</span>
          <span className="v">{usd(s.rent)}</span>
        </div>
        <div className="frow">
          <span className="k">{market.label} housing stipend cap</span>
          <span className="v">{usd(s.cap)}</span>
        </div>
        <div className="frow">
          <span className="k">under the cap by</span>
          <span className="v" style={{ color: s.overCap ? undefined : "var(--teal)" }}>
            {s.overCap ? "—" : usd(s.savingsPerMonth) + " / mo"}
          </span>
        </div>
      </div>

      {s.overCap ? (
        <div className="tn-stipend flat">
          <span>
            this rent is at or above your stipend
            <small>try a lower rent or a different city for tax-free room</small>
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

      <p className="disclaimer">
        indicative — based on the gsa fy2026 lodging per diem, converted to a
        30-day month. your agency sets your actual stipend and you must keep a tax
        home to receive it tax-free; check with your agency and a tax advisor.
      </p>
    </div>
  );
}
