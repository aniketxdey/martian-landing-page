import React from "react";
import { Button } from "@/components/ui/button";
import { Youtube, Play } from "lucide-react";
import { motion } from "framer-motion";

const DemoSection = () => {
  return (
    <section id="demo" className="relative py-16 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-hero-gradient bg-clip-text text-transparent font-display">
              See Martian in Action
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-foreground/80 leading-relaxed mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience how Martian agents automatically discover infrastructure dependencies, 
            analyze optimization opportunities, and remove wasted resources
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black/20"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe 
              src="https://www.youtube.com/embed/1yyZPRn243U" 
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Martian AI Demo"
            />
          </motion.div>
          
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
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
            </div>
          </motion.div>
        </motion.div>
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