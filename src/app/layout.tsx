import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AZAZOTHX Archive — Personal Knowledge System",
  description:
    "Tempat menyimpan perjalanan belajar pribadi: buku, ilmu, rangkuman, dan catatan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} bg-void bg-grid-glow bg-fixed min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
