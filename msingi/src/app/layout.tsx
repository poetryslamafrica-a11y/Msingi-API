import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";

// NOTE: Fraunces / General Sans / IBM Plex Mono are not on next/font/google
// by those exact names in all versions — swap for next/font/google equivalents
// (e.g. Fraunces is available) or self-host via next/font/local for brand fonts
// not on Google Fonts. Wired here as CSS variables so the swap is a one-line change.

export const metadata: Metadata = {
  title: "Msingi | The Alkebulan Poetry Institute",
  description:
    "Africa's professional institute for poetry, spoken word, and the creative economy. Msingi is the foundation — where African poets build a career, not just a portfolio.",
  metadataBase: new URL("https://msingi.africa"),
  openGraph: {
    title: "Msingi | The Alkebulan Poetry Institute",
    description:
      "Africa's professional institute for poetry, spoken word, and the creative economy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
