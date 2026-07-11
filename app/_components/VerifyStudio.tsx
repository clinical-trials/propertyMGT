"use client";

import { useState } from "react";

type IncomeMethod = "" | "bank" | "docs";

interface Profile {
  id: string;
  name: string;
  income: string;
  credit: string;
  background: string;
  ready: number;
}

const INCOME_LABEL: Record<Exclude<IncomeMethod, "">, string> = {
  bank: "bank-linked (plaid)",
  docs: "documents uploaded",
};

export default function VerifyStudio() {
  const [name, setName] = useState("");
  const [income, setIncome] = useState<IncomeMethod>("");
  const [credit, setCredit] = useState(false);
  const [background, setBackground] = useState(false);
  const [fcra, setFcra] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [run, setRun] = useState(0);

  const ready =
    (income ? 1 : 0) + (credit ? 1 : 0) + (background ? 1 : 0);

  function generate() {
    if (!name.trim()) return setError("add your name so the profile has an owner.");
    if (!income) return setError("choose how you'll verify income to start a profile.");
    if ((credit || background) && !fcra)
      return setError("credit and background checks need your written authorization — tick the box below.");
    setError(null);
    setProfile({
      id: "vr-" + Math.random().toString(36).slice(2, 8),
      name: name.trim(),
      income: income ? INCOME_LABEL[income] : "not included",
      credit: credit ? "soft pull authorized — no score impact" : "not included",
      background: background ? "consented — public records + eviction" : "not included",
      ready,
    });
    setRun((r) => r + 1);
  }

  return (
    <div className="studio" id="verify">
      <h2>get vetted once</h2>
      <p className="sub">
        set up the checks a landlord needs. share one profile, apply anywhere on
        propertymgt.
      </p>

      <label className="field">
        <span>your name</span>
        <input
          className="input"
          placeholder="e.g. alex romero"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <div className="checks">
        <div className="check">
          <div className="ck-head">
            <span className="ck-title">income</span>
            <span className="ck-method">plaid, or uploaded pay stubs</span>
          </div>
          <div className="seg">
            <button
              type="button"
              className={income === "bank" ? "on" : ""}
              onClick={() => setIncome("bank")}
            >
              connect bank
            </button>
            <button
              type="button"
              className={income === "docs" ? "on" : ""}
              onClick={() => setIncome("docs")}
            >
              upload documents
            </button>
          </div>
        </div>

        <div className="check">
          <div className="ck-head">
            <span className="ck-title">credit</span>
            <span className="ck-method">soft pull via a screening partner</span>
          </div>
          <label className="ck-opt">
            <input
              type="checkbox"
              checked={credit}
              onChange={(e) => setCredit(e.target.checked)}
            />
            <span>authorize a soft credit pull — it won't affect my score.</span>
          </label>
        </div>

        <div className="check">
          <div className="ck-head">
            <span className="ck-title">background</span>
            <span className="ck-method">public records + eviction history</span>
          </div>
          <label className="ck-opt">
            <input
              type="checkbox"
              checked={background}
              onChange={(e) => setBackground(e.target.checked)}
            />
            <span>consent to a background and eviction check.</span>
          </label>
        </div>
      </div>

      <label className="ck-opt fcra">
        <input
          type="checkbox"
          checked={fcra}
          onChange={(e) => setFcra(e.target.checked)}
        />
        <span>
          i authorize propertymgt and its screening partners to obtain these
          reports (fcra authorization).
        </span>
      </label>

      {error && <p className="form-error">{error}</p>}

      <button className="btn" type="button" onClick={generate}>
        create my vetted profile
      </button>

      {profile && (
        <div className="profile reveal" key={run}>
          <div className="pf-top">
            <div>
              <div className="label">vetted renter profile</div>
              <div className="pf-name">{profile.name}</div>
            </div>
            <span className="pill review">{profile.ready} of 3 ready</span>
          </div>
          <div className="fields">
            <div className="frow">
              <span className="k">income</span>
              <span className="v">{profile.income}</span>
            </div>
            <div className="frow">
              <span className="k">credit</span>
              <span className="v">{profile.credit}</span>
            </div>
            <div className="frow">
              <span className="k">background</span>
              <span className="v">{profile.background}</span>
            </div>
            <div className="frow">
              <span className="k">profile id</span>
              <span className="v">{profile.id}</span>
            </div>
          </div>
          <p className="note">
            this captures your consent and choices. the actual checks run through
            named providers (plaid for income, a screening partner for credit and
            background) — nothing is pulled until you authorize it, and your data
            is handled encrypted. this is an early demo, so no live report is run.
          </p>
        </div>
      )}
    </div>
  );
}
