import React from "react";
import { Button } from "@/components/ui/button";
import { Youtube, Play } from "lucide-react";

const DemoSection = () => {
  return (
    <section id="demo" className="relative py-16 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-4">
            <span className="bg-hero-gradient bg-clip-text text-transparent font-display">
              See Martian in Action
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mx-auto">
            Experience how Martian agents automatically discover infrastructure dependencies, 
            analyze optimization opportunities, and remove wasted resources
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black/20">
            <iframe 
              src="https://www.youtube.com/embed/1yyZPRn243U" 
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Martian AI Demo"
            />
          </div>
          
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://www.youtube.com/watch?v=1yyZPRn243U" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-foreground/10 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-foreground/20 px-10 py-3 rounded-full transition-all duration-300 whitespace-nowrap"
              >
                <Youtube className="mr-2 w-5 h-5" />
                Watch on YouTube
              </a>
              <a 
                href="#contact"
                className="inline-flex items-center bg-foreground text-background hover:bg-foreground/90 px-10 py-3 rounded-full transition-all duration-300 font-medium whitespace-nowrap"
              >
                Request Private Demo
                <Play className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom gradient */}
      <div
        className="absolute w-full h-px bottom-0 left-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  );
};

export default DemoSection;