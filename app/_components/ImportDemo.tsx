"use client";

import { useState } from "react";
import { DEMO_LISTINGS, detectPlatform } from "@/lib/import";

const money = (n?: number | null) => (n ? "$" + n.toLocaleString() : null);

type Row = { k: string; v: string | null; gap?: boolean };

interface Extracted {
  platform: string;
  rows: Row[];
  gaps: string[];
  known: boolean;
}

function extract(url: string): Extracted | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  for (const entry of Object.values(DEMO_LISTINGS)) {
    if (trimmed.includes(entry.url.split("/").pop() ?? "___never")) {
      const f = entry.fields;
      return {
        platform: entry.platform,
        known: true,
        rows: [
          { k: "address", v: f.address ?? null },
          { k: "monthly rent", v: money(f.statedRent) },
          { k: "owner", v: f.contactName ?? null },
          { k: "beds", v: null, gap: true },
          { k: "baths", v: null, gap: true },
          { k: "square footage", v: null, gap: true },
        ],
        gaps: ["beds", "baths", "square footage"],
      };
    }
  }

  // unknown url — in this static demo we don't fetch other sites from the browser
  return {
    platform: detectPlatform(trimmed),
    known: false,
    rows: [],
    gaps: [],
  };
}

const DEMOS = Object.values(DEMO_LISTINGS);

export default function ImportDemo() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Extracted | null>(null);
  const [touched, setTouched] = useState(false);

  function run(u: string) {
    setUrl(u);
    setResult(extract(u));
    setTouched(true);
  }

  return (
    <div className="import-card" id="import">
      <div className="import-row">
        <input
          className="input"
          placeholder="paste a listing url — turbotenant, zillow, craigslist…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn" onClick={() => run(url)}>
          bring it over
        </button>
      </div>

      <div className="chips">
        <span className="muted" style={{ fontSize: "0.85rem", alignSelf: "center" }}>
          try a real one:
        </span>
        {DEMOS.map((d) => (
          <button key={d.url} className="btn-ghost" onClick={() => run(d.url)}>
            {d.fields.contactName?.toLowerCase()} — {money(d.fields.statedRent)}
          </button>
        ))}
      </div>

      {result && result.known && (
        <div className="result reveal">
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1rem" }}>
            <span className="pill">{result.platform}</span>
            <span className="pill review">in review — not published</span>
          </div>
          <div className="fields">
            {result.rows.map((r) => (
              <div className={`frow${r.gap ? " gap" : ""}`} key={r.k}>
                <span className="k">{r.k}</span>
                <span className="v">{r.v ?? "add this"}</span>
              </div>
            ))}
          </div>
          <p className="note">
            imported from a known listing. beds, baths, and square footage weren't
            in the source, so they land as gaps to fill — we don't invent them.
            nothing publishes until you confirm you own it.
          </p>
        </div>
      )}

      {result && !result.known && touched && (
        <div className="result">
          <p className="note">
            that looks like a {result.platform} link. in this static preview we
            only pull the two demo listings — general url import runs on the
            server and arrives with the full deploy. try one of the two above.
          </p>
        </div>
      )}
    </div>
  );
}
