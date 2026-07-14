import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ScrollProgress from "@/components/scroll-progress";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL("https://btngoc.io.vn"),
  title: {
    default: "Ngoc Bui — Software Engineer",
    template: "%s — Ngoc Bui",
  },
  description:
    "Software Engineer building backend systems and full-stack products for startups and enterprises — B2B marketplaces, healthcare platforms, fintech onboarding, and more.",
  openGraph: {
    title: "Ngoc Bui — Software Engineer",
    description:
      "Software Engineer building backend systems and full-stack products for startups and enterprises.",
    url: "https://btngoc.io.vn",
    siteName: "Ngoc Bui",
    type: "website",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background font-sans text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ngoc Bui",
              jobTitle: "Software Engineer",
              email: "mailto:ngocbthe@gmail.com",
              url: "https://btngoc.io.vn",
              sameAs: [
                "https://github.com/shinxz12",
                "https://www.linkedin.com/in/ngocbthe/",
              ],
            }),
          }}
        />
        <ScrollProgress />
        <main className="mx-auto min-h-screen max-w-5xl px-6 sm:px-8">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM ?? ""} />
    </html>
  );
}
