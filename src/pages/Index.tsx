
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DemoSection from "@/components/DemoSection";
import SectionWithMockup from "@/components/ui/section-with-mockup";
import { Pricing } from "@/components/ui/pricing-section-with-comparison";
import Footer from "@/components/Footer";

const Index = () => {
  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-0">
        <Hero />
        <SectionWithMockup
          title="Understand Your Infrastructure"
          description="Full topological scans of cloud and on-premises infrastructure with precise dependency mapping that reveals hidden connections and optimization opportunities."
          primaryImageSrc="/lovable-uploads/99f4e7cf-62df-4a31-b500-f4cffcaaceda.png"
          secondaryImageSrc=""
        />
        <SectionWithMockup
          title="Launch Immediate Optimizations"
          description="Identify and eliminate runaway VMs, duplicate files, and expensive unused cold storage with automated remediation that delivers results within hours."
          primaryImageSrc="https://via.placeholder.com/600x400/444/fff?text=Optimization+Engine"
          secondaryImageSrc=""
          reverseLayout={true}
        />
        <SectionWithMockup
          title="Save Time Intelligently"
          description="Monitor progress towards waste removal & optimization opportunities with agentic conversations tailored to non-technical teams."
          primaryImageSrc="/lovable-uploads/09a8b2cd-5102-40ac-a8be-3d66c05eae83.png"
          secondaryImageSrc=""
        />
        <DemoSection />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
