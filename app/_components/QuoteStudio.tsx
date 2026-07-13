"use client";

import { useState } from "react";
import { computeQuote, type Condition, type Quote } from "@/lib/quote";

const money = (n: number) => "$" + Math.round(n).toLocaleString();
const signed = (n: number) =>
  (n < 0 ? "− $" : "$") + Math.abs(Math.round(n)).toLocaleString();

interface FormState {
  address: string;
  rent: string;
  beds: string;
  baths: string;
  sqft: string;
  condition: Condition;
}

const EMPTY: FormState = {
  address: "",
  rent: "",
  beds: "",
  baths: "",
  sqft: "",
  condition: "good",
};

const LEVARIO: FormState = {
  address: "410 harvard drive se, unit c, albuquerque",
  rent: "1250",
  beds: "2",
  baths: "1",
  sqft: "",
  condition: "good",
};

function num(v: string): number | null {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export default function QuoteStudio() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [run, setRun] = useState(0);

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = computeQuote({
      statedRent: num(form.rent),
      beds: num(form.beds),
      baths: num(form.baths),
      sqft: num(form.sqft),
      condition: form.condition,
    });
    setQuote(q);
    setRun((r) => r + 1);
  }

  return (
    <div className="studio" id="quote">
      <h2>your numbers, in about ninety seconds</h2>
      <p className="sub">
        enter an address. we return a management quote and a guaranteed-rent
        offer, with the math shown.
      </p>

      <form onSubmit={submit}>
        <label className="field">
          <span>property address</span>
          <input
            className="input"
            placeholder="e.g. 410 harvard drive se, albuquerque"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            required
          />
        </label>

        <div className="facts">
          <label className="field" style={{ margin: 0 }}>
            <span>rent, if set</span>
            <input
              className="input"
              inputMode="numeric"
              placeholder="—"
              value={form.rent}
              onChange={(e) => set("rent", e.target.value)}
            />
          </label>
          <label className="field" style={{ margin: 0 }}>
            <span>beds</span>
            <input
              className="input"
              inputMode="numeric"
              placeholder="—"
              value={form.beds}
              onChange={(e) => set("beds", e.target.value)}
            />
          </label>
          <label className="field" style={{ margin: 0 }}>
            <span>baths</span>
            <input
              className="input"
              inputMode="numeric"
              placeholder="—"
              value={form.baths}
              onChange={(e) => set("baths", e.target.value)}
            />
          </label>
          <label className="field" style={{ margin: 0 }}>
            <span>condition</span>
            <select
              className="select"
              value={form.condition}
              onChange={(e) => set("condition", e.target.value as Condition)}
            >
              <option value="good">good</option>
              <option value="fair">fair</option>
              <option value="needs work">needs work</option>
            </select>
          </label>
        </div>

        <button className="btn btn--block" type="submit">
          show my offers
        </button>
      </form>

      <button
        className="btn-ghost"
        type="button"
        style={{ marginTop: "0.9rem" }}
        onClick={() => {
          setForm(LEVARIO);
          setQuote(computeQuote({ statedRent: 1250, beds: 2, baths: 1, condition: "good" }));
          setRun((r) => r + 1);
        }}
      >
        try a real one — jose's place, $1,250
      </button>

      {quote && (
        <div className="reveal" key={run}>
          <div className="offers">
            <div className="offer">
              <div className="label">our management fee</div>
              <div className="num">
                {money(quote.management.feeMonthly)}
                <small> /mo</small>
              </div>
              <div className="cap">
                {Math.round(quote.management.feePct * 100)}% of{" "}
                {money(quote.marketRent.value)} — flat, everything below included.
              </div>
            </div>

            <div className="offer guaranteed">
              <div className="label">guaranteed to you</div>
              <div className="num">
                {money(quote.guaranteed.monthly)}
                <small> /mo</small>
              </div>
              <div className="cap">paid whether or not the unit is occupied.</div>
            </div>
          </div>

          <div className="ledger">
            <h3>how the guaranteed number is built</h3>
            {quote.guaranteed.breakdown.map((f, i) => {
              const isTotal = i === quote.guaranteed.breakdown.length - 1;
              return (
                <div className={`ledger-row${isTotal ? " total" : ""}`} key={i}>
                  <span>
                    <span className="lr-label">{f.label}</span>
                    <span className="lr-detail">{f.detail}</span>
                  </span>
                  {f.amount !== undefined && (
                    <span
                      className={`lr-amount${f.amount < 0 ? " neg" : ""}`}
                    >
                      {signed(f.amount)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <p className="disclaimer">
            market rent {quote.marketRent.method === "anchor" ? "anchored to your stated figure" : "estimated from what you gave us"}.{" "}
            {quote.disclaimer} management covers{" "}
            {quote.management.includes.join(", ")}.
          </p>
        </div>
      )}
    </div>
  );
}
