
import React from "react";
import { Link } from "react-router-dom";
import DemoRequestDialog from "./DemoRequestDialog";


const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-8 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-0.5 mb-4">
              <img 
                src="/lovable-uploads/3c8cbbd6-d476-4cfa-9b2a-9c6eba7f4b19.png" 
                alt="Martian Logo" 
                className="h-6 w-auto"
              />
              <span className="text-xl font-bold bg-hero-gradient-reversed bg-clip-text text-transparent">Martian</span>
            </div>
            <p className="text-gray-400 max-w-md">
              AI agents to eliminate infrastructure waste and transform enterprise cost optimization.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-pulse-500">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 space-y-4">
          <DemoRequestDialog>
            <button className="font-medium px-6 py-2.5 rounded-full border border-foreground/20 bg-hero-gradient bg-clip-text text-transparent transition-all duration-200 hover:bg-none hover:bg-red-500 hover:text-white">
              Get a Demo
            </button>
          </DemoRequestDialog>
          <p>&copy; 2025 Martian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
