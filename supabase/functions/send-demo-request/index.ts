import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DemoRequestData {
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  companySize: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: DemoRequestData = await req.json();
    console.log("Demo request received:", requestData);

    const { name, email, company, jobTitle, companySize, message } = requestData;

    // Send email to the business
    const emailResponse = await resend.emails.send({
      from: "Demo Requests <onboarding@resend.dev>",
      to: ["artian.ai.2025@gmail.com"],
      subject: `New Demo Request from ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #ea580c; margin-bottom: 20px;">New Demo Request</h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Job Title:</strong> ${jobTitle || 'Not provided'}</p>
            <p><strong>Company Size:</strong> ${companySize === 'mid-market' ? 'Mid-market (50-1000 employees)' : 'Enterprise (1000+ employees)'}</p>
          </div>
          
          ${message ? `
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #374151;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p>This demo request was submitted through the Martian website.</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the requester
    const confirmationResponse = await resend.emails.send({
      from: "Martian <onboarding@resend.dev>",
      to: [email],
      subject: "Demo Request Received - We'll Be In Touch Soon!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #ea580c; margin-bottom: 20px;">Thank you for your demo request!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for your interest in Martian! We've received your demo request and our team will get back to you within 24 hours to schedule a personalized demonstration.</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">What to Expect</h3>
            <ul style="color: #374151; line-height: 1.6;">
              <li>A personalized demo tailored to ${company}'s needs</li>
              <li>Discussion of your specific use cases and requirements</li>
              <li>Q&A session with our product experts</li>
              <li>Next steps for implementation</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to explore our website for more information about how Martian can transform your business operations.</p>
          
          <p>Best regards,<br>
          The Martian Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p>If you have any urgent questions, feel free to reply to this email.</p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { emailResponse, confirmationResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Demo request sent successfully",
        emailResponse,
        confirmationResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-demo-request function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);