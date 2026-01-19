import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "objekté — La sélection juste",
  description: "Le purificateur haute précision. L'assurance d'une eau pure à la source, sans l'effort des bonbonnes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Script KKiaPay dans le head */}
        <Script
          src="https://cdn.kkiapay.me/k.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[#F5F2ED] text-[#1A1A1A]`}
      >
        {children}
      </body>
    </html>
  );
}
