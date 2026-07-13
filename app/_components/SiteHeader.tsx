import Link from "next/link";
import Wordmark from "./Wordmark";

export default function SiteHeader() {
  return (
    <header className="topbar">
      <div className="wrap">
        <Link href="/" className="brandmark" aria-label="siesta home">
          <Wordmark />
        </Link>
        <nav className="mainnav">
          <Link href="/#quote">quote</Link>
          <Link href="/#earn">earn more</Link>
          <Link href="/renters">for renters</Link>
        </nav>
        <div className="navauth">
          <Link href="/#quote" className="loginlink">
            log in
          </Link>
          <Link href="/#quote" className="btn-coral">
            sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
