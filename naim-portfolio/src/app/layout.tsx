import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naim Penabad Hermida — Data Science / AI / Web",
  description:
    "Portfolio of Naim Penabad Hermida. Data Science, AI and Web Engineering. Building data-driven solutions with Python, SQL, AWS and modern frontend.",
  authors: [{ name: "Naim Penabad Hermida" }],
  creator: "Naim Penabad Hermida",
  openGraph: {
    title: "Naim Penabad Hermida — Portfolio",
    description:
      "Data Science · AI · Web Engineering. Crafted as an interactive experience.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
