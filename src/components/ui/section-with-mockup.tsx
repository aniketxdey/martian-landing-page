'use client';

import React from "react";
import { motion } from "framer-motion";

interface SectionWithMockupProps {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    primaryImageSrc: string;
    secondaryImageSrc: string;
    reverseLayout?: boolean;
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    reverseLayout = false,
}) => {

    const layoutClasses = reverseLayout
        ? "md:grid-cols-2 md:grid-flow-col-dense"
        : "md:grid-cols-2";

    const textOrderClass = reverseLayout ? "md:col-start-2" : "";
    const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

    return (
        <section 
            className="relative py-24 md:py-48 bg-background overflow-hidden" 
        >
            <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
                <div className={`grid grid-cols-1 gap-16 md:gap-8 w-full items-center ${layoutClasses}`}>
                    {/* Text Content */}
                    <motion.div
                        className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 ${textOrderClass}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                         <div className="space-y-2 md:space-y-1">
                            <motion.h2 
                                className="section-title text-foreground"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <span className="bg-hero-gradient bg-clip-text text-transparent font-display">
                                    {title}
                                </span>
                            </motion.h2>
                        </div>

                        <motion.p 
                            className="section-subtitle text-foreground/80"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {description}
                        </motion.p>
                    </motion.div>

                    {/* App mockup/Image Content */}
                    <motion.div
                        className={`relative mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[300px] md:max-w-[471px]`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Decorative Background Element */}
                        <motion.div
                             className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-[#090909] rounded-[32px] z-0`}
                             style={{
                                top: reverseLayout ? 'auto' : '10%',
                                bottom: reverseLayout ? '10%' : 'auto',
                                left: reverseLayout ? 'auto' : '-20%',
                                right: reverseLayout ? '-20%' : 'auto',
                                transform: reverseLayout ? 'translate(0, 0)' : 'translateY(10%)',
                                filter: 'blur(2px)'
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 0.7 }}
                            transition={{ duration: 1.2, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className="relative w-full h-full bg-cover bg-center rounded-[32px]"
                                style={{
                                    backgroundImage: `url(${secondaryImageSrc})`,
                                }}
                            />
                        </motion.div>

                        {/* Main Mockup Card */}
                        <motion.div
                            className="relative w-full h-[405px] md:h-[637px] bg-[#ffffff0a] rounded-[32px] backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="p-0 h-full">
                                <div
                                    className="h-full relative"
                                    style={{
                                        backgroundSize: "100% 100%",
                                    }}
                                >
                                    {/* Primary Image */}
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${primaryImageSrc})`,
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
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

export default SectionWithMockup;