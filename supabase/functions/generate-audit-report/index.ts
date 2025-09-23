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

    // Costruisce il prompt per OpenAI
    const prompt = `
Come consulente esperto in digitalizzazione aziendale e soluzioni ERP, AI e Automazioni, analizza le seguenti informazioni aziendali e genera un report dettagliato e professionale.

INFORMAZIONI AZIENDA:
- Settore: ${formData.sector}
- Descrizione attività: ${formData.description}
- Anni sul mercato: ${formData.yearsInMarket}
- Ricavi ultimi 12 mesi: ${formData.revenue}
- Processi principali: ${formData.mainProcesses}
- Strumenti attuali: ${formData.currentTools}
- Gestione multiple sedi/reparti: ${formData.multipleLocations}
- Gestione clienti: ${formData.customerManagement}
- Attività ripetitive: ${formData.repetitiveTasks}
- Report/KPI manuali: ${formData.manualReports}
- Aree per previsioni/analisi: ${formData.forecastAreas}
- Utilizzo AI suggerito: ${formData.aiAreas}

GENERA UN REPORT STRUTTURATO CON:

## 1. ANALISI SITUAZIONE ATTUALE
- Punti di forza identificati
- Criticità e inefficienze rilevate
- Opportunità di miglioramento immediate

## 2. SOLUZIONI ERP CONSIGLIATE
- Moduli ERP specifici per il settore
- Benefici attesi dall'implementazione
- ROI stimato e tempi di rientro

## 3. AUTOMAZIONI PRIORITARIE
- Processi automatizzabili identificati
- Tecnologie consigliate
- Risparmio di tempo stimato

## 4. IMPLEMENTAZIONI AI STRATEGICHE
- Aree di applicazione dell'AI più vantaggiose
- Soluzioni specifiche consigliate
- Impatto previsto sul business

## 5. ROADMAP IMPLEMENTAZIONE
- Fasi di implementazione consigliate
- Timeline suggerita
- Investimenti richiesti per fase

## 6. BENEFICI ECONOMICI ATTESI
- Risparmi operativi stimati
- Incremento di produttività
- ROI complessivo del progetto

Il report deve essere professionale, specifico per il settore, e includere dati quantitativi realistici. Usa un tono consulenziale esperto ma accessibile.
    `;

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
          { role: 'system', content: 'Sei un consulente esperto in digitalizzazione aziendale, ERP, AI e automazioni. Genera report professionali e dettagliati.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 3000,
        temperature: 0.7,
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