import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { company } from "@/lib/content";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "Joy First Interiors | Interior Fit-Out, Civil & MEP Contractor in Chennai";
const description =
  "Joy First Interiors delivers ISO-certified interior fit-out, civil, HVAC, electrical, fire alarm, networking, and PMC services for commercial and residential spaces across Chennai and seven Indian states.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: company.name,
  telephone: company.phones[0],
  email: company.emails[0],
  foundingDate: String(company.founded),
  founder: {
    "@type": "Person",
    name: company.founder,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "#17, Shanthi Flats, C1, N.V. Street, Mylapore",
    addressLocality: "Chennai",
    postalCode: "600004",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: company.reach,
  sameAs: company.socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-parchment text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <CustomCursor />
          <Nav />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
