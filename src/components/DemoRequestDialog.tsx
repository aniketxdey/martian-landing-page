import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DemoRequestDialogProps {
  children: React.ReactNode;
}

const initialForm = {
  name: "",
  email: "",
  company: "",
  jobTitle: "",
  companySize: "",
  message: "",
};

const DemoRequestDialog = ({ children }: DemoRequestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof initialForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.companySize) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-demo-request", { body: form });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Thanks! We'll be in touch within 24 hours.");
    } catch (err) {
      console.error("Demo request failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setForm(initialForm);
        setSubmitted(false);
      }, 200);
    }
  };

  const fieldClass =
    "bg-white text-[#111214] border border-[#D4D4D0] placeholder:text-[#8E9198] focus-visible:ring-2 focus-visible:ring-[#D2401A]/40 focus-visible:border-[#D2401A]";
  const labelClass = "text-[#2A2C30] font-medium";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E6E6E3] bg-white text-[#111214] font-[Geist,ui-sans-serif,system-ui,sans-serif]">
        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 mx-auto text-[#D2401A]" />
            <DialogTitle className="text-2xl font-semibold tracking-[-0.02em]">Request received</DialogTitle>
            <DialogDescription className="text-[#45484E]">
              Our team will reach out within 24 hours to schedule your demo.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold tracking-[-0.02em]">See Martian for yourself</DialogTitle>
              <DialogDescription className="text-[#45484E]">
                Tell us a bit about your team and we'll set up a personalized walkthrough.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="demo-name" className={labelClass}>Full Name*</Label>
                  <Input id="demo-name" className={fieldClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-email" className={labelClass}>Work Email*</Label>
                  <Input id="demo-email" type="email" className={fieldClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@company.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-company" className={labelClass}>Company*</Label>
                  <Input id="demo-company" className={fieldClass} value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-title" className={labelClass}>Job Title</Label>
                  <Input id="demo-title" className={fieldClass} value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} placeholder="Head of Platform" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>Company Size*</Label>
                <Select value={form.companySize} onValueChange={(value) => update("companySize", value)}>
                  <SelectTrigger className={fieldClass}>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mid-market">Mid-market (50–1000 employees)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-message" className={labelClass}>What would you like to solve?</Label>
                <Textarea id="demo-message" className={`${fieldClass} min-h-[90px]`} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Current infrastructure spend, tooling, goals..." />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D2401A] text-white px-6 py-3.5 font-semibold transition-colors hover:bg-[#B9361A] disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {isSubmitting ? "Sending..." : "Request Demo"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-xs text-[#5B5F66] text-center">
                We'll only use your details to contact you about a demo.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestDialog;
