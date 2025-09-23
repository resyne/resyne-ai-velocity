import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

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