import React from "react";
import { PricingCards } from "@/components/ui/pricing-cards";
import { motion } from "framer-motion";
import DemoRequestDialog from "@/components/DemoRequestDialog";
const tiers = [{
  name: "MID-MARKET",
  price: 1000,
  interval: "/user/month",
  description: "Perfect for growing companies with expanding infrastructure needs",
  features: [{
    name: "Up to 100TB storage optimization",
    included: true
  }, {
    name: "1,000+ virtual machines",
    included: true
  }, {
    name: "Cloud & on-premises support",
    included: true
  }, {
    name: "24/7 AI agent monitoring",
    included: true
  }, {
    name: "Average 10 users",
    included: true
  }, {
    name: "Multi-cloud orchestration",
    included: false
  }, {
    name: "Advanced analytics & reporting",
    included: false
  }, {
    name: "Dedicated success manager",
    included: false
  }],
  cta: {
    text: "Get Started",
    href: "#contact"
  }
}, {
  name: "LARGE ENTERPRISE",
  price: 3000,
  interval: "/user/month",
  description: "For enterprise-scale infrastructure with advanced requirements",
  highlight: true,
  features: [{
    name: "Up to 1PB storage optimization",
    included: true
  }, {
    name: "100,000+ virtual machines",
    included: true
  }, {
    name: "Cloud & on-premises support",
    included: true
  }, {
    name: "24/7 AI agent monitoring",
    included: true
  }, {
    name: "Average 30 users",
    included: true
  }, {
    name: "Multi-cloud orchestration",
    included: true
  }, {
    name: "Advanced analytics & reporting",
    included: true
  }, {
    name: "Dedicated success manager",
    included: true
  }],
  cta: {
    text: "Contact Sales",
    href: "#contact"
  }
}];
function Pricing() {
  return <div className="relative py-12 md:py-20 bg-background overflow-hidden">
      <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
        <motion.div className="flex text-center justify-center items-center gap-4 flex-col mb-8" initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: "easeOut"
      }} viewport={{
        once: true,
        amount: 0.3
      }}>
          <motion.div className="flex gap-2 flex-col" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} viewport={{
          once: true
        }}>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              <span className="bg-hero-gradient bg-clip-text text-transparent font-display">
                Solutions for Every Enterprise
              </span>
            </h2>
          </motion.div>
        </motion.div>
        
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.8,
        delay: 0.3
      }} viewport={{
        once: true,
        amount: 0.3
      }}>
          <PricingCards tiers={tiers} className="gap-6" sectionClassName="py-0 !pt-0" containerClassName="py-0" />
        </motion.div>

        <motion.div 
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
        <motion.div 
          className="flex justify-center mt-4"
            <button className="text-lg sm:text-xl font-semibold px-10 py-4 rounded-lg border border-foreground/20 bg-hero-gradient bg-clip-text text-transparent transition-all duration-200 hover:bg-clip-border hover:text-primary-foreground">
              Get a Demo
            </button>
          </DemoRequestDialog>
        </motion.div>
      </div>
      
      {/* Decorative bottom gradient */}
      <div className="absolute w-full h-px bottom-0 left-0 z-0" style={{
      background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)"
    }} />
    </div>;
}
export { Pricing };