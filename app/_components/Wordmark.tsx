// the siesta wordmark: lowercase, with a rising-sun tittle over a dotless i.

export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wm ${className}`} aria-label="siesta">
      s
      <span className="i-sun" aria-hidden="true">
        ı<span className="sun" />
      </span>
      esta
    </span>
  );
}
