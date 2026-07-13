// original desert scene for the hero: adobe walls at golden hour, a low sun,
// and a person resting in a hammock strung between the walls. drawn, not
// photographed — so there's no third-party image to license.

export default function HeroScene() {
  return (
    <svg
      className="hero-scene"
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="a person resting in a hammock between adobe walls at golden hour"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e3c4" />
          <stop offset="0.5" stopColor="#eecd90" />
          <stop offset="1" stopColor="#e6bd79" />
        </linearGradient>
        <radialGradient id="hs-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f8d576" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f8d576" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d3a361" />
          <stop offset="1" stopColor="#c6934f" />
        </linearGradient>
        <linearGradient id="hs-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4f341f" />
          <stop offset="1" stopColor="#7c5330" />
        </linearGradient>
        <linearGradient id="hs-dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b47e46" />
          <stop offset="1" stopColor="#97662f" />
        </linearGradient>
      </defs>

      {/* sky + sun */}
      <rect width="1200" height="640" fill="url(#hs-sky)" />
      <circle cx="812" cy="205" r="165" fill="url(#hs-glow)" />
      <circle cx="812" cy="210" r="82" fill="#f8d576" />

      {/* dunes */}
      <path d="M0,352 C240,312 470,330 700,326 C930,322 1080,312 1200,338 L1200,640 L0,640 Z" fill="#ddb079" />
      <path d="M0,418 C300,388 520,406 760,404 C980,402 1100,410 1200,426 L1200,640 L0,640 Z" fill="#d2a05f" />

      {/* right adobe dome + window */}
      <path d="M902,640 C902,432 964,300 1052,300 C1150,300 1200,438 1200,640 Z" fill="url(#hs-dome)" />
      <rect x="1046" y="386" width="50" height="66" rx="11" fill="#3d2a1b" />
      <rect x="1046" y="386" width="50" height="66" rx="11" fill="none" stroke="#c79a63" strokeWidth="3" opacity="0.5" />

      {/* foreground sand */}
      <path d="M0,506 C280,481 560,506 820,504 C1000,503 1120,510 1200,516 L1200,640 L0,640 Z" fill="url(#hs-sand)" />

      {/* left adobe wall (backdrop for the headline) */}
      <path d="M-20,70 L336,70 Q446,70 446,214 L446,640 L-20,640 Z" fill="url(#hs-wall)" />
      <path d="M-20,70 L336,70 Q446,70 446,214" fill="none" stroke="#8a5c34" strokeWidth="3" opacity="0.6" />

      {/* hammock shadow */}
      <ellipse cx="716" cy="556" rx="220" ry="24" fill="#a9793f" opacity="0.45" />

      {/* hammock ropes (fanned, like a real sling) */}
      <g stroke="#4a3120" strokeWidth="2" opacity="0.85" fill="none">
        <path d="M446,182 L470,322" />
        <path d="M446,182 L502,322" />
        <path d="M1008,236 L978,318" />
        <path d="M1008,236 L930,318" />
      </g>
      <path d="M446,182 L486,322" stroke="#4a3120" strokeWidth="4" fill="none" />
      <path d="M1008,236 L946,318" stroke="#4a3120" strokeWidth="4" fill="none" />

      {/* hammock fabric + weave */}
      <path d="M486,322 Q716,486 946,318 Q716,528 486,322 Z" fill="#cf9a72" />
      <path d="M492,330 Q716,494 940,326" stroke="#bb875f" strokeWidth="3" fill="none" />
      <path d="M500,344 Q716,508 930,340" stroke="#bb875f" strokeWidth="2.5" fill="none" opacity="0.75" />

      {/* the resting figure */}
      <path d="M604,470 Q700,442 828,468 Q772,500 648,496 Q596,486 604,470 Z" fill="#c58f66" />
      <ellipse cx="828" cy="470" rx="30" ry="15" fill="#dcb488" />
      <circle cx="826" cy="458" r="20" fill="#c99f78" />
      <path d="M812,446 Q826,435 842,449 Q832,441 812,446 Z" fill="#5a3b28" />
    </svg>
  );
}
