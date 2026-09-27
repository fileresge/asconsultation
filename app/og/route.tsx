import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const title = (request.nextUrl.searchParams.get("title") || "Your taxes. Our expertise.").slice(0, 120);
  const category = (request.nextUrl.searchParams.get("category") || "Tax. Accounting. Business.").slice(0, 60);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#073B72", color: "white", padding: "64px 72px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ color: "#00AEEF", fontSize: 44, fontWeight: 700 }}>asconsultations</span><span style={{ color: "#BFC3C8", fontSize: 23 }}>asconsultations.com.pk</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><span style={{ color: "#00AEEF", fontSize: 22, marginBottom: 24 }}>{category}</span><div style={{ display: "flex", fontSize: title.length > 75 ? 52 : 64, lineHeight: 1.15, fontWeight: 700, letterSpacing: -2, maxWidth: 1000 }}>{title}</div></div>
      <div style={{ display: "flex", borderTop: "2px solid #087AC8", paddingTop: 28, justifyContent: "space-between", alignItems: "center" }}><span style={{ color: "#BFC3C8", fontSize: 22 }}>Clarity for every step of your business journey.</span><span style={{ display: "flex", width: 64, height: 8, background: "#00AEEF", borderRadius: 8 }} /></div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } },
  );
}
