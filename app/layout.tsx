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
        {/* Script KKiaPay */}
        <Script
          id="kkiapay-script"
          src="https://cdn.kkiapay.me/k.js"
          strategy="beforeInteractive"
        />
        {/* Initialisation KKiaPay */}
        <Script
          id="kkiapay-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Vérifier quand KKiaPay est chargé
              function checkKKiaPay() {
                if (typeof kkiapay !== 'undefined') {
                  console.log('✅ KKiaPay est chargé');
                  window._kkiapayLoaded = true;
                  window.dispatchEvent(new Event('kkiapay:loaded'));
                } else {
                  console.warn('⚠️ KKiaPay pas encore chargé');
                  setTimeout(checkKKiaPay, 100);
                }
              }
              
              // Démarrer la vérification
              setTimeout(checkKKiaPay, 500);
            `
          }}
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
