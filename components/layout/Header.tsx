"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen ? "bg-[#F5F2ED]/95 backdrop-blur-sm py-4" : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Desktop Nav Left */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
          >
            La Sélection
          </Link>
          <Link
            href="/archives"
            className="text-[10px] uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
          >
            L'Archive
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex-1">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:opacity-60 transition-opacity"
          >
            {isMobileMenuOpen ? <X strokeWidth={1} size={24} /> : <Menu strokeWidth={1} size={24} />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="objekté"
              width={100}
              height={32}
              className="h-6 md:h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav Right */}
        <nav className="hidden md:flex items-center justify-end gap-8 flex-1">
          <Link
            href="/a-propos"
            className="text-[10px] uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
          >
            À Propos
          </Link>
          <button className="hover:opacity-60 transition-opacity">
            <ShoppingBag strokeWidth={1} size={20} />
          </button>
        </nav>

        {/* Mobile Cart */}
        <div className="md:hidden flex-1 flex justify-end">
          <button className="hover:opacity-60 transition-opacity">
            <ShoppingBag strokeWidth={1} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F5F2ED] border-t border-[#E1E1E1] overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-12 gap-8">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.3em]"
              >
                La Sélection
              </Link>
              <Link
                href="/archives"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.3em]"
              >
                L'Archive
              </Link>
              <Link
                href="/a-propos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.3em]"
              >
                À Propos
              </Link>
              <Link
                href="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.3em]"
              >
                FAQ
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
