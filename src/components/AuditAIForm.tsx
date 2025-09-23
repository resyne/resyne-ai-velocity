import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Brain, FileText, Euro, Loader2, Download, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  settore: z.string().min(1, "Seleziona un settore"),
  descrizioneAzienda: z.string().min(10, "Descrivi brevemente la tua azienda (minimo 10 caratteri)"),
  tempoMercato: z.string().min(1, "Seleziona da quanto tempo sei sul mercato"),
  ricavi: z.string().min(1, "Seleziona la fascia di ricavi"),
  processiPrincipali: z.array(z.string()).min(1, "Seleziona almeno un processo principale"),
  excelManuali: z.string().min(5, "Descrivi dove usi Excel o processi manuali"),
  strumentiLavoro: z.string().min(5, "Indica quali strumenti usate per lavorare"),
  sediReparti: z.string().min(5, "Descrivi se avete più sedi o reparti"),
  gestioneClienti: z.string().min(5, "Descrivi come gestisci i clienti"),
  attivitaRipetitive: z.string().min(5, "Descrivi le attività ripetitive che vi fanno perdere tempo"),
  reportKPI: z.string().min(5, "Descrivi i report/KPI che richiedono lavoro manuale"),
  previsioniAnalisi: z.string().min(5, "Descrivi dove servirebbero previsioni automatiche"),
  assistenteAI: z.string().min(5, "Descrivi dove vedresti utile un assistente AI"),
});

type FormValues = z.infer<typeof formSchema>;

const settoriOptions = [
  "Manifatturiero",
  "Commercio al dettaglio",
  "Commercio all'ingrosso",
  "Servizi professionali",
  "Edilizia",
  "Ristorazione",
  "Logistica e trasporti",
  "Sanità",
  "Tecnologia",
  "Automotive",
  "Moda e tessile",
  "Alimentare",
  "Altro"
];

const tempoMercatoOptions = [
  "Meno di 1 anno",
  "1-3 anni",
  "3-5 anni",
  "5-10 anni",
  "10-20 anni",
  "Oltre 20 anni"
];

const ricaviOptions = [
  "Sotto i 100k €",
  "100k - 500k €",
  "500k - 1M €",
  "1M - 5M €",
  "5M - 10M €",
  "Oltre 10M €"
];

const processiOptions = [
  { id: "vendite", label: "Vendite" },
  { id: "produzione", label: "Produzione" },
  { id: "logistica", label: "Logistica" },
  { id: "servizi", label: "Servizi clienti" },
  { id: "marketing", label: "Marketing" },
  { id: "amministrazione", label: "Amministrazione" },
  { id: "risorse-umane", label: "Risorse Umane" },
  { id: "acquisti", label: "Acquisti" }
];

interface AuditAIFormProps {
  children: React.ReactNode;
}

export function AuditAIForm({ children }: AuditAIFormProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      settore: "",
      descrizioneAzienda: "",
      tempoMercato: "",
      ricavi: "",
      processiPrincipali: [],
      excelManuali: "",
      strumentiLavoro: "",
      sediReparti: "",
      gestioneClienti: "",
      attivitaRipetitive: "",
      reportKPI: "",
      previsioniAnalisi: "",
      assistenteAI: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsGenerating(true);
    try {
      // Converte i dati del form nel formato richiesto dall'edge function
      const formDataForAI = {
        sector: values.settore,
        description: values.descrizioneAzienda,
        yearsInMarket: values.tempoMercato,
        revenue: values.ricavi,
        mainProcesses: values.processiPrincipali.join(', '),
        currentTools: `${values.strumentiLavoro}. Excel/manuali usati per: ${values.excelManuali}`,
        multipleLocations: values.sediReparti,
        customerManagement: values.gestioneClienti,
        repetitiveTasks: values.attivitaRipetitive,
        manualReports: values.reportKPI,
        forecastAreas: values.previsioniAnalisi,
        aiAreas: values.assistenteAI,
      };

      console.log("Sending data to AI:", formDataForAI);

      const { data, error } = await supabase.functions.invoke('generate-audit-report', {
        body: formDataForAI
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Errore nella chiamata alla funzione');
      }

      if (data?.success) {
        setGeneratedReport(data.report);
        toast({
          title: "Report generato!",
          description: "Il tuo report personalizzato è pronto per il download.",
        });
      } else {
        throw new Error(data?.error || 'Errore nella generazione del report');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Errore",
        description: "Errore durante la generazione del report. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = () => {
    if (!generatedReport) return;
    
    const blob = new Blob([generatedReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const closeAndReset = () => {
    setOpen(false);
    setGeneratedReport(null);
    form.reset();
    setStep(1);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Visualizza il report se è stato generato
  if (generatedReport) {
    return (
      <Dialog open={open} onOpenChange={closeAndReset}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Report Audit AI Completato
            </DialogTitle>
            <DialogDescription>
              Il tuo report personalizzato del valore di €249,00 è pronto per il download
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedReport}</pre>
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadReport} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Scarica Report
              </Button>
              <Button variant="outline" onClick={closeAndReset}>
                Chiudi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-6 h-6 text-tech-purple" />
            Audit AI - Report Personalizzato
          </DialogTitle>
          <DialogDescription>
            L'AI analizzerà il tuo business e ti consegnerà un report dettagliato (dal valore di €249,00 - GRATIS) 
            per le principali funzioni ERP consigliate, Automazioni e Soluzioni AI applicabili.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= i ? 'bg-tech-purple text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {i}
                </div>
                {i < 3 && <div className={`w-16 h-0.5 ${step > i ? 'bg-tech-purple' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Informazioni Generali
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="settore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Settore di attività *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona il tuo settore" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {settoriOptions.map((settore) => (
                                <SelectItem key={settore} value={settore}>
                                  {settore}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tempoMercato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Da quanto tempo sei sul mercato? *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tempoMercatoOptions.map((tempo) => (
                                <SelectItem key={tempo} value={tempo}>
                                  {tempo}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="descrizioneAzienda"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Di cosa si occupa la tua azienda? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descrivi brevemente la tua attività, i prodotti/servizi offerti..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="ricavi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Euro className="w-4 h-4" />
                            Ricavi ultimi 12 mesi? *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona fascia" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ricaviOptions.map((ricavo) => (
                                <SelectItem key={ricavo} value={ricavo}>
                                  {ricavo}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="processiPrincipali"
                      render={() => (
                        <FormItem>
                          <FormLabel>Processi principali che generano valore *</FormLabel>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {processiOptions.map((processo) => (
                              <FormField
                                key={processo.id}
                                control={form.control}
                                name="processiPrincipali"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={processo.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(processo.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, processo.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== processo.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {processo.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Processi e Gestione Attuale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="excelManuali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dove oggi usate Excel o fogli manuali che vi creano rallentamenti? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Es. Gestione inventario, calcolo costi, pianificazione produzione..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="strumentiLavoro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quali programmi o strumenti usate oggi per lavorare? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Es. Excel, gestionale esistente, software specifici del settore..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sediReparti"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avete più sedi o reparti che devono lavorare insieme e scambiarsi dati? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Es. Sede principale e filiali, reparti produzione/vendite/amministrazione..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gestioneClienti"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Come gestite i clienti (lead, preventivi, assistenza)? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Es. CRM esistente, Excel, email, telefono..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attivitaRipetitive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ci sono attività ripetitive che vi fanno perdere tempo ogni giorno? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Es. Inserimento dati manuale, invio email ripetitive, aggiornamento scorte..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Analisi e Automazione</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="reportKPI"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avete bisogno di report/KPI che oggi richiedono molto lavoro manuale? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Es. Report vendite mensili, analisi margini, performance prodotti..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="previsioniAnalisi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ci sono aree dove vi servirebbero previsioni o analisi automatiche? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Es. Previsioni vendite, gestione scorte, analisi cash flow..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="assistenteAI"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dove vedreste utile un assistente AI? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Es. Customer care, analisi documenti, generazione preventivi, supporto vendite..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between pt-6">
              <div>
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Indietro
                  </Button>
                )}
              </div>
              <div className="space-x-2">
                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Avanti
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isGenerating}
                    className="bg-tech-purple text-white hover:bg-tech-purple/90"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generazione in corso...
                      </>
                    ) : (
                      'Genera Report AI Gratuito (€249,00)'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}