"use client";

import { useState } from "react";
import Link from "next/link";
import Wordmark from "./Wordmark";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="topbar">
      <div className="wrap">
        <Link href="/" className="brandmark" aria-label="siesta home" onClick={close}>
          <Wordmark />
        </Link>

        <nav className="mainnav">
          <Link href="/#quote">quote</Link>
          <Link href="/#earn">earn more</Link>
          <Link href="/renters">for renters</Link>
          <Link href="/traveling-nurses">traveling nurses</Link>
        </nav>

        <div className="navauth">
          <Link href="/#quote" className="loginlink">
            log in
          </Link>
          <Link href="/#quote" className="btn-coral">
            sign up
          </Link>
        </div>

        <button
          type="button"
          className="navtoggle"
          aria-label={open ? "close menu" : "open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="mobilemenu" id="mobile-menu">
          <Link href="/#quote" onClick={close}>
            quote
          </Link>
          <Link href="/#earn" onClick={close}>
            earn more
          </Link>
          <Link href="/renters" onClick={close}>
            for renters
          </Link>
          <Link href="/traveling-nurses" onClick={close}>
            traveling nurses
          </Link>
          <Link href="/#quote" className="loginlink" onClick={close}>
            log in
          </Link>
          <Link href="/#quote" className="btn-coral" onClick={close}>
            sign up
          </Link>
        </div>
      )}
    </header>
  );
}
