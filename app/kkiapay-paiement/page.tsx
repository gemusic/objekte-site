"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function KkiapayPaiementPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Cette fonction s'exécute une fois le script KKiaPay chargé
    const initializeKkiapay = () => {
      try {
        // Récupérer les données stockées
        const orderDataStr = localStorage.getItem('kkiapay_order_data');
        if (!orderDataStr) {
          throw new Error("Données de commande non trouvées. Veuillez retourner au formulaire.");
        }

        const orderData = JSON.parse(orderDataStr);
        
        // Vérifier que KKiaPay est disponible
        if (typeof window === 'undefined' || !(window as any).kkiapay) {
          throw new Error("Le système de paiement n'est pas disponible. Veuillez réessayer.");
        }

        // Ouvrir le widget KKiaPay
        (window as any).kkiapay.open({
          amount: "14500",
          key: "8d810e82c04368c5d2c7592b1ac9d71095a51a05",
          callback: `${window.location.origin}/confirmation`,
          sandbox: false,
          paymentmethod: "momo",
          theme: "#1A1A1A",
          position: "center",
          name: orderData.name,
          email: orderData.email,
          phone: orderData.phone,
        });

        // Écouter le succès
        (window as any).kkiapay.addSuccessListener((response: any) => {
          console.log("Paiement réussi:", response);
          // Nettoyer le localStorage
          localStorage.removeItem('kkiapay_order_data');
          // Rediriger vers la page de confirmation
          window.location.href = "/confirmation";
        });

        // Écouter l'échec
        (window as any).kkiapay.addFailedListener((error: any) => {
          console.error("Paiement échoué:", error);
          setStatus('error');
          setErrorMessage("Le paiement a échoué. Veuillez réessayer.");
        });

        setStatus('success');

      } catch (error: any) {
        console.error("Erreur d'initialisation KKiaPay:", error);
        setStatus('error');
        setErrorMessage(error.message || "Une erreur est survenue lors de l'initialisation du paiement.");
      }
    };

    // Si le script est déjà chargé, initialiser immédiatement
    if ((window as any).kkiapay) {
      initializeKkiapay();
    } else {
      // Sinon, attendre que le script soit chargé
      const scriptCheckInterval = setInterval(() => {
        if ((window as any).kkiapay) {
          clearInterval(scriptCheckInterval);
          initializeKkiapay();
        }
      }, 100);

      // Timeout après 10 secondes
      setTimeout(() => {
        clearInterval(scriptCheckInterval);
        if (!(window as any).kkiapay) {
          setStatus('error');
          setErrorMessage("Le système de paiement n'a pas pu se charger dans le temps imparti. Veuillez réessayer.");
        }
      }, 10000);
    }
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleReturn = () => {
    localStorage.removeItem('kkiapay_order_data');
    router.push('/paiement');
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Script KKiaPay */}
      <Script
        src="https://cdn.kkiapay.me/k.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Script KKiaPay chargé avec succès");
        }}
        onError={() => {
          console.error("Erreur de chargement du script KKiaPay");
          setStatus('error');
          setErrorMessage("Impossible de charger le système de paiement. Veuillez vérifier votre connexion.");
        }}
      />

      <section className="flex-1 flex items-center justify-center pt-32 md:pt-48 pb-20 md:pb-32 px-6">
        <div className="max-w-xl w-full text-center space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl font-playfair leading-tight">
              {status === 'loading' ? 'Chargement du paiement...' : 
               status === 'error' ? 'Erreur de paiement' : 
               'Paiement en cours'}
            </h1>
            
            {status === 'loading' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 border-4 border-[#E1E1E1] border-t-[#1A1A1A] rounded-full animate-spin"></div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  Préparation de votre interface de paiement sécurisée...
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-8">
                <div className="p-6 md:p-8 bg-red-50 border border-red-200 rounded-sm">
                  <p className="text-red-800">{errorMessage}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleRetry}
                    className="px-8 py-4 bg-[#1A1A1A] text-white text-sm uppercase tracking-[0.1em] hover:bg-black transition-colors"
                  >
                    Réessayer le paiement
                  </button>
                  <button
                    onClick={handleReturn}
                    className="px-8 py-4 border border-[#1A1A1A] text-sm uppercase tracking-[0.1em] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Retour au formulaire
                  </button>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-6">
                <div className="p-6 md:p-8 bg-green-50 border border-green-200 rounded-sm">
                  <p className="text-green-800">
                    Le système de paiement est prêt. Si la fenêtre de paiement ne s'ouvre pas automatiquement, vérifiez que les bloqueurs de publicités sont désactivés.
                  </p>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  Vous allez être redirigé vers une interface de paiement sécurisée.
                </p>
              </div>
            )}

            <div className="pt-8 border-t border-[#E1E1E1]">
              <p className="text-xs md:text-sm text-muted-foreground">
                Pour toute assistance, contactez notre{" "}
                <a 
                  href="https://wa.me/22996991128" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium underline hover:opacity-60 transition-opacity"
                >
                  Service Client
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
