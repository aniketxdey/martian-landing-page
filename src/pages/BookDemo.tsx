import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
const BookDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    companySize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      companySize: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.functions.invoke('send-demo-request', {
        body: formData
      });
      if (error) {
        throw error;
      }
      toast({
        title: "Demo request sent!",
        description: "We'll get back to you within 24 hours to schedule your demo."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        jobTitle: '',
        companySize: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending demo request:', error);
      toast({
        title: "Error",
        description: "Failed to send demo request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Large oval gradient bleeding into header */}
      <div className="absolute top-[5%] left-1/2 w-[100%] h-[60%] transform -translate-x-1/2">
        <div className="w-full h-full bg-gradient-radial from-orange-500/20 via-orange-500/10 to-transparent rounded-full blur-xl" />
      </div>
      
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              <span className="bg-hero-gradient-reversed bg-clip-text text-transparent font-display">See Martian for yourself</span>
            </h1>
          </div>

          <Card className="shadow-lg bg-gradient-to-br from-red-500 to-orange-500 border-0">
            <CardHeader>
              <CardTitle className="text-white">Request A Demo</CardTitle>
              <CardDescription className="text-white/90">Fill out the form below and we'll contact you within 24 hours to schedule.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="bg-white text-gray-700 placeholder:text-gray-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="john@company.com" className="bg-white text-gray-700 placeholder:text-gray-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">Company *</Label>
                    <Input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} required placeholder="Your Company" className="bg-white text-gray-700 placeholder:text-gray-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-white">Job Title</Label>
                    <Input id="jobTitle" name="jobTitle" type="text" value={formData.jobTitle} onChange={handleInputChange} placeholder="CEO, CTO, etc." className="bg-white text-gray-700 placeholder:text-gray-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-white">Company Size *</Label>
                  <Select value={formData.companySize} onValueChange={handleSelectChange} required>
                    <SelectTrigger className="bg-white text-gray-700">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mid-market">Mid-market (50-1000 employees)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your specific needs or any questions you have..." className="min-h-[100px] bg-white text-gray-700 placeholder:text-gray-500" />
                </div>

                <Button type="submit" className="w-full bg-background hover:bg-background/90 text-foreground border border-white/20" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Request Demo'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default BookDemo;