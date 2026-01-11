"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      category: "Installation & Compatibilité",
      questions: [
        {
          q: "Est-ce que le purificateur s'adapte à mon robinet ?",
          a: "Oui. L'objet est livré avec un kit complet d'adaptateurs universels. Que votre robinet ait un filetage interne ou externe, le montage se fait manuellement en moins de 2 minutes. Aucun outil n'est nécessaire."
        },
        {
          q: "Puis-je l'installer moi-même ?",
          a: "Absolument. C'est un dispositif \"Plug & Play\". Une notice simplifiée accompagne l'objet, et notre concierge WhatsApp est disponible pour vous guider en cas de doute."
        }
      ]
    },
    {
      category: "Performance & Santé",
      questions: [
        {
          q: "Que filtre-t-il exactement ?",
          a: "La technologie hybride à 7 couches bloque 99 % des sédiments (rouille, boue, sable), élimine le goût et l'odeur du chlore, et réduit les métaux lourds. Elle préserve toutefois les minéraux essentiels comme le calcium et le magnésium."
        },
        {
          q: "L'eau est-elle réellement potable après filtration ?",
          a: "Le filtre est conçu pour traiter l'eau du réseau urbain de Cotonou. Il élimine les impuretés liées à la vétusté des canalisations pour vous offrir une eau cristalline et saine pour la boisson et la cuisine."
        }
      ]
    },
    {
      category: "Entretien & Durabilité",
      questions: [
        {
          q: "Quelle est la durée de vie de la cartouche ?",
          a: "Une cartouche dure environ 6 mois selon votre consommation."
        },
        {
          q: "Comment entretenir le filtre ?",
          a: "Si vous remarquez que le débit d'eau diminue, il suffit de dévisser le compartiment, de retirer la cartouche en céramique et de la frotter légèrement avec le papier de verre fourni. Cela retire la couche de sédiments accumulée et redonne au filtre sa capacité d'origine."
        },
        {
          q: "Où acheter des cartouches de rechange ?",
          a: "Elles seront disponibles dans notre section \"Archive\" de manière permanente pour nos clients."
        }
      ]
    },
    {
      category: "Livraison & Garantie",
      questions: [
        {
          q: "Quels sont les délais de livraison à Cotonou ?",
          a: "Toute commande validée avant 12h est livrée le jour même. Après 12h, la livraison intervient le lendemain matin. La livraison est strictement gratuite dans tout Cotonou."
        },
        {
          q: "Quelle est la garantie ?",
          a: "Si l'objet ne s'adapte pas à votre installation malgré les adaptateurs, ou s'il présente un défaut de fabrication, nous procédons à un échange ou un remboursement intégral sous 24h."
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-48 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-24">
            <h1 className="text-4xl font-playfair mb-6">La Clarté.</h1>
            <p className="text-muted-foreground leading-relaxed">
              Réponses techniques et précises pour lever toutes les frictions avant l'achat.
            </p>
          </div>

          <div className="space-y-24">
            {faqs.map((category, idx) => (
              <div key={idx} className="space-y-8">
                <h2 className="text-xs uppercase tracking-[0.2em] border-b border-[#E1E1E1] pb-4">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, fIdx) => (
                    <AccordionItem key={fIdx} value={`item-${idx}-${fIdx}`} className="border-none">
                      <AccordionTrigger className="text-left font-playfair text-xl hover:no-underline py-6">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
