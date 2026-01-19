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
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[#F5F2ED] text-[#1A1A1A]`}
      >
        {children}
        
        {/* Script KKiaPay */}
        <Script
          src="https://cdn.kkiapay.me/k.js"
          strategy="afterInteractive"
        />
        
        {/* Déclaration des fonctions KKiaPay */}
        <Script
          id="kkiapay-globals"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.KKIA_CONFIG = {
                amount: "14500",
                key: "8d810e82c04368c5d2c7592b1ac9d71095a51a05",
                callback: window.location.origin + "/confirmation",
                sandbox: false,
                paymentmethod: "momo",
                theme: "#1A1A1A",
                position: "center"
              };
              
              window.openKkiapayWidget = function(config) {
                if (typeof kkiapay !== 'undefined') {
                  kkiapay.open(config);
                } else {
                  console.error("KKiaPay widget not loaded");
                }
              };
              
              window.addSuccessListener = function(callback) {
                if (typeof kkiapay !== 'undefined') {
                  kkiapay.addSuccessListener(callback);
                }
              };
              
              window.addFailedListener = function(callback) {
                if (typeof kkiapay !== 'undefined') {
                  kkiapay.addFailedListener(callback);
                }
              };
            `
          }}
        />
      </body>
    </html>
  );
}
