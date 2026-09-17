import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AS Consultations", template: "%s | AS Consultations" },
  description: "Corporate, financial, taxation and business consulting services."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
