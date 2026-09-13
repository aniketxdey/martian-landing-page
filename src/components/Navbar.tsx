
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 bg-transparent">
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="flex items-center gap-0.5"
          aria-label="Martian Home"
        >
          <img 
            src="/lovable-uploads/3c8cbbd6-d476-4cfa-9b2a-9c6eba7f4b19.png" 
            alt="Martian Logo" 
            className="h-8 w-auto"
          />
          <span className="font-bold text-xl bg-hero-gradient-reversed bg-clip-text text-transparent">Martian</span>
        </Link>

        <span className="hidden md:inline text-sm font-light tracking-wide text-foreground/60">
          Under research
        </span>
      </div>
    </header>
  );
};

export default Navbar;
