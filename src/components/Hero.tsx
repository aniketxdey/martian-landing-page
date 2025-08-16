
import React from "react";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8" id="hero">
      <div className="max-w-7xl mx-auto text-center">
        <div className="animate-on-scroll">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="text-xl mr-2">🚀</span>
            Transform Infrastructure Costs
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-gray-900 mb-6">
            AI Agents to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Eliminate Infrastructure Waste
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Transform enterprise-scale cost optimization from complex operations into natural conversations that generate immediate savings
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#demo" 
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center border border-gray-300 text-gray-700 hover:border-primary hover:text-primary px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-16 animate-on-scroll">
          <div className="relative">
            <div className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl bg-gradient-to-br from-primary to-secondary p-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">🤖 Martian AI Agent</h3>
                <p className="text-lg opacity-90 mb-4">
                  "I've discovered 847 idle VMs costing $1.2M annually. Would you like me to safely remove the unused resources?"
                </p>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm opacity-75">💰 Potential Monthly Savings: $97,500</span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-green-400/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-3 h-3 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
