import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
    size: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your interest! We'll be in touch soon to schedule your demo.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="section bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get Started Today
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to eliminate infrastructure waste and boost your EBITDA? Let's talk.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Demo</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Company Size</option>
                  <option value="1-50">1-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Tell us about your infrastructure challenges"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-lg"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-lg text-lg"
              >
                Request Demo
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mt-1 mr-4" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">San Ramon, CA / San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary mt-1 mr-4" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">hello@martian.ai</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-primary mt-1 mr-4" />
                  <div>
                    <p className="font-medium text-gray-900">Schedule</p>
                    <p className="text-gray-600">Schedule a Call</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Investor Relations</h4>
              <p className="text-gray-600 mb-4">
                Currently raising our seed round. Y Combinator W25 applicants.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Partnership Opportunities</h4>
              <p className="text-gray-600">
                Interested in integrating with Martian or becoming a technology partner? Let's explore opportunities together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;