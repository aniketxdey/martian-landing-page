import React, { useState, useEffect } from "react";

const AIAgentConversation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const conversations = [
    {
      title: "Martian Alpha",
      message: "I've discovered 847 idle VMs costing $1.2M annually. Would you like me to safely remove the unused resources?",
      savings: "$97,500",
      type: "Virtual Machine Optimization"
    },
    {
      title: "Martian Beta", 
      message: "Found 2.3TB of duplicate files across storage arrays consuming $45K monthly. I can consolidate these while maintaining all access patterns.",
      savings: "$45,000",
      type: "Physical Storage Optimization"
    },
    {
      title: "Martian Gamma",
      message: "Detected 15 over-provisioned database instances with 80% idle capacity. Shall I optimize the resource allocation?",
      savings: "$76,200", 
      type: "Database Resource Optimization"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % conversations.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-on-scroll px-8 md:px-4">
      <div className="relative max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="glass-card bg-hero-gradient p-3 md:p-8">
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 md:p-8 text-left">
            <div className="relative w-full overflow-hidden">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {conversations.map((conversation, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-1 md:px-2">
                    <div className="w-full">
                      <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-0 flex-wrap">
                        <img 
                          src="/lovable-uploads/3c8cbbd6-d476-4cfa-9b2a-9c6eba7f4b19.png" 
                          alt="Martian Logo" 
                          className="h-6 md:h-10 w-auto"
                        />
                        <span className="bg-hero-gradient-reversed bg-clip-text text-transparent ml-0.5">
                          {conversation.title}
                        </span>
                      </h3>
                      <div className="mb-2">
                        <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                          {conversation.type}
                        </span>
                      </div>
                      <p className="text-sm md:text-lg mb-3 md:mb-4 text-card-foreground leading-relaxed">
                        "{conversation.message}"
                      </p>
                      <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
                        <span className="text-xs md:text-sm font-medium bg-hero-gradient bg-clip-text text-transparent">
                          Potential Monthly Savings: {conversation.savings}
                        </span>
                        <div className="flex gap-2 justify-center md:justify-end">
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {conversations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentConversation;