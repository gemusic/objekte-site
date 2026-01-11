import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#F5F2ED] pt-24 pb-12 px-6 border-t border-[#E1E1E1]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h3 className="font-inter text-xs uppercase tracking-[0.2em] mb-6">
              Le silence est un luxe
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-8">
              Inscrivez-vous pour être informé de la prochaine sélection.
            </p>
            <form className="flex gap-4 max-w-md">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 bg-transparent border-b border-[#E1E1E1] py-2 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
              <button className="text-xs uppercase tracking-[0.2em] hover:opacity-60 transition-opacity">
                S'inscrire
              </button>
            </form>
          </div>

          <div className="flex flex-col md:items-end justify-between">
            <div className="text-right">
              <span className="font-playfair italic text-2xl">Sans Regret</span>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-4 mt-8 md:mt-0">
              <Link
                href="/mentions-legales"
                className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Mentions Légales
              </Link>
              <Link
                href="/cgv"
                className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
              >
                CGV
              </Link>
              <Link
                href="/politique-confidentialite"
                className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Politique de Confidentialité
              </Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E1E1E1] flex justify-between items-center">
          <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            © {new Date().getFullYear()} objekté — Cotonou, Bénin.
          </p>
          <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            La sélection juste.
          </p>
        </div>
      </div>
    </footer>
  );
}
