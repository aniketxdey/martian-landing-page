import React, { useState, useEffect } from "react";

const ScrollingFeatures = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      title: "Comprehensive Discovery",
      description: "Full topological scans of cloud and on-premises infrastructure with precise dependency mapping that reveals hidden connections and optimization opportunities."
    },
    {
      title: "Immediate Savings", 
      description: "Identify and eliminate runaway VMs, duplicate files, and expensive unused cold storage with automated remediation that delivers results within hours."
    },
    {
      title: "Progress Monitoring",
      description: "Monitor progress towards waste removal & optimization opportunities with agentic conversations tailored to non-technical teams."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('scrolling-features');
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / sectionHeight));
      
      const newFeatureIndex = Math.floor(scrollProgress * features.length);
      setCurrentFeature(Math.min(newFeatureIndex, features.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentFeatureData = features[currentFeature];

  return (
    <section id="scrolling-features" className="section bg-background" style={{ minHeight: '300vh' }}>
      <div className="section-container">
        <div className="sticky top-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="section-title text-foreground mb-8">
                Intelligent Infrastructure Optimization
              </h2>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground transition-all duration-500">
                {currentFeatureData.title}
              </h3>
              <p className="text-xl text-foreground/80 leading-relaxed transition-all duration-500" style={{ fontWeight: '300' }}>
                {currentFeatureData.description}
              </p>
            </div>
            
            {/* Feature indicators */}
            <div className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                    index === currentFeature 
                      ? 'border-pulse-500 bg-pulse-500/10' 
                      : 'border-border bg-card/50'
                  }`}
                >
                  <div 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFeature ? 'bg-pulse-500' : 'bg-muted'
                    }`}
                  />
                  <span className={`font-medium transition-all duration-300 ${
                    index === currentFeature ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md h-80 bg-muted/20 rounded-2xl flex items-center justify-center border border-border">
              <span className="text-muted-foreground text-lg">Feature Visualization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingFeatures;