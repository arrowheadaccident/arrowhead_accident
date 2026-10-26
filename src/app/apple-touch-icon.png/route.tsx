import { ImageResponse } from "next/og";

// Served at /apple-touch-icon.png, the path iOS also requests on its own. The apple-icon convention
// would be /apple-icon, which `trailingSlash` 308-redirects (docs/SEO-AUDIT.md H3).
export const dynamic = "force-static";

const size = { width: 180, height: 180 };

/** Same mark as src/app/icon.svg, as the PNG iOS needs. */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b2545" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="M9 18.5 16 10l7 8.5" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 22v3" stroke="#f5b700" strokeWidth="3.4" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
