import React from "react";
import { Button } from "@/components/ui/button";
import { Youtube, Play } from "lucide-react";

const DemoSection = () => {
  return (
    <section id="demo" className="section bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            See Martian in Action
          </h2>
          <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto">
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
                className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300"
              >
                <Youtube className="mr-2 w-5 h-5" />
                Watch on YouTube
              </a>
              <a 
                href="#contact"
                className="inline-flex items-center bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full transition-all duration-300 font-medium"
              >
                Request Private Demo
                <Play className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;