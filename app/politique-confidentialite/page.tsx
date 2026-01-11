import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-3xl mx-auto prose prose-sm prose-stone">
          <h1 className="text-4xl font-playfair mb-12">Politique de Confidentialité</h1>
          
          <div className="space-y-12 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">1. Philosophie de Protection</h2>
              <p>Chez objekté, le respect de votre vie privée est une extension de notre promesse de calme. Nous ne collectons que les données strictement nécessaires pour assurer une livraison précise à Cotonou et une communication fluide. Nous ne vendons, ne louons, ni ne partageons jamais vos informations avec des tiers à des fins publicitaires.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">2. Données Collectées</h2>
              <p>Pour traiter votre sélection, nous collectons les informations suivantes :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Identité : Nom et prénom.</li>
                <li>Contact : Adresse email (pour l'envoi de la confirmation de sélection).</li>
                <li>Logistique : Numéro de téléphone et adresse géographique à Cotonou (pour la coordination du livreur).</li>
                <li>Paiement : Les transactions sont traitées via des plateformes sécurisées. objekté n'a jamais accès à vos numéros de carte bancaire ou codes secrets Mobile Money.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">3. Utilisation des Données</h2>
              <p>Vos données sont utilisées exclusivement pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Valider votre commande et vous envoyer votre reçu par email.</li>
                <li>Permettre à notre service logistique de vous livrer dans les délais convenus.</li>
                <li>Vous informer de la disponibilité de la prochaine sélection dans l'Archive (uniquement si vous avez choisi de vous inscrire à notre lettre d'information).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">4. Sécurité et Conservation</h2>
              <p>Vos informations sont stockées sur des serveurs sécurisés. Nous conservons vos données de livraison pour une durée de 2 ans afin de faciliter votre service après-vente et la gestion des consommables (cartouches de rechange).</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">5. Vos Droits</h2>
              <p>Conformément à la loi n° 2017-20 portant Code du numérique en République du Bénin, vous disposez d'un droit d'accès, de modification ou de suppression de vos données personnelles.</p>
              <p>Pour exercer ce droit, il vous suffit de contacter notre concierge à l'adresse suivante : [TON ADRESSE EMAIL].</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">6. Cookies</h2>
              <p>Notre site utilise des cookies dits "techniques" uniquement pour maintenir le contenu de votre panier et assurer la stabilité de votre navigation. Aucun cookie de pistage publicitaire n'est utilisé.</p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
