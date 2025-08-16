
import React from "react";
import { Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold">Martian</span>
            </div>
            <p className="text-gray-400 max-w-md mb-4">
              AI agents to eliminate infrastructure waste and transform enterprise cost optimization.
            </p>
            <div className="flex space-x-4">
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#product" className="hover:text-white">AI Platform</a></li>
              <li><a href="#solutions" className="hover:text-white">Pricing</a></li>
              <li><a href="#demo" className="hover:text-white">Demo</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Martian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
