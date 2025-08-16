
import React from "react";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-pulse-50 via-white to-pulse-100 flex items-center justify-center pt-20" id="hero">
      <div className="section-container text-center">
        <div className="animate-on-scroll">
          <div className="pulse-chip mb-8">
            Transform Infrastructure Costs
          </div>
          
          <h1 className="section-title text-gray-900 mb-6">
            AI Agents to{" "}
            <span className="bg-hero-gradient bg-clip-text text-transparent font-display">
              Eliminate Infrastructure Waste
            </span>
          </h1>
          
          <p className="section-subtitle mx-auto mb-8">
            Transform enterprise-scale cost optimization from complex operations into natural conversations that generate immediate savings
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="#demo" className="button-primary">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </a>
            <a href="#contact" className="button-secondary">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-16 animate-on-scroll">
          <div className="relative max-w-4xl mx-auto">
            <div className="glass-card bg-pulse-gradient p-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-pulse-600">Martian AI Agent</h3>
                <p className="text-lg mb-4">
                  "I've discovered 847 idle VMs costing $1.2M annually. Would you like me to safely remove the unused resources?"
                </p>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm font-medium text-pulse-600">Potential Monthly Savings: $97,500</span>
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
