import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MentionsLegales() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-3xl mx-auto prose prose-sm prose-stone">
          <h1 className="text-4xl font-playfair mb-12">Mentions Légales</h1>
          
          <div className="space-y-12 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">1. Éditeur du Site</h2>
              <p>Le site objekté (ci-après « le Site ») est édité par :</p>
              <ul className="list-none p-0 space-y-1">
                <li>Nom / Raison Sociale : [TON NOM OU NOM DE TON ENTREPRISE]</li>
                <li>Siège Social : Cotonou, République du Bénin.</li>
                <li>Contact : [TON ADRESSE EMAIL]</li>
                <li>Numéro de téléphone : [TON NUMÉRO WHATSAPP]</li>
                <li>IFU : [TON NUMÉRO IFU SI DISPONIBLE]</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">2. Hébergement</h2>
              <p>Le Site est hébergé par :</p>
              <ul className="list-none p-0 space-y-1">
                <li>Nom de l'hébergeur : [EX: SHOPIFY INC. / IONOS / HOSTINGER]</li>
                <li>Adresse : [ADRESSE DE L'HÉBERGEUR]</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">3. Propriété Intellectuelle</h2>
              <p>L’ensemble des éléments constituant le Site (textes, graphismes, logos, photographies, icônes, sons, vidéos) sont la propriété exclusive d'objekté ou de leurs auteurs respectifs.</p>
              <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">4. Protection des Données Personnelles</h2>
              <p>Conformément à la loi n° 2017-20 portant Code du numérique en République du Bénin, l'utilisateur dispose d'un droit d'accès, de rectification et d'opposition aux données personnelles le concernant. Ces droits s'exercent par email à l'adresse : [TON ADRESSE EMAIL].</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">5. Limitation de Responsabilité</h2>
              <p>objekté ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de l’utilisateur lors de l’accès au Site. Bien que nous apportions le plus grand soin à la sélection de nos objets, les informations techniques sont issues des données fabricants et sont fournies à titre indicatif.</p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
