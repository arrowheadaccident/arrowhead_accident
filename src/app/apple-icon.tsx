import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same mark as src/app/icon.svg, as the PNG iOS needs. */
export default function AppleIcon() {
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
