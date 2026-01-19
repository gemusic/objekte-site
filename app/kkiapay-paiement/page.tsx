"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function KkiapayPaymentPage() {
  const [status, setStatus] = useState("⏳ Initialisation...");

  useEffect(() => {
    const initPayment = () => {
      const storedData = sessionStorage.getItem("objekte_payment_data");
      if (!storedData) {
        setStatus("❌ Données de paiement introuvables. Revenez au formulaire.");
        return;
      }

      const paymentData = JSON.parse(storedData);
      console.log("Données récupérées:", paymentData);

      // 1. CRITICAL: Wait for KKiaPay to be available
      if (!window.kkiapay) {
        setStatus("⏳ Chargement du module de paiement...");
        console.error("KKiaPay non détecté dans `window`. Vérifiez le chargement du script.");
        return;
      }

      // 2. Prepare configuration
      const config = {
        amount: "14500",
        key: "8d810e82c04368c5d2c7592b1ac9d71095a51a05", // Verify this is your PRODUCTION public key
        callback: `${window.location.origin}/confirmation`,
        sandbox: false, // MUST be false for real payments
        paymentmethod: "momo",
        theme: "#1A1A1A",
        position: "center",
        name: paymentData.fullName,
        email: paymentData.email,
        phone: paymentData.phone,
      };
      console.log("Configuration KKiaPay:", config);

      // 3. Setup listeners BEFORE opening
      window.kkiapay.addSuccessListener((response) => {
        console.log("✅ Paiement réussi:", response);
        sessionStorage.removeItem("objekte_payment_data");
        setStatus("✅ Paiement accepté ! Redirection...");
        window.location.href = "/confirmation";
      });

      window.kkiapay.addFailedListener((error) => {
        console.error("❌ Paiement échoué:", error);
        setStatus(`❌ Échec: ${error?.message || "Veuillez réessayer."}`);
      });

      // 4. Open the widget
      setStatus("🔗 Ouverture de l'interface de paiement...");
      window.kkiapay.open(config);
    };

    // Try to initialize when component mounts
    initPayment();
  }, []); // Empty dependency array: runs once on mount

  return (
    <>
      {/* Load KKiaPay Script */}
      <Script
        src="https://cdn.kkiapay.me/k.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ Script KKiaPay chargé.");
          // Re-try initialization once the script is confirmed loaded
          const storedData = sessionStorage.getItem("objekte_payment_data");
          if (storedData) {
            const initPayment = () => {
              // ... (same initialization logic as in useEffect) ...
            };
            initPayment();
          }
        }}
        onError={() => {
          console.error("❌ Échec du chargement du script KKiaPay.");
          setStatus("❌ Impossible de charger le service de paiement. Rechargez la page.");
        }}
      />

      {/* Simple Status Page */}
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'sans-serif'
      }}>
        <h1>objekté – Traitement du paiement</h1>
        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>{status}</p>
        {/* Show a retry button if failed */}
        {status.startsWith("❌") && (
          <button 
            onClick={() => window.location.href = "/paiement"}
            style={{ 
              marginTop: '2rem', 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#1A1A1A', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer' 
            }}
          >
            Retour au formulaire
          </button>
        )}
      </div>
    </>
  );
}
