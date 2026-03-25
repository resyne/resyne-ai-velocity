import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Check, Clock, CreditCard, Euro, Landmark, Printer, Shield, Building2, Users, FileText, Bell, BarChart3, Settings, Search, Activity, Wrench, GraduationCap, Stethoscope, FolderArchive, CalendarClock, Cpu, Layout, Database, Lock, TestTube2, BookOpen, Headphones } from "lucide-react";
import equipeResyneLogo from "@/assets/equipe-resyne-logo.png";
import { QuotePegasoPrintLayout } from "@/components/QuotePegasoPrintLayout";

interface DevelopmentItem {
  id: string;
  number: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  category: string;
}

const developmentItems: DevelopmentItem[] = [
  {
    id: "analisi", number: 1, name: "Analisi funzionale e progettazione",
    description: "Raccolta processi operativi, definizione moduli, progettazione logica, ruoli utente e flussi dashboard.",
    icon: <Search className="h-4 w-4" />, category: "Progettazione",
    features: ["Analisi processi interni", "Definizione moduli software", "Progettazione logica piattaforma", "Definizione ruoli utente", "Flussi dashboard Pegaso e cliente"]
  },
  {
    id: "aziende", number: 2, name: "Anagrafica aziende",
    description: "Gestione aziende clienti con dati amministrativi, sedi operative, referenti e classificazione per rischio.",
    icon: <Building2 className="h-4 w-4" />, category: "Moduli Anagrafici",
    features: ["Inserimento e modifica aziende", "Gestione sedi operative", "Gestione referenti aziendali", "Classificazione per categoria e rischio"]
  },
  {
    id: "partner", number: 3, name: "Anagrafica partner",
    description: "Gestione partner collegati con assegnazione aziende e suddivisione competenze per area.",
    icon: <Users className="h-4 w-4" />, category: "Moduli Anagrafici",
    features: ["Registrazione partner", "Associazione partner-aziende", "Visibilità dati per partner", "Stato attivo/non attivo"]
  },
  {
    id: "dipendenti", number: 4, name: "Anagrafica dipendenti",
    description: "Gestione lavoratori con informazioni per sicurezza sul lavoro e relative scadenze.",
    icon: <Users className="h-4 w-4" />, category: "Moduli Anagrafici",
    features: ["Anagrafica completa", "Mansione e reparto", "Collegamento scadenze formative e sanitarie", "Storico dipendente"]
  },
  {
    id: "formazione", number: 5, name: "Gestione formazione e corsi",
    description: "Monitoraggio formazione obbligatoria con tracciamento corsi, aggiornamenti e validità.",
    icon: <GraduationCap className="h-4 w-4" />, category: "Moduli Operativi",
    features: ["Inserimento corsi effettuati", "Associazione corso-dipendente", "Calcolo automatico scadenza", "Stato: valida, in scadenza, scaduta"]
  },
  {
    id: "sorveglianza", number: 6, name: "Sorveglianza sanitaria",
    description: "Gestione visite mediche e obblighi sanitari collegati ai dipendenti.",
    icon: <Stethoscope className="h-4 w-4" />, category: "Moduli Operativi",
    features: ["Registrazione visite mediche", "Tipologia visita ed esito", "Data prossima visita", "Monitoraggio visite in scadenza"]
  },
  {
    id: "documenti-aziendali", number: 7, name: "Documenti aziendali",
    description: "Archiviazione e gestione documenti obbligatori relativi alle aziende e adempimenti normativi.",
    icon: <FileText className="h-4 w-4" />, category: "Moduli Operativi",
    features: ["Caricamento documenti", "Classificazione per tipologia", "Data emissione e scadenza", "Stato: attivi, in scadenza, scaduti"]
  },
  {
    id: "attrezzature", number: 8, name: "Attrezzature e impianti",
    description: "Tracciamento attrezzature e dispositivi soggetti a verifiche periodiche.",
    icon: <Wrench className="h-4 w-4" />, category: "Moduli Operativi",
    features: ["Anagrafica attrezzature", "Registrazione verifiche", "Gestione scadenze controllo", "Storico verifiche"]
  },
  {
    id: "motore-scadenze", number: 9, name: "Motore centralizzato scadenze",
    description: "Aggregazione e organizzazione di tutte le scadenze provenienti dai diversi moduli.",
    icon: <CalendarClock className="h-4 w-4" />, category: "Motore Scadenze",
    features: ["Vista unificata scadenze", "Categorizzazione per tipologia", "Ordinamento per priorità", "Visualizzazione per dashboard"]
  },
  {
    id: "calcolo-scadenze", number: 10, name: "Calcolo automatico scadenze",
    description: "Generazione e aggiornamento automatico scadenze da date di emissione, validità o periodicità.",
    icon: <Cpu className="h-4 w-4" />, category: "Motore Scadenze",
    features: ["Calcolo automatico date future", "Periodicità annuale/pluriennale/mensile", "Aggiornamento stato automatico", "Calcolo da corsi, visite, documenti"]
  },
  {
    id: "notifiche", number: 11, name: "Sistema notifiche e alert",
    description: "Avvisi automatici per scadenze imminenti, prossime o già scadute.",
    icon: <Bell className="h-4 w-4" />, category: "Motore Scadenze",
    features: ["Notifiche in dashboard", "Logica di preavviso", "Alert visivi per priorità", "Predisposizione notifiche email"]
  },
  {
    id: "dashboard-pegaso", number: 12, name: "Dashboard amministrativa Pegaso",
    description: "Visione completa del portafoglio aziende, situazioni normative e priorità operative.",
    icon: <BarChart3 className="h-4 w-4" />, category: "Dashboard",
    features: ["Panoramica aziende", "Scadenze imminenti e scadute", "Stato documentale e formativo", "Indicatori di compliance"]
  },
  {
    id: "dashboard-partner", number: 13, name: "Dashboard partner",
    description: "Area riservata ai partner con accesso limitato alle sole aziende di competenza.",
    icon: <Layout className="h-4 w-4" />, category: "Dashboard",
    features: ["Aziende assegnate", "Consultazione scadenze e documenti", "Filtri e ricerca", "Separazione dati"]
  },
  {
    id: "dashboard-cliente", number: 14, name: "Dashboard cliente condivisibile",
    description: "Dashboard esterna per l'azienda cliente con visualizzazione sintetica delle posizioni.",
    icon: <Activity className="h-4 w-4" />, category: "Dashboard",
    features: ["Stato aziendale sintetico", "Elenco scadenze e dipendenti", "Accesso documenti", "Stato conforme/in scadenza/scaduto"]
  },
  {
    id: "ruoli-permessi", number: 15, name: "Ruoli e permessi",
    description: "Sistema di autorizzazioni per differenziare visibilità informazioni per tipo utente.",
    icon: <Shield className="h-4 w-4" />, category: "Sistema",
    features: ["Profilo admin Pegaso", "Profilo partner", "Profilo consulente", "Profilo cliente finale"]
  },
  {
    id: "archivio-digitale", number: 16, name: "Archivio digitale e file",
    description: "Struttura di archiviazione documentale con accesso ordinato e consultabile.",
    icon: <FolderArchive className="h-4 w-4" />, category: "Sistema",
    features: ["Gestione file caricati", "Collegamento a dipendente/azienda", "Archivio consultabile", "Storico documentale"]
  },
  {
    id: "ricerca-filtri", number: 17, name: "Ricerca e filtri avanzati",
    description: "Strumenti di ricerca rapida per aziende, dipendenti, documenti e scadenze.",
    icon: <Search className="h-4 w-4" />, category: "Sistema",
    features: ["Ricerca per parole chiave", "Filtri per stato e data", "Filtri per tipologia", "Filtri per partner e azienda"]
  },
  {
    id: "indicatori", number: 18, name: "Indicatori di conformità",
    description: "Sistema di sintesi per lettura immediata del livello di conformità aziendale.",
    icon: <Activity className="h-4 w-4" />, category: "Sistema",
    features: ["Stato generale compliance", "Indicatori visivi", "Riepilogo obblighi assolti", "Riepilogo criticità aperte"]
  },
  {
    id: "ui-ux", number: 19, name: "UI/UX design e interfaccia",
    description: "Progettazione e sviluppo interfaccia utente con attenzione a semplicità e leggibilità.",
    icon: <Layout className="h-4 w-4" />, category: "Sviluppo Tecnico",
    features: ["Layout dashboard", "Menu e navigazione", "Pagine elenco e dettaglio", "Interfaccia responsive"]
  },
  {
    id: "backend", number: 20, name: "Back-end e database",
    description: "Architettura software, database relazionale e logiche applicative.",
    icon: <Database className="h-4 w-4" />, category: "Sviluppo Tecnico",
    features: ["Architettura software", "Database relazionale", "Logiche server", "Connessioni tra moduli"]
  },
  {
    id: "auth-sicurezza", number: 21, name: "Autenticazione e sicurezza",
    description: "Logiche di sicurezza per accesso al sistema e protezione dati.",
    icon: <Lock className="h-4 w-4" />, category: "Sviluppo Tecnico",
    features: ["Login utenti", "Protezione aree riservate", "Gestione sessioni", "Separazione dati per ruolo"]
  },
  {
    id: "test-collaudo", number: 22, name: "Test, collaudo e messa online",
    description: "Verifica funzionale, correzione anomalie e pubblicazione ambiente online.",
    icon: <TestTube2 className="h-4 w-4" />, category: "Avviamento",
    features: ["Test funzionali", "Verifica flussi principali", "Correzione anomalie", "Pubblicazione e avvio"]
  },
  {
    id: "formazione-utilizzo", number: 23, name: "Formazione iniziale",
    description: "Accompagnamento iniziale per utilizzo corretto della piattaforma.",
    icon: <BookOpen className="h-4 w-4" />, category: "Avviamento",
    features: ["Spiegazione moduli", "Formazione operativa base", "Supporto avviamento"]
  },
  {
    id: "manutenzione", number: 24, name: "Manutenzione e assistenza",
    description: "Servizio continuativo per stabilità, aggiornamenti e supporto post-consegna.",
    icon: <Headphones className="h-4 w-4" />, category: "Avviamento",
    features: ["Assistenza tecnica", "Correzione bug", "Aggiornamenti minori", "Gestione hosting"]
  },
];

// Pricing model:
// anticipo 8000 → canone 420/mese → total 18080
// anticipo 10000 → canone 330/mese → total 17920
// Linear interpolation for monthly fee
const MIN_ANTICIPO = 8000;
const MAX_ANTICIPO = 10000;
const MONTHLY_AT_MIN = 476;
const MONTHLY_AT_MAX = 393;
const DURATION_MONTHS = 24;

export default function QuotePegasoDesign() {
  const [anticipo, setAnticipo] = useState(10000);

  const monthlyFee = useMemo(() => {
    const ratio = (anticipo - MIN_ANTICIPO) / (MAX_ANTICIPO - MIN_ANTICIPO);
    return Math.round(MONTHLY_AT_MIN - ratio * (MONTHLY_AT_MIN - MONTHLY_AT_MAX));
  }, [anticipo]);

  const totalProject = useMemo(() => {
    return anticipo + monthlyFee * DURATION_MONTHS;
  }, [anticipo, monthlyFee]);

  const isRecommended = anticipo === 10000;

  // Group items by category
  const groupedItems = useMemo(() => {
    return developmentItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, DevelopmentItem[]>);
  }, []);

  const handlePrint = () => window.print();

  return (
    <>
      <Helmet>
        <title>Preventivo Pegaso Design ERP | RESYNE</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20 pb-32 lg:pb-16 px-3 sm:px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-12">
              <Badge className="mb-3 sm:mb-4 bg-resyne-gold/20 text-resyne-gold border-resyne-gold/30 text-xs sm:text-sm">
                Preventivo Personalizzato
              </Badge>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                ERP <span className="text-resyne-gold">Pegaso Design</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-2">
                Piattaforma gestionale per sicurezza sul lavoro, adempimenti normativi e conformità aziendale
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
              {/* Development items */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <Card key={category} className="glass-card border-border/30">
                    <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
                      <CardTitle className="text-base sm:text-lg font-subtitle text-resyne-gold flex items-center gap-2">
                        {category}
                        <Badge variant="outline" className="text-xs font-mono">
                          {items.length} {items.length === 1 ? "voce" : "voci"}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className="p-3 sm:p-4 rounded-lg border border-resyne-gold/20 bg-resyne-gold/5"
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-resyne-gold/20 text-resyne-gold shrink-0 mt-0.5">
                              <span className="text-xs font-bold font-mono">{item.number}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-subtitle font-semibold text-sm sm:text-base">{item.name}</h3>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2 sm:line-clamp-none">
                                {item.description}
                              </p>
                              {item.features.length > 0 && (
                                <ul className="hidden sm:block mt-3 space-y-1">
                                  {item.features.map((feature, idx) => (
                                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <Check className="h-3 w-3 text-resyne-gold mt-0.5 shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pricing sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card className="glass-card border-resyne-gold/30">
                    <CardHeader className="text-center pb-4">
                      <img
                        src={equipeResyneLogo}
                        alt="Equipe Resyne"
                        className="h-16 mx-auto mb-2 print:h-20"
                      />
                      <CardTitle className="flex items-center justify-center gap-2">
                        <Calculator className="h-5 w-5 text-resyne-gold" />
                        Riepilogo Preventivo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Project summary */}
                      <div>
                        <Label className="text-muted-foreground text-sm">Progetto completo</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          24 voci di sviluppo · Durata {DURATION_MONTHS} mesi
                        </p>
                        <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Totale progetto</span>
                            <span className="text-2xl font-bold font-mono">
                              €{totalProject.toLocaleString('it-IT')}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">IVA esclusa</p>
                        </div>
                      </div>

                      {/* Slider anticipo */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center gap-2">
                            <Euro className="h-4 w-4 text-resyne-gold" />
                            Anticipo
                          </Label>
                          <span className="font-mono font-semibold text-resyne-gold">
                            €{anticipo.toLocaleString('it-IT')}
                          </span>
                        </div>
                        <Slider
                          value={[anticipo]}
                          onValueChange={(value) => setAnticipo(value[0])}
                          min={MIN_ANTICIPO}
                          max={MAX_ANTICIPO}
                          step={500}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>€{MIN_ANTICIPO.toLocaleString('it-IT')}</span>
                          <span>€{MAX_ANTICIPO.toLocaleString('it-IT')}</span>
                        </div>
                      </div>

                      {/* Recommended badge */}
                      {isRecommended && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-resyne-gold/10 border border-resyne-gold/30">
                          <Check className="h-4 w-4 text-resyne-gold shrink-0" />
                          <span className="text-xs text-resyne-gold font-medium">Opzione consigliata</span>
                        </div>
                      )}

                      {/* Upfront */}
                      <div className="p-4 rounded-lg bg-resyne-gold/10 border border-resyne-gold/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Euro className="h-4 w-4 text-resyne-gold" />
                          <Label className="text-sm">Pagamento iniziale</Label>
                        </div>
                        <p className="text-3xl font-bold font-mono text-resyne-gold">
                          €{anticipo.toLocaleString('it-IT')}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Landmark className="h-3 w-3" />
                          <span>Bonifico bancario</span>
                        </div>
                      </div>

                      {/* Monthly */}
                      <div className="p-4 rounded-lg bg-tiffany/10 border border-tiffany/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="h-4 w-4 text-tiffany" />
                          <Label className="text-sm">Canone mensile</Label>
                        </div>
                        <p className="text-3xl font-bold font-mono text-tiffany">
                          €{monthlyFee.toLocaleString('it-IT')}<span className="text-lg">/mese</span>
                        </p>
                        <div className="mt-3 pt-3 border-t border-tiffany/20 space-y-1 text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Durata minima:</span>
                            <span className="font-mono font-semibold">{DURATION_MONTHS} mesi</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Totale canoni:</span>
                            <span className="font-mono">€{(monthlyFee * DURATION_MONTHS).toLocaleString('it-IT')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-tiffany/20 text-xs text-muted-foreground">
                          <CreditCard className="h-3 w-3" />
                          <span>Addebito automatico su carta di credito</span>
                        </div>
                      </div>

                      {/* Formula */}
                      <div className="p-3 rounded-lg bg-muted/30 border border-border/30 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Formula di pagamento</p>
                        <p className="font-mono text-sm font-semibold">
                          €{anticipo.toLocaleString('it-IT')} + (€{monthlyFee} × {DURATION_MONTHS}) = <span className="text-resyne-gold">€{totalProject.toLocaleString('it-IT')}</span>
                        </p>
                      </div>

                      {/* Delivery */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-tech-blue" />
                          <span className="text-sm font-medium">Tempi di consegna</span>
                        </div>
                        <Badge variant="outline" className="font-mono">
                          12–16 settimane
                        </Badge>
                      </div>

                      {/* CTA */}
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 no-print"
                        size="lg"
                        onClick={handlePrint}
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Scarica preventivo
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Incentives */}
            <Card className="mt-8 bg-tiffany/5 border-tiffany/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-subtitle text-tiffany flex items-center gap-2">
                  <span>★</span>
                  Agevolazioni e Incentivi Fiscali
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg border border-tiffany/20">
                    <h4 className="font-semibold text-tiffany mb-2">
                      Industria 4.0 – Iperammortamento 180%
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Investimenti in beni strumentali immateriali (software 4.0) funzionali ai processi di trasformazione 4.0.
                      Include software, sistemi, piattaforme e applicazioni (come ERP) necessari per la gestione e il coordinamento.
                    </p>
                    <Badge variant="outline" className="bg-tiffany/10 text-tiffany border-tiffany/30">
                      Iperammortamento 180%
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-3">
                      Rif: Allegato B – L. 232/2016 e L. 205/2017 |{" "}
                      <a href="https://www.mimit.gov.it/images/stories/documenti/Allegato_B_2016.pdf" target="_blank" rel="noopener noreferrer" className="text-tiffany hover:underline">
                        Vedi Allegato B MiMIT →
                      </a>
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-tiffany/20">
                    <h4 className="font-semibold text-tiffany mb-2">
                      Nuova Sabatini – Beni Strumentali
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Contributo MiMIT a favore delle PMI per l'acquisto di beni strumentali, inclusi software e tecnologie digitali.
                    </p>
                    <Badge variant="outline" className="bg-tiffany/10 text-tiffany border-tiffany/30">
                      Contributo fino al 7,7%
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-3">
                      Rif: MiSE/MiMIT – Beni Strumentali | Finanziamenti fino a 4M€
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-tiffany/20">
                    <h4 className="font-semibold text-tiffany mb-2">
                      Voucher Cloud & Cyber Security
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Contributo a fondo perduto MIMIT pari al 50% delle spese ammissibili per servizi cloud (SaaS, ERP, storage) e cyber security. Fino a €20.000 per soggetto.
                    </p>
                    <Badge variant="outline" className="bg-tiffany/10 text-tiffany border-tiffany/30">
                      50% a fondo perduto – max €20.000
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-3">
                      Rif: DM MIMIT 2025 – Regime De Minimis | Spesa minima €4.000
                    </p>
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4 pt-4 border-t border-tiffany/20">
                  Le agevolazioni sopra indicate sono soggette a requisiti specifici. Contattaci per una consulenza personalizzata.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Mobile fixed bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border/50 p-3 z-50 no-print">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                24 voci · €{monthlyFee}/mese × {DURATION_MONTHS} mesi
              </p>
              <p className="text-lg font-bold font-mono text-resyne-gold truncate">
                €{anticipo.toLocaleString('it-IT')} anticipo
              </p>
            </div>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              size="sm"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-1" />
              Scarica
            </Button>
          </div>
        </div>

        <Footer />
      </div>

      <QuotePegasoPrintLayout
        items={developmentItems}
        anticipo={anticipo}
        monthlyFee={monthlyFee}
        totalProject={totalProject}
        durationMonths={DURATION_MONTHS}
      />
    </>
  );
}
