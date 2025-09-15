import React from "react";

const AboutSection = () => {
  const founders = [
    {
      name: "Abhijit Dey",
      role: "CEO & Co-Founder",
      initials: "AD"
    },
    {
      name: "Aniket Dey", 
      role: "CTO & Co-Founder",
      initials: "AD"
    }
  ];

  return (
    <section id="about" className="section bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 mb-4">
            Meet the Founders
          </h2>
          <p className="section-subtitle mx-auto font-light">
            The team behind Martian's AI-powered infrastructure optimization
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {founders.map((founder, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-hero-gradient flex items-center justify-center text-white text-3xl font-bold">
                {founder.initials}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {founder.name}
              </h3>
              <p className="text-gray-600 font-light">
                {founder.role}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-pulse-gradient rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Y Combinator W25 Applicants
            </h3>
            <p className="text-gray-600 font-light">
              Currently raising our seed round and building the future of infrastructure optimization with AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;