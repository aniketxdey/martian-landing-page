import React from "react";
import DemoRequestDialog from "./DemoRequestDialog";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-8 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-400 space-y-4">
          <DemoRequestDialog>
            <button className="font-medium px-6 py-2.5 rounded-full border border-foreground/20 bg-hero-gradient bg-clip-text text-transparent transition-all duration-200 hover:bg-none hover:bg-red-500 hover:text-white">
              Get a Demo
            </button>
          </DemoRequestDialog>
          <p>&copy; 2026 Martian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
