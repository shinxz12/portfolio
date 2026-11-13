import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { site } from "@/data/site";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${beVietnam.variable} bg-paper font-sans text-ink`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              jobTitle: site.title,
              email: `mailto:${site.email}`,
              url: site.url,
              knowsAbout: ["Node.js", "TypeScript", "NestJS", "Python", "Django", "FastAPI"],
              sameAs: site.socials.map((s) => s.url),
            }),
          }}
        />
        <div className="mx-auto min-h-screen max-w-6xl px-5 sm:px-8">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM ?? ""} />
    </html>
  );
}
