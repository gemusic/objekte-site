"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import Script from "next/script";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isKkiapayLoaded, setIsKkiapayLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Fonction pour charger KKiaPay manuellement
  const loadKkiapayManually = () => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://cdn.kkiapay.me/k.js';
    script.async = true;
    script.onload = () => {
      console.log('KKiaPay chargé manuellement');
      // Vérifier si kkiapay est disponible après 1 seconde
      setTimeout(() => {
        if (window.kkiapay) {
          setIsKkiapayLoaded(true);
          setLoadingError(null);
        } else {
          setLoadingError('KKiaPay toujours pas disponible après chargement manuel');
        }
      }, 1000);
    };
    script.onerror = () => {
      setLoadingError('Erreur de chargement du script KKiaPay');
    };
    document.head.appendChild(script);
  };

  // Vérifier périodiquement si KKiaPay est chargé
  useEffect(() => {
    const checkKkiapay = () => {
      if (typeof window !== 'undefined' && window.kkiapay) {
        console.log('KKiaPay détecté dans window:', !!window.kkiapay);
        setIsKkiapayLoaded(true);
        return true;
      }
      return false;
    };

    // Vérifier immédiatement
    checkKkiapay();

    // Vérifier toutes les 500ms pendant 10 secondes
    const interval = setInterval(() => {
      if (checkKkiapay()) {
        clearInterval(interval);
      }
    }, 500);

    // Timeout après 10 secondes
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!checkKkiapay()) {
        setLoadingError('KKiaPay ne se charge pas automatiquement. Tentative de chargement manuel...');
        loadKkiapayManually();
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.fullName || !formData.phone || !formData.address) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Envoyer l'email
      console.log("Envoi de l'email...");
      await sendOrderEmail(formData);
      console.log("Email envoyé avec succès");
      
      // 2. Vérifier que KKiaPay est chargé
      if (typeof window === 'undefined' || !window.kkiapay) {
        throw new Error("KKiaPay n'est pas chargé. Veuillez réessayer dans quelques secondes.");
      }
      
      // 3. Ouvrir le widget KKiaPay
      console.log("Ouverture du widget KKiaPay...");
      console.log("Configuration:", {
        amount: "14500",
        key: "8d810e82c04368c5d2c7592b1ac9d71095a51a05",
        callback: `${window.location.origin}/confirmation`,
        sandbox: false,
        paymentmethod: "momo",
        theme: "#1A1A1A",
        position: "center",
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });

      window.kkiapay.open({
        amount: "14500",
        key: "8d810e82c04368c5d2c7592b1ac9d71095a51a05",
        callback: `${window.location.origin}/confirmation`,
        sandbox: false,
        paymentmethod: "momo",
        theme: "#1A1A1A",
        position: "center",
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });

      // 4. Ajouter les listeners
      window.kkiapay.addSuccessListener((response) => {
        console.log("Paiement réussi:", response);
        window.location.href = "/confirmation";
      });

      window.kkiapay.addFailedListener((error) => {
        console.error("Paiement échoué:", error);
        alert("Le paiement a échoué. Veuillez réessayer.");
        setIsProcessing(false);
      });

    } catch (error: any) {
      console.error("Erreur:", error);
      alert(`Erreur: ${error.message || "Une erreur est survenue. Veuillez réessayer."}`);
      setIsProcessing(false);
    }
  };

  const sendOrderEmail = async (data: typeof formData) => {
    const emailData = {
      to: "gerernoscommandes@gmail.com",
      subject: `NOUVELLE COMMANDE objekté - ${data.fullName}`,
      text: `
        NOUVELLE COMMANDE objekté
        --------------------------
        Client : ${data.fullName}
        Email : ${data.email}
        Téléphone : ${data.phone}
        Adresse : ${data.address}
        
        PRODUIT :
        ---------
        Objet n°01 - Le Purificateur Haute Précision
        Prix : 14 500 FCFA
        
        --------------------------
        Action requise : Préparer la livraison et contacter le client.
      `,
    };

    const response = await fetch("/api/send-order-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi de l'email");
    }

    return response.json();
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Script KKiaPay normal */}
      <Script
        src="https://cdn.kkiapay.me/k.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("KKiaPay script chargé avec succès via Script component");
          // Donner un peu de temps pour l'initialisation
          setTimeout(() => {
            if (window.kkiapay) {
              setIsKkiapayLoaded(true);
              setLoadingError(null);
            }
          }, 500);
        }}
        onError={() => {
          console.error("Erreur de chargement du script KKiaPay via Script component");
          setLoadingError("Erreur de chargement via Script. Tentative manuelle...");
          loadKkiapayManually();
        }}
      />

      <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Formulaire */}
            <div className="space-y-12 md:space-y-16 order-2 lg:order-1">
              <div>
                <h1 className="text-3xl md:text-4xl font-playfair mb-4 leading-tight">
                  Validation de Sélection
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Un dernier pas pour purifier votre quotidien.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
                {/* 1. VOS COORDONNÉES */}
                <div className="space-y-6 md:space-y-8">
                  <h2 className="text-[10px] uppercase tracking-[0.2em] border-b border-[#E1E1E1] pb-4">
                    1. Vos Coordonnées
                  </h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        Adresse Email
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full bg-transparent border-b border-[#E1E1E1] py-3 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <p className="text-[9px] md:text-[10px] text-muted-foreground italic">
                        Votre confirmation de sélection et votre reçu vous seront envoyés instantanément par email.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. INFORMATIONS DE LIVRAISON */}
                <div className="space-y-6 md:space-y-8">
                  <h2 className="text-[10px] uppercase tracking-[0.2em] border-b border-[#E1E1E1] pb-4">
                    2. Informations de Livraison
                  </h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        Nom complet
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b border-[#E1E1E1] py-3 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="Votre nom complet"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        Numéro de téléphone
                      </label>
                      <input
                        required
                        type="tel"
                        className="w-full bg-transparent border-b border-[#E1E1E1] py-3 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        placeholder="+229 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <p className="text-[9px] md:text-[10px] text-muted-foreground italic">
                        Indispensable pour la coordination de la remise en main propre.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        Adresse de livraison précise
                      </label>
                      <textarea
                        required
                        rows={3}
                        className="w-full bg-transparent border-b border-[#E1E1E1] py-3 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                        placeholder="Quartier, rue, repères visuels à Cotonou"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                      <p className="text-[9px] md:text-[10px] text-muted-foreground italic">
                        Livraison gratuite uniquement dans la zone de Cotonou.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. MODE DE PAIEMENT */}
                <div className="space-y-6 md:space-y-8">
                  <h2 className="text-[10px] uppercase tracking-[0.2em] border-b border-[#E1E1E1] pb-4">
                    3. Mode de Paiement
                  </h2>
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      Le paiement électronique valide instantanément votre sélection. 
                      Pour maintenir la fluidité de notre logistique, seul le Mobile Money est accepté.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="px-3 py-2 border border-[#E1E1E1] text-[9px] md:text-[10px] uppercase tracking-[0.1em] bg-[#1A1A1A] text-white">
                        MTN MoMo
                      </div>
                      <div className="px-3 py-2 border border-[#E1E1E1] text-[9px] md:text-[10px] uppercase tracking-[0.1em] bg-[#1A1A1A] text-white">
                        Moov Money
                      </div>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-muted-foreground italic">
                      Transaction 100% sécurisée via KKiaPay
                    </p>
                  </div>
                </div>

                <div className="pt-6 md:pt-8 space-y-6">
                  {loadingError && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm">
                      <p className="text-xs text-amber-800">{loadingError}</p>
                      <button
                        type="button"
                        onClick={loadKkiapayManually}
                        className="mt-2 text-xs text-amber-700 underline hover:text-amber-900"
                      >
                        Cliquez ici pour recharger le système de paiement
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing || !isKkiapayLoaded}
                    className={`w-full bg-[#1A1A1A] text-white px-12 py-6 text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors ${
                      isProcessing || !isKkiapayLoaded ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
                    }`}
                  >
                    {isProcessing ? "Traitement en cours..." : "Payer 14 500 FCFA"}
                  </button>
                  
                  {!isKkiapayLoaded && !loadingError && (
                    <p className="text-center text-[9px] md:text-[10px] text-amber-600 italic">
                      Chargement du système de paiement en cours...
                    </p>
                  )}
                  
                  <p className="text-center text-[9px] md:text-[10px] text-muted-foreground leading-relaxed">
                    Dès la validation de votre paiement, un email de confirmation vous sera envoyé. 
                    Notre service de livraison vous contactera par téléphone dans les 2 heures pour 
                    organiser votre remise en main propre à Cotonou.
                  </p>
                </div>
              </form>
            </div>

            {/* Récapitulatif */}
            <div className="lg:sticky lg:top-48 h-fit space-y-8 md:space-y-12 order-1 lg:order-2">
              <div className="bg-white p-8 md:p-12 rounded-sm space-y-6 md:space-y-8">
                <h2 className="text-[10px] uppercase tracking-[0.2em] border-b border-[#E1E1E1] pb-4">
                  Récapitulatif
                </h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-playfair text-base md:text-lg">Objet n°01</p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Le Purificateur Haute Précision
                      </p>
                    </div>
                    <p className="font-playfair">14 500 FCFA</p>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-[#E1E1E1]">
                    <p className="text-xs md:text-sm text-muted-foreground">Livraison (Cotonou)</p>
                    <p className="text-xs md:text-sm">Gratuite</p>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-[#E1E1E1]">
                    <p className="text-[10px] uppercase tracking-[0.2em]">Total</p>
                    <p className="font-playfair text-xl md:text-2xl">14 500 FCFA</p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  Besoin d'assistance ?
                </p>
                <p className="text-xs md:text-sm">
                  Contactez notre{" "}
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

              {/* Garanties */}
              <div className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Votre Tranquillité
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[8px]">✓</span>
                    <p className="text-[9px] text-muted-foreground">
                      Installation universelle ou reprise sous 24h
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[8px]">✓</span>
                    <p className="text-[9px] text-muted-foreground">
                      Livraison en main propre à Cotonou
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[8px]">✓</span>
                    <p className="text-[9px] text-muted-foreground">
                      Paiement 100% sécurisé
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
