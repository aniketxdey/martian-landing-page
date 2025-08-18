
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 bg-transparent">
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <a 
          href="#" 
          className="flex items-center gap-1"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Martian"
        >
          <img 
            src="/lovable-uploads/3c8cbbd6-d476-4cfa-9b2a-9c6eba7f4b19.png" 
            alt="Martian Logo" 
            className="h-8 w-auto"
          />
          <span className="font-bold text-xl bg-hero-gradient-reversed bg-clip-text text-transparent">Martian</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="/book-demo" className="bg-hero-gradient bg-clip-text text-transparent font-medium transition-all duration-200 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg border border-foreground/20 hover:bg-none">Book a Demo</a>
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button 
          className="md:hidden text-gray-700 p-3 focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-8 items-center mt-8">
          <a 
            href="/book-demo" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg border border-foreground/20 bg-hero-gradient bg-clip-text text-transparent hover:bg-red-500 hover:text-white hover:bg-none transition-all duration-200"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Book a Demo
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
