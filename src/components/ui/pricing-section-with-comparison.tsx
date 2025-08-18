import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Mid-Market",
      price: "$1,000",
      period: "/user/month",
      description: "Perfect for growing companies",
      features: [
        "Up to 100TB storage optimization",
        "1,000+ virtual machines",
        "Cloud & on-premises support",
        "24/7 AI agent monitoring",
        "Average 10 users"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Large Enterprise",
      price: "$3,000",
      period: "/user/month",
      description: "For enterprise-scale infrastructure",
      features: [
        "Up to 1PB storage optimization",
        "100,000+ virtual machines",
        "Multi-cloud orchestration",
        "Advanced analytics & reporting",
        "Average 30 users",
        "Dedicated success manager"
      ],
      cta: "Contact Sales",
      popular: true
    }
  ];

  return (
    <section id="solutions" className="section bg-pulse-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 mb-4">
            Solutions for Every Enterprise
          </h2>
          <p className="section-subtitle mx-auto">
            Choose the plan that fits your infrastructure scale and optimization needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-3xl bg-white shadow-elegant hover:shadow-elegant-hover ${
                plan.popular ? 'border-2 border-pulse-500 scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-pulse-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-pulse-500">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 rounded-full ${
                  plan.popular 
                    ? 'button-primary' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Pricing };