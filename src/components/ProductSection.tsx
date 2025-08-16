import React from "react";

const ProductSection = () => {
  const features = [
    {
      icon: "🤖",
      title: "AI Agent Automation",
      description: "Our Martian agents use advanced AI to automatically scan and analyze your entire infrastructure landscape"
    },
    {
      icon: "🔍",
      title: "Comprehensive Discovery",
      description: "Full topological scans of cloud and on-premises infrastructure with precise dependency mapping"
    },
    {
      icon: "💰",
      title: "Immediate Savings",
      description: "Identify and eliminate runaway VMs, duplicate files, and expensive unused cold storage"
    },
    {
      icon: "🎯",
      title: "No Technical Expertise Required",
      description: "Natural conversational interface that finance, IT, and DevOps teams can all use effectively"
    },
    {
      icon: "🔗",
      title: "Universal Integration",
      description: "Seamless integration with AWS, Azure, GCP, and major on-premises storage vendors"
    },
    {
      icon: "📊",
      title: "Real-Time Optimization",
      description: "Continuous monitoring and optimization recommendations that adapt to your changing infrastructure"
    }
  ];

  return (
    <section id="product" className="section bg-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Intelligent Infrastructure Optimization
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transform your infrastructure costs with AI-powered automation that works seamlessly across your entire technology stack
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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