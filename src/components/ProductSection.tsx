import React from "react";

const ProductSection = () => {
  const features = [
    {
      title: "AI Agent Automation",
      description: "Our Martian agents use advanced AI to automatically scan and analyze your entire infrastructure landscape"
    },
    {
      title: "Comprehensive Discovery",
      description: "Full topological scans of cloud and on-premises infrastructure with precise dependency mapping"
    },
    {
      title: "Immediate Savings",
      description: "Identify and eliminate runaway VMs, duplicate files, and expensive unused cold storage"
    },
    {
      title: "No Technical Expertise Required",
      description: "Natural conversational interface that finance, IT, and DevOps teams can all use effectively"
    },
    {
      title: "Universal Integration",
      description: "Seamless integration with AWS, Azure, GCP, and major on-premises storage vendors"
    },
    {
      title: "Real-Time Optimization",
      description: "Continuous monitoring and optimization recommendations that adapt to your changing infrastructure"
    }
  ];

  return (
    <section id="product" className="section bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 mb-4">
            Intelligent Infrastructure Optimization
          </h2>
          <p className="section-subtitle mx-auto">
            Transform your infrastructure costs with AI-powered automation that works seamlessly across your entire technology stack
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card bg-white shadow-elegant hover:shadow-elegant-hover border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;