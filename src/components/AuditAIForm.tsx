import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Brain, FileText, Euro, Loader2, Download, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import resyneLogoNew from "@/assets/resyne-logo-new.png";

const formSchema = z.object({
  settore: z.string().min(1, "Seleziona un settore"),
  descrizioneAzienda: z.string().min(1, "Descrivi brevemente la tua azienda"),
  tempoMercato: z.string().min(1, "Seleziona da quanto tempo sei sul mercato"),
  ricavi: z.string().min(1, "Seleziona la fascia di ricavi"),
  processiPrincipali: z.array(z.string()).min(1, "Seleziona almeno un processo principale"),
  excelManuali: z.string().min(1, "Specifica se usate Excel o processi manuali"),
  excelManualiDettagli: z.string().optional(),
  strumentiLavoro: z.string().min(1, "Indica quali strumenti usate per lavorare"),
  sediReparti: z.string().min(1, "Specifica se avete più sedi o reparti"),
  sediRepartiDettagli: z.string().optional(),
  gestioneClienti: z.string().min(1, "Descrivi come gestisci i clienti"),
  attivitaRipetitive: z.string().min(1, "Specifica se ci sono attività ripetitive"),
  attivitaRipetitiveDettagli: z.string().optional(),
  reportKPI: z.string().min(1, "Specifica se avete bisogno di report/KPI"),
  reportKPIDettagli: z.string().optional(),
  previsioniAnalisi: z.string().min(1, "Specifica se servono previsioni o analisi"),
  previsioniAnalisiDettagli: z.string().optional(),
  assistenteAI: z.string().min(1, "Descrivi dove vedresti utile un assistente AI nella tua azienda"),
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
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    nomeAzienda: ''
  });
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      settore: "",
      descrizioneAzienda: "",
      tempoMercato: "",
      ricavi: "",
      processiPrincipali: [],
      excelManuali: "",
      excelManualiDettagli: "",
      strumentiLavoro: "",
      sediReparti: "",
      sediRepartiDettagli: "",
      gestioneClienti: "",
      attivitaRipetitive: "",
      attivitaRipetitiveDettagli: "",
      reportKPI: "",
      reportKPIDettagli: "",
      previsioniAnalisi: "",
      previsioniAnalisiDettagli: "",
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
        currentTools: `${values.strumentiLavoro}. Excel/manuali usati per: ${values.excelManuali === "SI" ? values.excelManualiDettagli || "Sì" : "No"}`,
        multipleLocations: values.sediReparti === "SI" ? values.sediRepartiDettagli || "Sì" : "No",
        customerManagement: values.gestioneClienti,
        repetitiveTasks: values.attivitaRipetitive === "SI" ? values.attivitaRipetitiveDettagli || "Sì" : "No",
        manualReports: values.reportKPI === "SI" ? values.reportKPIDettagli || "Sì" : "No",
        forecastAreas: values.previsioniAnalisi === "SI" ? values.previsioniAnalisiDettagli || "Sì" : "No",
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
        setShowContactForm(true); // Mostra il form per i dati di contatto
        toast({
          title: "Report generato!",
          description: "Inserisci i tuoi dati per scaricare il report in PDF.",
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

  const downloadReport = async () => {
    if (!generatedReport || !contactData.nome || !contactData.cognome || !contactData.email || !contactData.telefono || !contactData.nomeAzienda) {
      toast({
        title: "Dati mancanti",
        description: "Compila tutti i campi per scaricare il report.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Invia email al cliente con il report
      const formDataWithContact = {
        ...form.getValues(),
        contactInfo: {
          firstName: contactData.nome,
          lastName: contactData.cognome,
          email: contactData.email,
          phone: contactData.telefono,
          company: contactData.nomeAzienda
        }
      };

      console.log("Sending email to client with contact data:", formDataWithContact.contactInfo);
      
      const { data: emailResponse, error: emailError } = await supabase.functions.invoke('generate-audit-report', {
        body: {
          sector: formDataWithContact.settore,
          description: formDataWithContact.descrizioneAzienda,
          yearsInMarket: formDataWithContact.tempoMercato,  
          revenue: formDataWithContact.ricavi,
          mainProcesses: formDataWithContact.processiPrincipali.join(', '),
          currentTools: `${formDataWithContact.strumentiLavoro}. Excel/manuali usati per: ${formDataWithContact.excelManuali === "SI" ? formDataWithContact.excelManualiDettagli || "Sì" : "No"}`,
          multipleLocations: formDataWithContact.sediReparti === "SI" ? formDataWithContact.sediRepartiDettagli || "Sì" : "No",
          customerManagement: formDataWithContact.gestioneClienti,
          repetitiveTasks: formDataWithContact.attivitaRipetitive === "SI" ? formDataWithContact.attivitaRipetitiveDettagli || "Sì" : "No",
          manualReports: formDataWithContact.reportKPI === "SI" ? formDataWithContact.reportKPIDettagli || "Sì" : "No", 
          forecastAreas: formDataWithContact.previsioniAnalisi === "SI" ? formDataWithContact.previsioniAnalisiDettagli || "Sì" : "No",
          aiAreas: formDataWithContact.assistenteAI,
          contactInfo: formDataWithContact.contactInfo
        }
      });

      console.log("Edge function response:", { emailResponse, emailError });

      if (emailError) {
        console.error('Error calling edge function:', emailError);
        toast({
          title: "Errore",
          description: "Errore durante l'invio dell'email. Riprova più tardi.",
          variant: "destructive",
        });
        return;
      }

      if (emailResponse?.success) {
        toast({
          title: "Email inviata!",
          description: "Il report è stato inviato al tuo indirizzo email.",
        });
      } else {
        console.error('Edge function returned error:', emailResponse);
        toast({
          title: "Avviso",
          description: "Problema nell'invio dell'email, ma puoi comunque scaricare il report.",
          variant: "destructive",
        });
      }

      // Dinamicamente importa jsPDF
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF();
      
      // Colori Resyne (RGB convertiti da HSL)
      const resyneDark = [26, 22, 45]; // #1a162d
      const resyneGold = [202, 156, 42]; // #ca9c2a
      const resyneGray = [231, 231, 231]; // #e7e7e7
      
      // Background e decorazioni
      doc.setFillColor(resyneDark[0], resyneDark[1], resyneDark[2]);
      doc.rect(0, 0, 210, 60, 'F'); // Header background
      
      // Logo (converti immagine a base64 per jsPDF)
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = resyneLogoNew;
        });
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const logoDataUrl = canvas.toDataURL('image/png');
        
        // Aggiungi logo al PDF
        doc.addImage(logoDataUrl, 'PNG', 15, 10, 40, 15);
      } catch (logoError) {
        console.warn('Logo non disponibile, procedo senza:', logoError);
      }
      
      // Titolo principale
      doc.setTextColor(202, 156, 42); // Gold
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('AUDIT AI', 70, 25);
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text('REPORT PERSONALIZZATO', 70, 35);
      
      // Reset colore testo per il contenuto
      doc.setTextColor(26, 22, 45); // Dark
      
      // Sezione informazioni cliente
      doc.setFillColor(248, 249, 251); // Light gray background
      doc.rect(15, 70, 180, 25, 'F');
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Generato per:', 20, 80);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text(`${contactData.nome} ${contactData.cognome}`, 20, 87);
      doc.text(`${contactData.nomeAzienda}`, 20, 93);
      doc.text(`Email: ${contactData.email}`, 20, 99);
      doc.text(`Telefono: ${contactData.telefono}`, 120, 87);
      doc.text(`Data: ${new Date().toLocaleDateString('it-IT')}`, 120, 93);
      
      // Contenuto del report
      let currentY = 116;
      
      // Dividi il report in sezioni
      const reportSections = generatedReport.split(/\*\*(\d+\.\s[^*]+)\*\*/g);
      
      for (let i = 1; i < reportSections.length; i += 2) {
        const sectionTitle = reportSections[i];
        const sectionContent = reportSections[i + 1] || '';
        
        // Controlla se serve una nuova pagina
        if (currentY > 250) {
          doc.addPage();
          currentY = 30;
        }
        
        // Titolo sezione
        doc.setFillColor(resyneGold[0], resyneGold[1], resyneGold[2]);
        doc.rect(15, currentY - 5, 180, 8, 'F');
        
        doc.setTextColor(255, 255, 255); // White text
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(sectionTitle.trim(), 20, currentY);
        
        currentY += 15;
        
        // Contenuto sezione
        doc.setTextColor(26, 22, 45); // Dark text
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        
        const lines = doc.splitTextToSize(sectionContent.trim(), 170);
        const lineHeight = 5;
        
        for (const line of lines) {
          if (currentY > 270) {
            doc.addPage();
            currentY = 30;
          }
          doc.text(line, 20, currentY);
          currentY += lineHeight;
        }
        
        currentY += 10; // Spazio tra sezioni
      }
      
      // Footer con contatti Resyne
      const totalPages = doc.getNumberOfPages();
      
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        doc.setPage(pageNum);
        
        // Background footer
        doc.setFillColor(resyneDark[0], resyneDark[1], resyneDark[2]);
        doc.rect(0, 280, 210, 17, 'F');
        
        // Contatti
        doc.setTextColor(202, 156, 42); // Gold
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('RESYNE - Digital Innovation Partners', 20, 290);
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(255, 255, 255); // White
        doc.text('📞 +393911491256', 20, 295);
        doc.text('✉️ contact@re-syne.com', 110, 295);
        
        // Numero pagina
        doc.setTextColor(231, 231, 231); // Light gray
        doc.text(`Pagina ${pageNum} di ${totalPages}`, 170, 290);
      }
      
      // Salva il PDF
      doc.save(`audit-report-${contactData.cognome}-${new Date().getTime()}.pdf`);
      
      toast({
        title: "Download completato!",
        description: "Il report PDF è stato scaricato con successo.",
      });
      
      // Reset del form
      closeAndReset();
      
    } catch (error) {
      console.error('Errore durante la creazione del PDF:', error);
      toast({
        title: "Errore",
        description: "Errore durante la creazione del PDF. Riprova.",
        variant: "destructive",
      });
    }
  };

  const closeAndReset = () => {
    setOpen(false);
    setGeneratedReport(null);
    setShowContactForm(false);
    setContactData({ nome: '', cognome: '', email: '', telefono: '', nomeAzienda: '' });
    form.reset();
    setStep(1);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Mostra il form per i dati di contatto se il report è pronto
  if (generatedReport && showContactForm) {
    return (
      <Dialog open={open} onOpenChange={closeAndReset}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Report Pronto!
            </DialogTitle>
            <DialogDescription>
              Inserisci i tuoi dati per scaricare il report PDF <strong>GRATUITO</strong> del valore di <strong>€249,00</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                value={contactData.nome}
                onChange={(e) => setContactData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Il tuo nome"
              />
            </div>
            <div>
              <Label htmlFor="cognome">Cognome *</Label>
              <Input
                id="cognome"
                value={contactData.cognome}
                onChange={(e) => setContactData(prev => ({ ...prev, cognome: e.target.value }))}
                placeholder="Il tuo cognome"
              />
            </div>
            <div>
              <Label htmlFor="nomeAzienda">Nome Azienda *</Label>
              <Input
                id="nomeAzienda"
                value={contactData.nomeAzienda}
                onChange={(e) => setContactData(prev => ({ ...prev, nomeAzienda: e.target.value }))}
                placeholder="Nome della tua azienda"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={contactData.email}
                onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="la-tua-email@esempio.com"
              />
            </div>
            <div>
              <Label htmlFor="telefono">Telefono *</Label>
              <Input
                id="telefono"
                type="tel"
                value={contactData.telefono}
                onChange={(e) => setContactData(prev => ({ ...prev, telefono: e.target.value }))}
                placeholder="+39 123 456 7890"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={downloadReport} 
                className="flex-1 flex items-center gap-2"
                disabled={!contactData.nome || !contactData.cognome || !contactData.email || !contactData.telefono || !contactData.nomeAzienda}
              >
                <Download className="w-4 h-4" />
                Scarica Report PDF
              </Button>
              <Button variant="outline" onClick={closeAndReset}>
                Annulla
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Visualizza il report se è stato generato ma non ancora scaricato
  if (generatedReport && !showContactForm) {
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
              Il tuo report personalizzato <strong>GRATUITO</strong> del valore di <strong>€249,00</strong> è pronto per il download
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedReport}</pre>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowContactForm(true)} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Scarica PDF
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
                        <FormLabel>Usate Excel o fogli manuali che vi creano rallentamenti? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SI">SÌ</SelectItem>
                            <SelectItem value="NO">NO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("excelManuali") === "SI" && (
                    <FormField
                      control={form.control}
                      name="excelManualiDettagli"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dove precisamente?</FormLabel>
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
                  )}

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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SI">SÌ</SelectItem>
                            <SelectItem value="NO">NO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("sediReparti") === "SI" && (
                    <FormField
                      control={form.control}
                      name="sediRepartiDettagli"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrivi la struttura</FormLabel>
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
                  )}

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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SI">SÌ</SelectItem>
                            <SelectItem value="NO">NO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("attivitaRipetitive") === "SI" && (
                    <FormField
                      control={form.control}
                      name="attivitaRipetitiveDettagli"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quali attività?</FormLabel>
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
                  )}
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SI">SÌ</SelectItem>
                            <SelectItem value="NO">NO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("reportKPI") === "SI" && (
                    <FormField
                      control={form.control}
                      name="reportKPIDettagli"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quali report/KPI?</FormLabel>
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
                  )}

                  <FormField
                    control={form.control}
                    name="previsioniAnalisi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ci sono aree dove vi servirebbero previsioni o analisi automatiche? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SI">SÌ</SelectItem>
                            <SelectItem value="NO">NO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("previsioniAnalisi") === "SI" && (
                    <FormField
                      control={form.control}
                      name="previsioniAnalisiDettagli"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quali aree?</FormLabel>
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
                  )}

                  <FormField
                    control={form.control}
                    name="assistenteAI"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dove vedreste utile un assistente AI nella vostra azienda? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Es. Customer care per risposte automatiche, analisi documenti e contratti, generazione preventivi personalizzati, supporto vendite con suggerimenti prodotti, assistenza tecnica 24/7, automazione processo ordini..."
                            className="min-h-[120px]"
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