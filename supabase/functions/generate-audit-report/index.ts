import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }

    const resend = new Resend(RESEND_API_KEY);
    const formData = await req.json();
    console.log('Received form data:', formData);

    // Costruisce il prompt per OpenAI con il formato richiesto
    const risposteAzienda = `
SETTORE: ${formData.sector}
DESCRIZIONE ATTIVITÀ: ${formData.description}
ANNI SUL MERCATO: ${formData.yearsInMarket}
RICAVI: ${formData.revenue}
PROCESSI PRINCIPALI: ${formData.mainProcesses}
STRUMENTI ATTUALI: ${formData.currentTools}
GESTIONE SEDI/REPARTI: ${formData.multipleLocations}
GESTIONE CLIENTI: ${formData.customerManagement}
ATTIVITÀ RIPETITIVE: ${formData.repetitiveTasks}
REPORT/KPI MANUALI: ${formData.manualReports}
PREVISIONI/ANALISI: ${formData.forecastAreas}
ASSISTENTE AI: ${formData.aiAreas}
    `.trim();

    const prompt = `Ho raccolto i dati preliminari di un audit ERP.
Le risposte dell'azienda sono queste:
${risposteAzienda}

Genera:
1. Le principali sezioni dell'ERP da implementare (con breve spiegazione del perché).
2. Le principali automazioni consigliate (pratiche, immediate, a valore).
3. Le proposte di utilizzo AI (assistenti, analisi, previsioni).
4. Un riepilogo sintetico con 3 priorità da affrontare subito.

Formatta la risposta in modo chiaro e professionale, usando elenchi puntati e sezioni ben definite.`;

    console.log('Sending request to OpenAI...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Sei un consulente esperto in digitalizzazione aziendale, ERP, AI e automazioni. Genera report professionali, strutturati e actionable.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 4000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const report = data.choices[0].message.content;

    // Invia email tramite Resend
    if (formData.contactInfo && formData.contactInfo.email) {
      console.log('Sending email via Resend...');
      
      const emailResponse = await resend.emails.send({
        from: 'Resyne AI <contact@re-syne.com>',
        to: [formData.contactInfo.email],
        subject: 'Report di Audit ERP Personalizzato - Resyne',
        html: `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Report Audit ERP - Resyne</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
    body {
      font-family: 'Inter', Arial, sans-serif;
      line-height: 1.6;
      color: #1a162d;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 0 10px 40px rgba(26, 22, 45, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1a162d 0%, #2a2448 100%);
      color: #ffffff;
      padding: 40px;
      text-align: center;
      position: relative;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(90deg, rgba(202, 156, 42, 0.1) 1px, transparent 1px),
        linear-gradient(rgba(202, 156, 42, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
    }
    .logo {
      width: 180px;
      height: auto;
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
    }
    .header h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 28px;
      font-weight: 700;
      margin: 0;
      color: #ca9c2a;
      text-shadow: 0 0 20px rgba(202, 156, 42, 0.3);
      position: relative;
      z-index: 1;
    }
    .header p {
      font-size: 16px;
      margin: 10px 0 0 0;
      opacity: 0.9;
      position: relative;
      z-index: 1;
    }
    .content {
      padding: 40px;
    }
    .greeting {
      font-size: 18px;
      color: #1a162d;
      margin-bottom: 30px;
      font-weight: 600;
    }
    .section {
      margin-bottom: 40px;
      background: #f8f9fb;
      padding: 30px;
      border-radius: 12px;
      border-left: 4px solid #ca9c2a;
      box-shadow: 0 4px 15px rgba(26, 22, 45, 0.05);
    }
    .section h2 {
      font-family: 'Poppins', sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #1a162d;
      margin: 0 0 20px 0;
      border-bottom: 2px solid #ca9c2a;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section h3 {
      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      font-weight: 600;
      color: #2a2448;
      margin: 25px 0 15px 0;
    }
    .company-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .info-card {
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      box-shadow: 0 2px 8px rgba(26, 22, 45, 0.05);
    }
    .info-card strong {
      color: #1a162d;
      font-weight: 600;
      display: block;
      margin-bottom: 5px;
    }
    .info-card span {
      color: #495057;
      font-size: 15px;
    }
    .report-content {
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      border: 1px solid #dee2e6;
      white-space: pre-wrap;
      font-family: 'Inter', Arial, sans-serif;
      line-height: 1.8;
      color: #212529;
      font-size: 15px;
    }
    .contact-section {
      background: linear-gradient(135deg, #1a162d 0%, #2a2448 100%);
      color: #ffffff;
      padding: 30px;
      margin: 40px -40px -40px -40px;
      text-align: center;
    }
    .contact-info {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin: 20px 0;
      flex-wrap: wrap;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .contact-item strong {
      color: #ca9c2a;
    }
    .footer-text {
      margin-top: 20px;
      font-size: 14px;
      opacity: 0.8;
    }
    @media (max-width: 600px) {
      .container { margin: 10px; }
      .header { padding: 30px 20px; }
      .content { padding: 30px 20px; }
      .company-info { grid-template-columns: 1fr; }
      .contact-info { flex-direction: column; gap: 15px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header con Logo -->
    <div class="header">
      <img src="https://raw.githubusercontent.com/lovable-dev/resyne-website/main/src/assets/resyne-logo-gold.png" alt="Resyne Logo" class="logo" />
      <h1>Report di Audit ERP</h1>
      <p>Analisi Personalizzata per la Digitalizzazione Aziendale</p>
    </div>

    <!-- Contenuto principale -->
    <div class="content">
      <div class="greeting">
        Gentile ${formData.contactInfo.firstName} ${formData.contactInfo.lastName},
      </div>
      
      <p>Grazie per aver completato il nostro <strong>Audit ERP</strong>. Il nostro team di esperti ha analizzato le informazioni fornite per creare questo report personalizzato che delinea le opportunità di digitalizzazione per la vostra azienda.</p>

      <!-- Sezione Informazioni Aziendali -->
      <div class="section">
        <h2>📊 Profilo Aziendale</h2>
        <div class="company-info">
          <div class="info-card">
            <strong>Settore</strong>
            <span>${formData.sector}</span>
          </div>
          <div class="info-card">
            <strong>Esperienza sul Mercato</strong>
            <span>${formData.yearsInMarket}</span>
          </div>
          <div class="info-card">
            <strong>Volume d'Affari</strong>
            <span>${formData.revenue}</span>
          </div>
          <div class="info-card">
            <strong>Processi Principali</strong>
            <span>${formData.mainProcesses}</span>
          </div>
        </div>
      </div>

      <!-- Sezione Report AI -->
      <div class="section">
        <h2>🤖 Analisi e Raccomandazioni</h2>
        <div class="report-content">${report}</div>
      </div>

      <!-- Sezione Next Steps -->
      <div class="section">
        <h2>🎯 Prossimi Passi</h2>
        <p>Il nostro team è pronto ad accompagnarvi nel processo di digitalizzazione. Contattaci per:</p>
        <ul style="color: #495057; margin: 15px 0;">
          <li><strong>Consulenza personalizzata</strong> per approfondire le raccomandazioni</li>
          <li><strong>Demo delle soluzioni</strong> specifiche per il vostro settore</li>
          <li><strong>Pianificazione dell'implementazione</strong> con roadmap dettagliata</li>
          <li><strong>Analisi ROI</strong> per quantificare i benefici attesi</li>
        </ul>
      </div>
    </div>

    <!-- Footer con contatti -->
    <div class="contact-section">
      <h3 style="margin-top: 0; color: #ca9c2a; font-family: 'Poppins', sans-serif;">Resyne - Digital Innovation Partners</h3>
      <div class="contact-info">
        <div class="contact-item">
          <strong>📞</strong> +39 393 063 7643
        </div>
        <div class="contact-item">
          <strong>✉️</strong> contact@re-syne.com
        </div>
      </div>
      <div class="footer-text">
        Trasformiamo le aziende attraverso l'intelligenza artificiale e l'automazione digitale.<br>
        Contattaci per una consulenza gratuita e scopri come possiamo ottimizzare i tuoi processi aziendali.
      </div>
    </div>
  </div>
</body>
</html>
        `,
      });

      console.log('Email sent successfully:', emailResponse);
    }

    return new Response(JSON.stringify({ 
      success: true,
      report: report,
      formData: formData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-audit-report function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});