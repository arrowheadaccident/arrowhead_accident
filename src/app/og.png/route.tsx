import { ImageResponse } from "next/og";
import { business } from "@/config/business";

// Served at /og.png and referenced by ogImage in src/lib/seo.ts (alt text lives there). A route with a
// file extension isn't touched by `trailingSlash`, unlike the opengraph-image convention (docs/SEO-AUDIT.md H3).
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b2545",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="96" height="96" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#ffffff" />
            <path d="M9 18.5 16 10l7 8.5" fill="none" stroke="#0b2545" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 22v3" stroke="#f5b700" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1 }}>Arrowhead</div>
            <div style={{ fontSize: 34, color: "#b9c6d8", marginTop: 10 }}>Car Accident Chiropractor</div>
          </div>
        </div>

        {/* Lane marking */}
        <div style={{ display: "flex", gap: 22 }}>
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} style={{ width: 52, height: 8, borderRadius: 4, background: "#f5b700" }} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 36, color: "#b9c6d8" }}>
            <div>Same-day car accident care</div>
            <div>Glendale, Arizona</div>
          </div>
          <div
            style={{
              display: "flex",
              background: "#c8102e",
              borderRadius: 999,
              padding: "20px 40px",
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            {business.phone.display}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
