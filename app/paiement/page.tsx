"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Envoyer les informations par email
      await sendOrderEmail(formData);
      
      // 2. Ouvrir le widget KKiaPay pour le paiement
      openKkiapayWidget({
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

    } catch (error) {
      console.error("Erreur lors du traitement:", error);
      setIsProcessing(false);
    }
  };

  const sendOrderEmail = async (data: typeof formData) => {
    const emailData = {
      subject: `NOUVELLE COMMANDE objekté - ${data.fullName}`,
      content: `
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
      `
    };

    // Envoi à l'API (remplace par ton endpoint)
    const response = await fetch("/api/send-order-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) throw new Error("Erreur lors de l'envoi de l'email");
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Form */}
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
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full bg-[#1A1A1A] text-white px-12 py-6 text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors ${
                      isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-black"
                    }`}
                  >
                    {isProcessing ? "Traitement en cours..." : "Payer 14 500 FCFA"}
                  </button>
                  <p className="text-center text-[9px] md:text-[10px] text-muted-foreground leading-relaxed">
                    Dès la validation de votre paiement, un email de confirmation vous sera envoyé. 
                    Notre service de livraison vous contactera par téléphone dans les 2 heures pour 
                    organiser votre remise en main propre à Cotonou.
                  </p>
                </div>
              </form>
            </div>

            {/* Summary */}
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
