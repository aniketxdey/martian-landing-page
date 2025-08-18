
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
      {/* Large oval gradient bleeding into header */}
      <div className="absolute top-[15%] left-1/2 w-[100%] h-[60%] transform -translate-x-1/2">
        <div className="w-full h-full bg-gradient-radial from-orange-500/20 via-orange-500/10 to-transparent rounded-full blur-xl" />
      </div>
      
      <div className="section-container text-center relative z-10">
        <div className="animate-on-scroll mb-32">
          
          <h1 className="section-title text-foreground mb-6">
            AI Agents to{" "}
            <span className="bg-hero-gradient bg-clip-text text-transparent font-display">
              Eliminate Infrastructure Waste
            </span>
          </h1>
          
          <p className="section-subtitle text-foreground/80 mx-auto mb-20">
            Transform enterprise-scale cost optimization from complex operations into natural conversations that generate immediate savings
          </p>
        </div>
        
        <AIAgentConversation />
      </div>
    </section>
  );
};

export default Hero;
