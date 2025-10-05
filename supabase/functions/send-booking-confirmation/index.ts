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
  city: string;
  phone: string;
  hasWebsite: boolean;
  hasLogo: boolean;
  appointmentDate: string;
  appointmentTime: string;
  preferWhatsApp: boolean;
  preferEmail: boolean;
  preferPhone: boolean;
  preferConference: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingRequest = await req.json();
    
    console.log("Processing booking request:", bookingData);

    const preferences = [];
    if (bookingData.preferWhatsApp) preferences.push("WhatsApp");
    if (bookingData.preferEmail) preferences.push("Email");
    if (bookingData.preferPhone) preferences.push("Telefono");
    if (bookingData.preferConference) preferences.push("Videochiamata");

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: "Resyne <onboarding@resend.dev>",
      to: [bookingData.email],
      subject: "Conferma Richiesta Appuntamento - Resyne",
      html: `
        <h1>Grazie ${bookingData.firstName}!</h1>
        <p>Abbiamo ricevuto la tua richiesta di appuntamento.</p>
        <p><strong>Dettagli appuntamento:</strong></p>
        <ul>
          <li>Data: ${bookingData.appointmentDate}</li>
          <li>Ora: ${bookingData.appointmentTime}</li>
          <li>Hai già un sito web: ${bookingData.hasWebsite ? "Sì" : "No"}</li>
          <li>Hai un logo aziendale: ${bookingData.hasLogo ? "Sì" : "No"}</li>
        </ul>
        <p>Ti contatteremo presto tramite: ${preferences.join(", ")}</p>
        <p>A presto,<br>Team Resyne</p>
      `,
    });

    console.log("Customer email sent:", customerEmail);

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: "Resyne Bookings <onboarding@resend.dev>",
      to: ["stanislaoelefante@gmail.com"],
      subject: `Nuova Richiesta Appuntamento - ${bookingData.firstName} ${bookingData.lastName}`,
      html: `
        <h1>Nuova Richiesta Appuntamento</h1>
        <h2>Informazioni Cliente</h2>
        <ul>
          <li><strong>Nome:</strong> ${bookingData.firstName} ${bookingData.lastName}</li>
          <li><strong>Email:</strong> ${bookingData.email}</li>
          <li><strong>Telefono:</strong> ${bookingData.phone}</li>
          <li><strong>Città:</strong> ${bookingData.city}</li>
        </ul>
        
        <h2>Dettagli Progetto</h2>
        <ul>
          <li><strong>Ha già un sito web:</strong> ${bookingData.hasWebsite ? "Sì" : "No"}</li>
          <li><strong>Ha un logo aziendale:</strong> ${bookingData.hasLogo ? "Sì" : "No"}</li>
        </ul>
        
        <h2>Appuntamento Richiesto</h2>
        <ul>
          <li><strong>Data:</strong> ${bookingData.appointmentDate}</li>
          <li><strong>Ora:</strong> ${bookingData.appointmentTime}</li>
        </ul>
        
        <h2>Preferenze di Contatto</h2>
        <ul>
          ${bookingData.preferWhatsApp ? "<li>WhatsApp</li>" : ""}
          ${bookingData.preferEmail ? "<li>Email</li>" : ""}
          ${bookingData.preferPhone ? "<li>Telefono</li>" : ""}
          ${bookingData.preferConference ? "<li>Videochiamata</li>" : ""}
        </ul>
      `,
    });

    console.log("Admin email sent:", adminEmail);

    return new Response(
      JSON.stringify({ 
        success: true,
        customerEmail,
        adminEmail 
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
    console.error("Error in send-booking-confirmation function:", error);
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
