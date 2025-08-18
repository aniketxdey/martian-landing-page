import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function Pricing() {
  return (
    <div className="relative py-16 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge>Pricing</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
              <span className="bg-hero-gradient bg-clip-text text-transparent font-display">
                Solutions for Every Enterprise
              </span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl text-center">
              Choose the plan that fits your infrastructure scale and optimization needs
            </p>
          </div>
          <div className="grid text-left w-full grid-cols-2 lg:grid-cols-3 divide-x pt-20">
            <div className="col-span-2 lg:col-span-1"></div>
            <div className="px-3 py-1 md:px-6 md:py-4  gap-2 flex flex-col">
              <p className="text-2xl">Mid-Market</p>
              <p className="text-sm text-muted-foreground">
                Perfect for growing companies with expanding infrastructure needs
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                <span className="text-4xl">$1,000</span>
                <span className="text-sm text-muted-foreground"> /user/month</span>
              </p>
              <Button variant="outline" className="gap-4 mt-8">
                Get Started <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col">
              <p className="text-2xl">Large Enterprise</p>
              <p className="text-sm text-muted-foreground">
                For enterprise-scale infrastructure with advanced requirements
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                <span className="text-4xl">$3,000</span>
                <span className="text-sm text-muted-foreground"> /user/month</span>
              </p>
              <Button className="gap-4 mt-8">
                Contact Sales <PhoneCall className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1  py-4">
              <b>Features</b>
            </div>
            <div></div>
            <div></div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-4">Storage Optimization</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-muted-foreground text-sm">Up to 100TB</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-muted-foreground text-sm">Up to 1PB</p>
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-4">
              Virtual Machines
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-muted-foreground text-sm">1,000+</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-muted-foreground text-sm">100,000+</p>
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-4">Cloud & On-Premises Support</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-4">
              24/7 AI Agent Monitoring
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-4">
              Average Users
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-muted-foreground text-sm">10 users</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-muted-foreground text-sm">30 users</p>
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-4">
              Multi-Cloud Orchestration
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Minus className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-4">
              Advanced Analytics & Reporting
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Minus className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="px-3 lg:px-6 col-span-2 lg:col-span-1 py-4">
              Dedicated Success Manager
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Minus className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-primary" />
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
    </div>
  );
}

export { Pricing };