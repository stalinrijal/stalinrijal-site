import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site-config";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const TITLE = "Stalin Rijal — Cloud · SRE · DevOps Engineer";
const DESCRIPTION =
  "Certified DevOps Engineer with 5+ years of experience building, automating, and securing scalable cloud infrastructure.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/photo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: ["/photo.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#080c10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
