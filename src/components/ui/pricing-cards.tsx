"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export interface PricingFeature {
    name: string;
    highlight?: boolean;
    included: boolean;
}

export interface PricingTier {
    name: string;
    price: number;
    interval?: string;
    description: string;
    features: PricingFeature[];
    highlight?: boolean;
    cta?: {
        text: string;
        href?: string;
        onClick?: () => void;
    };
}

export interface PricingCardsProps extends React.HTMLAttributes<HTMLDivElement> {
    tiers: PricingTier[];
    containerClassName?: string;
    cardClassName?: string;
    sectionClassName?: string;
}

export function PricingCards({
    tiers,
    className,
    containerClassName,
    cardClassName,
    sectionClassName,
    ...props
}: PricingCardsProps) {
    return (
        <section
            className={cn(
                "bg-background text-foreground",
                "py-12 sm:py-24 md:py-32 px-4",
                "fade-bottom overflow-hidden pb-0",
                sectionClassName
            )}
        >
            <div className={cn("w-full max-w-5xl mx-auto px-4", containerClassName)} {...props}>
                <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", className)}>
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={cn(
                                "relative group",
                                "rounded-2xl transition-all duration-500",
                                tier.highlight
                                    ? "bg-gradient-to-b from-orange-600 to-orange-700"
                                    : "bg-gradient-to-b from-orange-300 to-orange-400",
                                "border border-orange-300",
                                "hover:border-orange-400",
                                "hover:shadow-[0_8px_40px_-12px_rgba(251,146,60,0.3)]",
                                cardClassName
                            )}
                        >
                            <div className="p-10 flex flex-col h-full">
                                <div className="space-y-4">
                                    <h3 className="text-lg uppercase tracking-wider font-medium text-white">
                                        {tier.name}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-light text-white">
                                            ${tier.price}
                                        </span>
                                        <span className="text-sm text-white/70">
                                            {tier.interval || "one-time"}
                                        </span>
                                    </div>
                                    <p className="text-sm pb-6 border-b text-white/80 border-white/30">
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="mt-8 space-y-4 flex-grow">
                                    {tier.features.map((feature) => (
                                        <div
                                            key={feature.name}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white">
                                                <CheckIcon className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-sm text-white/90">
                                                {feature.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {tier.cta && (
                                    <div className="mt-8">
                                        <Button
                                            className={cn(
                                                "w-full h-12 group relative",
                                                tier.highlight
                                                    ? "bg-orange-200 hover:bg-orange-300 text-orange-800"
                                                    : "bg-orange-600 hover:bg-orange-700 text-white",
                                                "transition-all duration-300"
                                            )}
                                            onClick={tier.cta.onClick}
                                            asChild={Boolean(tier.cta.href)}
                                        >
                                            {tier.cta.href ? (
                                                <a href={tier.cta.href}>
                                                    <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                                                        {tier.cta.text}
                                                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </span>
                                                </a>
                                            ) : (
                                                <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                                                    {tier.cta.text}
                                                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}