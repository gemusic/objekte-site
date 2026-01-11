"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-48 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-32"
          >
            <div className="space-y-12">
              <h1 className="text-4xl md:text-5xl font-playfair leading-tight">
                Le filtre dans le chaos.
              </h1>
              <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                <p>
                  À Cotonou, nous sommes entourés d'options, mais rarement de certitudes. Entre les marchés saturés et les produits à l'obsolescence programmée, l'acte d'achat est devenu une source de stress et de méfiance.
                </p>
                <p>
                  <span className="text-foreground font-medium">objekté</span> est né d'une conviction simple : vous méritez de déléguer votre confiance. Nous ne sommes pas une boutique supplémentaire ; nous sommes votre filtre ultime.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-xs uppercase tracking-[0.2em] border-b border-[#E1E1E1] pb-4">
                Le Majordome Moderne
              </h2>
              <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Notre rôle est celui d'un majordome : discret, expert et rigoureux. Nous parcourons, testons et éliminons des centaines de références pour n'en retenir qu'une seule.
                </p>
                <p>
                  Lorsqu'un objet apparaît sur objekté, c'est qu'il a passé notre protocole de sélection :
                </p>
                <ul className="space-y-6 pl-6 border-l border-[#E1E1E1]">
                  <li>
                    <strong className="text-foreground block mb-1">Justesse :</strong>
                    Il répond à une friction réelle de votre quotidien à Cotonou.
                  </li>
                  <li>
                    <strong className="text-foreground block mb-1">Pérennité :</strong>
                    Il est conçu pour durer, bien au-delà des standards habituels.
                  </li>
                  <li>
                    <strong className="text-foreground block mb-1">Sobriété :</strong>
                    Son design et son usage respectent votre espace et votre calme.
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-xs uppercase tracking-[0.2em] border-b border-[#E1E1E1] pb-4">
                La Philosophie "Sans Regret"
              </h2>
              <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Nous croyons en l'Essentialisme Premium. Acheter moins, mais acheter mieux.
                </p>
                <p>
                  Chaque "Objet n°[X]" de notre archive est une promesse tenue. La promesse que vous n'aurez jamais à regretter cet investissement. Si un objet sélectionné par nos soins vous déçoit, c’est que nous avons échoué dans notre mission de filtre.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-xs uppercase tracking-[0.2em] border-b border-[#E1E1E1] pb-4">
                Un Engagement Local
              </h2>
              <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                <p>
                  objekté est une marque ancrée à Cotonou. Nous connaissons vos défis — la qualité de l'eau, l'instabilité des réseaux, le besoin de fiabilité. C’est pourquoi nous avons choisi la proximité absolue : une logistique locale, un service humain et une réactivité totale.
                </p>
              </div>
            </div>

            <div className="pt-24 text-center space-y-8">
              <h2 className="text-3xl font-playfair italic">Votre temps est un luxe.</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Ne perdez plus de temps à comparer des produits médiocres. Nous avons déjà fait le travail pour vous. Bienvenue dans une nouvelle ère de consommation : celle du calme, de la clarté et de la confiance retrouvée.
              </p>
              <div className="pt-8">
                <span className="text-xs uppercase tracking-[0.3em]">objekté — La sélection juste.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
