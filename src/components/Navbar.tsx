
import React from "react";
import { Link } from "react-router-dom";
import DemoRequestDialog from "./DemoRequestDialog";

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

        <DemoRequestDialog>
          <button className="text-sm sm:text-base font-medium px-4 py-2 rounded-lg border border-foreground/20 bg-hero-gradient bg-clip-text text-transparent transition-all duration-200 hover:bg-none hover:bg-red-500 hover:text-white">
            Get a Demo
          </button>
        </DemoRequestDialog>
      </div>
    </header>
  );
};

export default Navbar;
