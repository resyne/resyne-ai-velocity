import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  date: string;
  time: string;
  platform: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, message, date, time, platform }: BookingRequest = await req.json();

    console.log("Processing booking notification:", { firstName, lastName, email, phone, date, time, platform });

    // Email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Re-Syne <contact@re-syne.com>",
      to: [email],
      subject: `Conferma Appuntamento - ${date} alle ${time}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #D4AF37;">Conferma Appuntamento</h1>
          <p>Gentile ${firstName} ${lastName},</p>
          <p>Grazie per aver prenotato una call con Re-Syne!</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Dettagli Appuntamento:</h2>
            <p><strong>Data:</strong> ${date}</p>
            <p><strong>Ora:</strong> ${time}</p>
            <p><strong>Piattaforma:</strong> ${platform}</p>
            ${message ? `<p><strong>Messaggio:</strong> ${message}</p>` : ''}
          </div>
          
          <p>Ti contatteremo prima della call con i dettagli di accesso.</p>
          <p>Non vediamo l'ora di parlare con te!</p>
          
          <p style="margin-top: 40px;">
            <strong>Il Team Re-Syne</strong><br>
            <a href="https://re-syne.com" style="color: #D4AF37;">www.re-syne.com</a>
          </p>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);

    // Email to Re-Syne team
    const teamEmailResponse = await resend.emails.send({
      from: "Re-Syne Bookings <contact@re-syne.com>",
      to: ["contact@re-syne.com"],
      subject: `Nuovo Appuntamento: ${firstName} ${lastName} - ${date} ${time}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #D4AF37;">Nuovo Appuntamento Prenotato</h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Dettagli Cliente:</h2>
            <p><strong>Nome:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Telefono:</strong> <a href="tel:${phone}">${phone}</a></p>
            ${message ? `<p><strong>Messaggio:</strong> ${message}</p>` : ''}
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #856404; margin-top: 0;">Appuntamento:</h2>
            <p><strong>Data:</strong> ${date}</p>
            <p><strong>Ora:</strong> ${time}</p>
            <p><strong>Piattaforma:</strong> ${platform}</p>
          </div>
          
          <p style="color: #666;">Email di conferma inviata automaticamente al cliente.</p>
        </div>
      `,
    });

    console.log("Team email sent:", teamEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmail: customerEmailResponse,
        teamEmail: teamEmailResponse 
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
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
