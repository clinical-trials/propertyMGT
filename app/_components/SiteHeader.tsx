import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="topbar">
      <div className="wrap">
        <Link href="/" className="brandmark">
          <b>propertymgt</b>
          <span className="dot">.</span>
        </Link>
        <nav>
          <Link href="/#quote">a quote</Link>
          <Link href="/#ladder">the ladder</Link>
          <Link href="/renters">for renters</Link>
        </nav>
      </div>
    </header>
  );
}
