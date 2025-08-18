
import React, { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import AIAgentConversation from "./AIAgentConversation";

const Hero = () => {
  const [currentChip, setCurrentChip] = useState(0);
  
  const chipMessages = [
    "Transform Infrastructure Costs",
    "Optimize Immediately", 
    "Technical Expertise Never Required"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentChip((prev) => (prev + 1) % chipMessages.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className="min-h-screen bg-background flex items-center justify-center pt-20 relative overflow-hidden" id="hero">
      {/* Large transparent orange gradient centered on headline */}
      <div className="absolute top-2/5 left-0 w-full h-96 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent transform -translate-y-1/2 blur-xl" />
      
      <div className="section-container text-center relative z-10">
        <div className="animate-on-scroll">
          <div className="pulse-chip mb-8 transition-all duration-500">
            {chipMessages[currentChip]}
          </div>
          
          <h1 className="section-title text-foreground mb-6">
            AI Agents to{" "}
            <span className="bg-hero-gradient bg-clip-text text-transparent font-display">
              Eliminate Infrastructure Waste
            </span>
          </h1>
          
          <p className="section-subtitle text-foreground/80 mx-auto mb-8">
            Transform enterprise-scale cost optimization from complex operations into natural conversations that generate immediate savings
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="#demo" className="button-primary px-12 py-4 whitespace-nowrap">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </a>
            <a href="#contact" className="button-secondary px-12 py-4 whitespace-nowrap">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
        
        <AIAgentConversation />
      </div>
    </section>
  );
};

export default Hero;
