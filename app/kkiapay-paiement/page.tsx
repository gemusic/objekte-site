"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function KkiapayPaymentPage() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer les données depuis sessionStorage
    const storedData = sessionStorage.getItem("objekte_payment_data");
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setPaymentData(data);
        console.log("Données de paiement récupérées:", data);
      } catch (err) {
        setError("Données de paiement invalides");
        setIsProcessing(false);
      }
    } else {
      setError("Aucune donnée de paiement trouvée");
      setIsProcessing(false);
    }
  }, []);

  const openKkiapay = () => {
    if (!paymentData) {
      setError("Données de paiement manquantes");
      return;
    }

    if (typeof window !== 'undefined' && window.kkiapay) {
      setIsProcessing(true);
      
      // Configuration KKiaPay
      const config = {
        amount: "14500",
        key: "8d810e82c04368c5d2c7592b1ac9d71095a51a05",
        callback: `${window.location.origin}/confirmation`,
        sandbox: false,
        paymentmethod: "momo",
        theme: "#1A1A1A",
        position: "center",
        name: paymentData.fullName,
        email: paymentData.email,
        phone: paymentData.phone,
        data: JSON.stringify({
          fullName: paymentData.fullName,
          email: paymentData.email,
          phone: paymentData.phone,
          address: paymentData.address
        })
      };

      console.log("Ouverture du widget KKiaPay avec config:", config);

      window.kkiapay.open(config);

      // Écouteurs d'événements
      window.kkiapay.addSuccessListener((response: any) => {
        console.log("✅ Paiement réussi:", response);
        // Nettoyer le sessionStorage
        sessionStorage.removeItem("objekte_payment_data");
        // Rediriger vers la confirmation
        window.location.href = "/confirmation";
      });

      window.kkiapay.addFailedListener((err: any) => {
        console.error("❌ Paiement échoué:", err);
        setError("Le paiement a échoué. Veuillez réessayer.");
        setIsProcessing(false);
      });
    } else {
      setError("Le système de paiement n'est pas disponible");
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Ouvrir automatiquement KKiaPay quand le script est chargé
    if (paymentData && typeof window !== 'undefined' && window.kkiapay) {
      setTimeout(() => {
        openKkiapay();
      }, 500); // Petit délai pour s'assurer que tout est chargé
    }
  }, [paymentData]);

  return (
    <div className="min-h-screen bg-[#F5F2ED] flex flex-col items-center justify-center p-6">
      {/* Script KKiaPay */}
      <Script
        src="https://cdn.kkiapay.me/k.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ Script KKiaPay chargé");
          if (paymentData) {
            openKkiapay();
          }
        }}
        onError={() => {
          console.error("❌ Erreur de chargement du script KKiaPay");
          setError("Impossible de charger le système de paiement");
          setIsProcessing(false);
        }}
      />

      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-playfair tracking-tight">objekté</h1>
          <p className="text-sm text-muted-foreground mt-2">Paiement sécurisé</p>
        </div>

        {/* Statut */}
        <div className="space-y-4">
          {isProcessing && !error && (
            <>
              <div className="w-16 h-16 border-4 border-[#1A1A1A] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-muted-foreground">
                Ouverture du système de paiement...
              </p>
            </>
          )}

          {error && (
            <div className="space-y-4">
              <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-red-500 text-2xl">!</span>
              </div>
              <p className="text-red-600 font-medium">{error}</p>
              
              <div className="space-y-4 pt-4">
                <button
                  onClick={() => {
                    if (paymentData) {
                      openKkiapay();
                    } else {
                      router.push("/paiement");
                    }
                  }}
                  className="w-full bg-[#1A1A1A] text-white py-3 text-sm uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Réessayer le paiement
                </button>
                
                <button
                  onClick={() => router.push("/")}
                  className="w-full border border-[#1A1A1A] py-3 text-sm uppercase tracking-wider hover:bg-[#1A1A1A] hover:text-white transition-all"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Informations de paiement */}
        {paymentData && (
          <div className="bg-white p-6 rounded-sm border border-[#E1E1E1] mt-8 text-left">
            <h3 className="text-xs uppercase tracking-wider mb-4">Récapitulatif</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Produit :</span>
                <span>Objet n°01 - Purificateur</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Client :</span>
                <span>{paymentData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant :</span>
                <span className="font-playfair">14 500 FCFA</span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-2 pt-8">
          <p>• Le paiement s'effectue via Mobile Money (MTN MoMo ou Moov Money)</p>
          <p>• Une fenêtre sécurisée va s'ouvrir pour finaliser la transaction</p>
          <p>• Vous recevrez une confirmation par SMS sur votre numéro</p>
        </div>
      </div>
    </div>
  );
}
