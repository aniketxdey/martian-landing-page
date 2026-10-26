import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

/* The demo request form. Loaded on demand by components/site/DemoRequest.tsx;
 * submissions go to the Supabase edge function send-demo-request, unchanged. */

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Element to focus again when the dialog closes (the button that opened it). */
  returnFocusTo?: React.MutableRefObject<HTMLElement | null>;
};

const initialForm = {
  name: "",
  email: "",
  company: "",
  jobTitle: "",
  companySize: "",
  message: "",
};

const DemoRequestDialog = ({ open, onOpenChange, returnFocusTo }: Props) => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof initialForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.companySize) {
      toast.error("Fill in your name, work email, company and company size first.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Supabase only loads when someone actually sends the form.
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.functions.invoke("send-demo-request", { body: form });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Got it. We'll email you within 24 hours.");
    } catch (err) {
      console.error("Demo request failed:", err);
      toast.error("That didn't go through. Give it another try in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
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
      <DialogContent
        onCloseAutoFocus={(e) => {
          const el = returnFocusTo?.current;
          if (el && document.contains(el)) {
            e.preventDefault();
            el.focus();
          }
        }}
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E6E6E3] bg-white text-[#111214] font-sans"
      >
        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 mx-auto text-[#D2401A]" aria-hidden="true" />
            <DialogTitle className="text-2xl font-semibold tracking-[-0.02em]">Request received</DialogTitle>
            <DialogDescription className="text-[#45484E]">
              We'll email you within 24 hours to find a time that works for your team.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold tracking-[-0.02em]">Book a demo</DialogTitle>
              <DialogDescription className="text-[#45484E]">
                Tell us a little about your infrastructure and we'll put together a walkthrough for your team.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="demo-name" className={labelClass}>Full name<span aria-hidden="true">*</span></Label>
                  <Input id="demo-name" autoComplete="name" className={fieldClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" required aria-required="true" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-email" className={labelClass}>Work email<span aria-hidden="true">*</span></Label>
                  <Input id="demo-email" type="email" autoComplete="email" className={fieldClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@company.com" required aria-required="true" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-company" className={labelClass}>Company<span aria-hidden="true">*</span></Label>
                  <Input id="demo-company" autoComplete="organization" className={fieldClass} value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name" required aria-required="true" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-title" className={labelClass}>Job title</Label>
                  <Input id="demo-title" autoComplete="organization-title" className={fieldClass} value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} placeholder="Head of Platform" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-size" className={labelClass}>Company size<span aria-hidden="true">*</span></Label>
                <Select value={form.companySize} onValueChange={(value) => update("companySize", value)}>
                  <SelectTrigger id="demo-size" className={fieldClass} aria-required="true">
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mid-market">Mid-market (50 to 1,000 employees)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (over 1,000 employees)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo-message" className={labelClass}>What do you want to fix?</Label>
                <Textarea id="demo-message" className={`${fieldClass} min-h-[90px]`} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Roughly what you spend each month, and what's been bugging you about the bill" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D2401A] text-white px-6 py-3.5 font-semibold transition-colors hover:bg-[#B9361A] disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
                {isSubmitting ? "Sending…" : "Request a demo"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
              </button>
              <p className="text-xs text-[#5B5F66] text-center">
                We only use these details to set up your demo.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestDialog;
