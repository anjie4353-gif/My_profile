import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Cormorant_Garamond, DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import "./enterprise-intro.css";
import "./enterprise-theme.css";
import "./enterprise-mobile-glass.css";
import "./enterprise-responsive.css";
import "./enterprise-premium.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "The Data Universe | Anjaneyulu Pallepagu",
  description:
    "Enterprise Data & AI Architect — Building Intelligent Data Systems that Power Large-Scale Business Decisions.",
  keywords: [
    "Data Engineering",
    "AI",
    "Enterprise Architecture",
    "Big Data",
    "Machine Learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cormorant.variable} ${dmSans.variable} ${poppins.variable} h-full`}
    >
      <body className="min-h-full antialiased font-sans">{children}</body>
    </html>
  );
}