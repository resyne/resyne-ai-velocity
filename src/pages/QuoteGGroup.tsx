import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Check, Clock, CreditCard, Euro, HardDrive, Landmark, Percent, Printer, TrendingDown, Truck, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import equipeResyneLogo from "@/assets/equipe-resyne-logo.png";
import { QuotePrintLayout } from "@/components/QuotePrintLayout";

// Opzioni storage
const STORAGE_OPTIONS = [
  { id: "50gb", label: "50 GB", price: 0, description: "Incluso" },
  { id: "100gb", label: "100 GB", price: 10, description: "€10/mese" },
  { id: "250gb", label: "250 GB", price: 30, description: "€30/mese" },
  { id: "500gb", label: "500 GB", price: 50, description: "€50/mese" },
  { id: "1tb", label: "1 TB", price: 80, description: "€80/mese" },
];

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  monthlyMultiplier: number;
  category: string;
  features?: string[];
}

const defaultServices: Service[] = [
  // 1. Dashboard
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Panoramica generale con KPI principali e accesso rapido alle informazioni",
    basePrice: 2500,
    monthlyMultiplier: 0.008,
    category: "Moduli Core",
    features: [
      "Statistiche generali: cantieri, dipendenti, mezzi, scadenze",
      "Feed attività e cronologia aggiornamenti",
      "Azioni rapide alle operazioni frequenti",
      "Panoramica cantieri con avanzamento",
      "Assistente AI per analisi e suggerimenti"
    ]
  },
  // 2. Cantieri
  {
    id: "cantieri",
    name: "Cantieri",
    description: "Gestione completa cantieri con SAL, budget, presenze, risorse e documenti",
    basePrice: 8000,
    monthlyMultiplier: 0.012,
    category: "Moduli Core",
    features: [
      "Lista cantieri con filtri e ricerca",
      "Dettaglio 360°: SAL & Budget, Presenze GPS, Risorse",
      "Gestione materiali e inventario cantiere",
      "Documenti: contratti, progetti, permessi",
      "Sicurezza e formazione cantiere",
      "Diario cantiere con note e storico",
      "Cronoprogrammi con Gantt e milestone"
    ]
  },
  // 3. Mezzi & Attrezzature
  {
    id: "mezzi",
    name: "Mezzi & Attrezzature",
    description: "Parco mezzi, scadenze e manutenzioni (tracking GPS richiede integrazione Mapbox)",
    basePrice: 6000,
    monthlyMultiplier: 0.008,
    category: "Moduli Core",
    features: [
      "Parco mezzi con schede tecniche e stato",
      "Scadenze: assicurazione, revisione, bollo",
      "Registro manutenzioni e storico costi",
      "Alert e promemoria automatici"
    ]
  },
  // 4. Fornitori & Acquisti
  {
    id: "fornitori",
    name: "Fornitori & Acquisti",
    description: "Anagrafica fornitori, listini, confronto prezzi e gestione ordini",
    basePrice: 4500,
    monthlyMultiplier: 0.01,
    category: "Moduli Operativi",
    features: [
      "Anagrafica fornitori e categorie",
      "Listini prezzi con import/export",
      "Confronto prezzi e analisi convenienza",
      "Ordini acquisto e tracking consegne",
      "Gestione DDT e valutazione fornitori"
    ]
  },
  // 5. Magazzino
  {
    id: "magazzino",
    name: "Magazzino",
    description: "Inventario multi-magazzino, DPI, movimenti e riordino automatico",
    basePrice: 5000,
    monthlyMultiplier: 0.01,
    category: "Moduli Operativi",
    features: [
      "Gestione multi-magazzino con ubicazioni",
      "Anagrafica articoli e giacenze",
      "DPI e vestiario con assegnazione dipendenti",
      "Movimenti carico/scarico e trasferimenti",
      "Soglie riordino automatico"
    ]
  },
  // 6. Personale
  {
    id: "personale",
    name: "Personale",
    description: "Anagrafica dipendenti, presenze GPS, ferie e buste paga",
    basePrice: 5500,
    monthlyMultiplier: 0,
    category: "Moduli Operativi",
    features: [
      "Anagrafica completa con contratti e qualifiche",
      "Presenze con mappa GPS per cantiere",
      "Richieste ferie/permessi con approvazione",
      "Archivio buste paga e cedolini",
      "Assegnazioni cantiere e certificazioni",
      "Costo variabile: €2/mese per dipendente"
    ]
  },
  // 7. Sicurezza
  {
    id: "sicurezza",
    name: "Sicurezza",
    description: "Scadenze critiche, visite mediche, formazione e documenti obbligatori",
    basePrice: 4000,
    monthlyMultiplier: 0.008,
    category: "Moduli Operativi",
    features: [
      "Dashboard scadenze critiche e conformità",
      "Programmazione visite mediche e idoneità",
      "Registro formazione e scadenze attestati",
      "Documenti: DVR, DUVRI, POS, PSC",
      "Verbali riunioni e nomine figure"
    ]
  },
  // 8. Documenti
  {
    id: "documenti",
    name: "Documenti",
    description: "Sistema documentale centralizzato con ricerca e controllo accessi",
    basePrice: 2000,
    monthlyMultiplier: 0.006,
    category: "Moduli Accessori",
    features: [
      "Organizzazione gerarchica documenti",
      "Tag, metadati e ricerca full-text",
      "Controllo accessi per ruolo",
      "Upload/download con versioning"
    ]
  },
  // 9. Organigramma
  {
    id: "organigramma",
    name: "Organigramma",
    description: "Struttura organizzativa con gerarchia ruoli e responsabilità",
    basePrice: 1500,
    monthlyMultiplier: 0.005,
    category: "Moduli Accessori",
    features: [
      "Visualizzazione grafica struttura",
      "Gerarchia ruoli e deleghe",
      "Responsabilità e contatti"
    ]
  },
  // 10. Notifiche
  {
    id: "notifiche",
    name: "Centro Notifiche",
    description: "Notifiche centralizzate multi-canale con preferenze personalizzabili",
    basePrice: 1500,
    monthlyMultiplier: 0.006,
    category: "Moduli Accessori",
    features: [
      "Notifiche email, push e SMS",
      "Filtri per tipologia",
      "Azioni rapide e preferenze"
    ]
  },
  // 11. Impostazioni & Ruoli
  {
    id: "impostazioni",
    name: "Impostazioni & Ruoli",
    description: "Configurazione sistema, gestione ruoli utenti e permessi granulari",
    basePrice: 3000,
    monthlyMultiplier: 0.006,
    category: "Moduli Core",
    features: [
      "Gestione ruoli: Admin, Capo Cantiere, Operaio, Magazziniere, Contabile",
      "Permessi granulari per sezione",
      "Creazione ruoli personalizzati",
      "Preferenze notifiche e sicurezza account",
      "Impostazioni lingua, tema, fuso orario"
    ]
  },
  // Funzionalità Trasversali
  {
    id: "mobile-first",
    name: "Interfaccia Mobile-First",
    description: "Ottimizzazione completa per dispositivi mobili e tablet",
    basePrice: 2000,
    monthlyMultiplier: 0.004,
    category: "Funzionalità Trasversali",
    features: [
      "UI responsive per tutti i dispositivi",
      "App-like experience su mobile",
      "Timbratura mobile con GPS"
    ]
  },
  {
    id: "mapbox-integration",
    name: "Integrazione Mapbox GPS",
    description: "Tracking real-time mezzi e personale su mappa interattiva",
    basePrice: 3500,
    monthlyMultiplier: 0,
    category: "Funzionalità Trasversali",
    features: [
      "Mappa interattiva con posizioni live",
      "Geolocalizzazione check-in/out",
      "Marker colorati per stato",
      "Storico percorsi e posizioni",
      "Costo variabile: €8/mese per automezzo"
    ]
  },
  {
    id: "alert-automatici",
    name: "Sistema Alert Automatici",
    description: "Notifiche automatiche multi-canale per tutte le scadenze",
    basePrice: 2000,
    monthlyMultiplier: 0.008,
    category: "Funzionalità Trasversali",
    features: [
      "Alert scadenze documenti e certificati",
      "Promemoria manutenzioni e visite",
      "Notifiche sforamento budget",
      "Escalation automatica"
    ]
  }
];

export default function QuoteGGroup() {
  const [services] = useState<Service[]>(defaultServices);
  const [selectedServices, setSelectedServices] = useState<string[]>(["dashboard"]);
  const [upfrontPercentage, setUpfrontPercentage] = useState<number>(50);
  
  // Costi variabili: automezzi e dipendenti
  const [numVehicles, setNumVehicles] = useState<number>(10);
  const [numEmployees, setNumEmployees] = useState<number>(25);
  const [selectedStorage, setSelectedStorage] = useState<string>("50gb");
  
  const VEHICLE_MONTHLY_COST = 8; // €8/mese per automezzo
  const EMPLOYEE_MONTHLY_COST = 2; // €2/mese per dipendente
  
  // Costo storage selezionato
  const storageCost = useMemo(() => {
    const option = STORAGE_OPTIONS.find(o => o.id === selectedStorage);
    return option?.price || 0;
  }, [selectedStorage]);

  // Calcola il totale lordo dei servizi selezionati (senza sconto)
  const grossTotal = useMemo(() => {
    return services
      .filter(s => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.basePrice, 0);
  }, [services, selectedServices]);

  // Calcola lo sconto volume: più moduli = più sconto (max 50%)
  // Formula: 0 moduli = 0%, tutti i moduli = 50%
  const volumeDiscountPercent = useMemo(() => {
    const totalModules = services.length;
    const selectedCount = selectedServices.length;
    if (selectedCount <= 1) return 0;
    // Scala lineare: da 0% (1 modulo) a 50% (tutti i moduli)
    return Math.round((selectedCount - 1) / (totalModules - 1) * 50);
  }, [services.length, selectedServices.length]);

  // Totale con sconto volume applicato
  const selectedTotal = useMemo(() => {
    return grossTotal * (1 - volumeDiscountPercent / 100);
  }, [grossTotal, volumeDiscountPercent]);

  // Calcola l'importo upfront
  const upfrontAmount = useMemo(() => {
    return (selectedTotal * upfrontPercentage) / 100;
  }, [selectedTotal, upfrontPercentage]);

  // Costi variabili mensili (GPS tracking e timbrature)
  const variableMonthlyFee = useMemo(() => {
    const hasMapbox = selectedServices.includes("mapbox-integration");
    const hasPersonale = selectedServices.includes("personale");
    
    let vehicleCost = 0;
    let employeeCost = 0;
    
    // GPS tracking per automezzi (solo se Mapbox selezionato)
    if (hasMapbox) {
      vehicleCost = numVehicles * VEHICLE_MONTHLY_COST;
    }
    
    // Timbratura dipendenti (solo se modulo Personale selezionato)
    if (hasPersonale) {
      employeeCost = numEmployees * EMPLOYEE_MONTHLY_COST;
    }
    
    return { 
      vehicleCost, 
      employeeCost, 
      storageCost,
      total: vehicleCost + employeeCost + storageCost 
    };
  }, [selectedServices, numVehicles, numEmployees, storageCost]);

  // Calcola la fee mensile fissa con moltiplicatore basato su upfront
  const fixedMonthlyFee = useMemo(() => {
    const selectedServicesList = services.filter(s => selectedServices.includes(s.id));
    
    // Calcola la fee base mensile
    const baseMonthlyFee = selectedServicesList.reduce((sum, s) => {
      return sum + (s.basePrice * s.monthlyMultiplier);
    }, 0);
    
    // Moltiplicatore basato su upfront: 100% upfront = 0.5x fee, 25% upfront = 1.25x fee
    // Formula: 1.5 - (upfrontPercentage / 100), range effettivo [0.5 - 1.25]
    const upfrontMultiplier = 1.5 - (upfrontPercentage / 100);
    
    return baseMonthlyFee * upfrontMultiplier;
  }, [services, selectedServices, upfrontPercentage]);

  // Fee mensile totale (fissa + variabile)
  const monthlyFee = useMemo(() => {
    return fixedMonthlyFee + variableMonthlyFee.total;
  }, [fixedMonthlyFee, variableMonthlyFee.total]);

  // Tempi di consegna (settimane) basati sui servizi selezionati
  const deliveryWeeks = useMemo(() => {
    const baseWeeks = 4; // Settimane base per setup
    const serviceCount = selectedServices.length;
    // Ogni servizio aggiunge circa 0.5 settimane, max 10 settimane totali
    const additionalWeeks = Math.min(serviceCount * 0.5, 6);
    return Math.round(baseWeeks + additionalWeeks);
  }, [selectedServices.length]);

  // Funzione per stampare il preventivo
  const handlePrint = () => {
    window.print();
  };

  // Percentuale di sconto sulla fee mensile (rispetto al minimo 25%)
  const monthlyDiscount = useMemo(() => {
    const baseMultiplier = 1.3; // Moltiplicatore al 20% di anticipo
    const currentMultiplier = 1.5 - (upfrontPercentage / 100);
    if (currentMultiplier >= baseMultiplier) return 0;
    return Math.round(((baseMultiplier - currentMultiplier) / baseMultiplier) * 100);
  }, [upfrontPercentage]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  // Raggruppa servizi per categoria
  const groupedServices = useMemo(() => {
    return services.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {} as Record<string, Service[]>);
  }, [services]);

  return (
    <>
      <Helmet>
        <title>Preventivo G-Group ERP | RESYNE</title>
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
                Configuratore <span className="text-resyne-gold">G-Group ERP</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-2">
                Seleziona i moduli di cui hai bisogno
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
              {/* Servizi selezionabili */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {Object.entries(groupedServices).map(([category, categoryServices]) => (
                  <Card key={category} className="glass-card border-border/30">
                    <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
                      <CardTitle className="text-base sm:text-lg font-subtitle text-resyne-gold">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
                      {categoryServices.map(service => (
                        <div 
                          key={service.id}
                          className={`p-3 sm:p-4 rounded-lg border transition-all cursor-pointer ${
                            selectedServices.includes(service.id) 
                              ? 'border-resyne-gold/50 bg-resyne-gold/5' 
                              : 'border-border/30 hover:border-border/50'
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <Checkbox
                              checked={selectedServices.includes(service.id)}
                              onCheckedChange={() => toggleService(service.id)}
                              className="mt-0.5 sm:mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2">
                                <h3 className="font-subtitle font-semibold text-sm sm:text-base">{service.name}</h3>
                                <span className="font-mono text-resyne-gold font-semibold text-sm sm:text-base">
                                  €{service.basePrice.toLocaleString('it-IT')}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2 sm:line-clamp-none">
                                {service.description}
                              </p>
                              {/* Features hidden on mobile for compactness */}
                              {service.features && service.features.length > 0 && (
                                <ul className="hidden sm:block mt-3 space-y-1">
                                  {service.features.map((feature, idx) => (
                                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <Check className="h-3 w-3 text-resyne-gold mt-0.5 shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {service.monthlyMultiplier > 0 && (
                                <p className="hidden sm:block text-xs text-muted-foreground/70 mt-3 pt-2 border-t border-border/20">
                                  Fee mensile base: €{Math.round(service.basePrice * service.monthlyMultiplier).toLocaleString('it-IT')}/mese
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Riepilogo e slider */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Riepilogo prezzi */}
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
                      {/* Totale servizi con sconto volume */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Label className="text-muted-foreground text-sm">Totale servizi ({selectedServices.length} moduli)</Label>
                          {volumeDiscountPercent > 0 && (
                            <Badge className="bg-resyne-gold/20 text-resyne-gold border-resyne-gold/30 text-xs">
                              -{volumeDiscountPercent}% sconto volume
                            </Badge>
                          )}
                        </div>
                        {volumeDiscountPercent > 0 && (
                          <p className="text-sm text-muted-foreground line-through">
                            €{Math.round(grossTotal).toLocaleString('it-IT')}
                          </p>
                        )}
                        <p className="text-2xl font-bold font-mono">
                          €{Math.round(selectedTotal).toLocaleString('it-IT')}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Più moduli selezioni, più risparmi (fino al 50%)
                        </p>
                      </div>

                      {/* Slider upfront */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center gap-2">
                            <Percent className="h-4 w-4 text-resyne-gold" />
                            Anticipo
                          </Label>
                          <span className="font-mono font-semibold text-resyne-gold">
                            {upfrontPercentage}%
                          </span>
                        </div>
                        <Slider
                          value={[upfrontPercentage]}
                          onValueChange={(value) => setUpfrontPercentage(value[0])}
                          min={20}
                          max={100}
                          step={5}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>20%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>

                      {/* Input automezzi e dipendenti */}
                      <div className="space-y-4 p-4 rounded-lg border border-border/30 bg-muted/20">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <Users className="h-4 w-4 text-resyne-gold" />
                          Costi variabili mensili
                        </h4>
                        
                        {/* Automezzi */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="vehicles" className="text-sm flex items-center gap-2">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                              N° Automezzi
                            </Label>
                            <span className="text-xs text-muted-foreground">€8/mese cad.</span>
                          </div>
                          <Input
                            id="vehicles"
                            type="number"
                            min={0}
                            max={500}
                            value={numVehicles}
                            onChange={(e) => setNumVehicles(Math.max(0, parseInt(e.target.value) || 0))}
                            className="font-mono"
                            disabled={!selectedServices.includes("mapbox-integration")}
                          />
                          {selectedServices.includes("mapbox-integration") && numVehicles > 0 && (
                            <p className="text-xs text-resyne-gold">
                              = €{(numVehicles * VEHICLE_MONTHLY_COST).toLocaleString('it-IT')}/mese
                            </p>
                          )}
                          {!selectedServices.includes("mapbox-integration") && (
                            <p className="text-xs text-muted-foreground">
                              Attiva "Integrazione Mapbox GPS" per il tracking
                            </p>
                          )}
                        </div>

                        {/* Dipendenti */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="employees" className="text-sm flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              N° Dipendenti
                            </Label>
                            <span className="text-xs text-muted-foreground">€2/mese cad.</span>
                          </div>
                          <Input
                            id="employees"
                            type="number"
                            min={0}
                            max={1000}
                            value={numEmployees}
                            onChange={(e) => setNumEmployees(Math.max(0, parseInt(e.target.value) || 0))}
                            className="font-mono"
                            disabled={!selectedServices.includes("personale")}
                          />
                          {selectedServices.includes("personale") && numEmployees > 0 && (
                            <p className="text-xs text-resyne-gold">
                              = €{(numEmployees * EMPLOYEE_MONTHLY_COST).toLocaleString('it-IT')}/mese
                            </p>
                          )}
                          {!selectedServices.includes("personale") && (
                            <p className="text-xs text-muted-foreground">
                              Attiva "Personale" per la timbratura
                            </p>
                          )}
                        </div>

                        {/* Storage */}
                        <div className="space-y-2 pt-3 border-t border-border/20">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="storage" className="text-sm flex items-center gap-2">
                              <HardDrive className="h-4 w-4 text-muted-foreground" />
                              Storage Totale
                            </Label>
                          </div>
                          <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                            <SelectTrigger className="font-mono">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STORAGE_OPTIONS.map(option => (
                                <SelectItem key={option.id} value={option.id}>
                                  <span className="flex items-center justify-between gap-4">
                                    <span>{option.label}</span>
                                    <span className="text-muted-foreground text-xs">{option.description}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {storageCost > 0 && (
                            <p className="text-xs text-resyne-gold">
                              = €{storageCost.toLocaleString('it-IT')}/mese
                            </p>
                          )}
                          {storageCost === 0 && (
                            <p className="text-xs text-muted-foreground">
                              50 GB inclusi nel piano base
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Importo upfront */}
                      <div className="p-4 rounded-lg bg-resyne-gold/10 border border-resyne-gold/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Euro className="h-4 w-4 text-resyne-gold" />
                          <Label className="text-sm">Pagamento iniziale</Label>
                        </div>
                        <p className="text-3xl font-bold font-mono text-resyne-gold">
                          €{Math.round(upfrontAmount).toLocaleString('it-IT')}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Landmark className="h-3 w-3" />
                          <span>Bonifico bancario</span>
                        </div>
                      </div>

                      {/* Fee mensile */}
                      <div className="p-4 rounded-lg bg-tiffany/10 border border-tiffany/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-tiffany" />
                            <Label className="text-sm">Fee mensile totale</Label>
                          </div>
                          {monthlyDiscount > 0 && (
                            <Badge className="bg-accent/20 text-accent-foreground border-accent/30 text-xs">
                              -{monthlyDiscount}% sulla fee fissa
                            </Badge>
                          )}
                        </div>
                        <p className="text-3xl font-bold font-mono text-tiffany">
                          €{Math.round(monthlyFee).toLocaleString('it-IT')}<span className="text-lg">/mese</span>
                        </p>
                        
                        {/* Breakdown fee */}
                        <div className="mt-3 pt-3 border-t border-tiffany/20 space-y-1 text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Fee fissa piattaforma:</span>
                            <span className="font-mono">€{Math.round(fixedMonthlyFee).toLocaleString('it-IT')}</span>
                          </div>
                          {variableMonthlyFee.vehicleCost > 0 && (
                            <div className="flex justify-between">
                              <span>GPS Automezzi ({numVehicles}×€8):</span>
                              <span className="font-mono">€{variableMonthlyFee.vehicleCost.toLocaleString('it-IT')}</span>
                            </div>
                          )}
                          {variableMonthlyFee.employeeCost > 0 && (
                            <div className="flex justify-between">
                              <span>Timbrature ({numEmployees}×€2):</span>
                              <span className="font-mono">€{variableMonthlyFee.employeeCost.toLocaleString('it-IT')}</span>
                            </div>
                          )}
                          {variableMonthlyFee.storageCost > 0 && (
                            <div className="flex justify-between">
                              <span>Storage ({STORAGE_OPTIONS.find(o => o.id === selectedStorage)?.label}):</span>
                              <span className="font-mono">€{variableMonthlyFee.storageCost.toLocaleString('it-IT')}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-tiffany/20 text-xs text-muted-foreground">
                          <CreditCard className="h-3 w-3" />
                          <span>Addebito automatico su carta di credito</span>
                        </div>
                      </div>

                      {/* Lista servizi selezionati */}
                      {selectedServices.length > 0 && (
                        <div className="pt-4 border-t border-border/30">
                          <Label className="text-sm text-muted-foreground mb-3 block">
                            Servizi inclusi:
                          </Label>
                          <ul className="space-y-2">
                            {services
                              .filter(s => selectedServices.includes(s.id))
                              .map(service => (
                                <li key={service.id} className="flex items-center gap-2 text-sm">
                                  <Check className="h-4 w-4 text-resyne-gold" />
                                  {service.name}
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      )}

                      {/* Tempi di consegna */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-tech-blue" />
                          <span className="text-sm font-medium">Tempi di consegna</span>
                        </div>
                        <Badge variant="outline" className="font-mono">
                          {deliveryWeeks} settimane
                        </Badge>
                      </div>

                      {/* CTA */}
                      <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 no-print"
                        size="lg"
                        disabled={selectedServices.length === 0}
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

            {/* Incentives Section */}
            <Card className="mt-8 bg-tiffany/5 border-tiffany/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-subtitle text-tiffany flex items-center gap-2">
                  <span>★</span>
                  Agevolazioni e Incentivi Fiscali
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Industria 4.0 */}
                  <div className="p-4 bg-background rounded-lg border border-tiffany/20">
                    <h4 className="font-semibold text-tiffany mb-2">
                      Industria 4.0 – Iperammortamento 180%
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Investimenti in beni strumentali immateriali (software 4.0) funzionali ai processi di trasformazione 4.0. 
                      Include software, sistemi, piattaforme e applicazioni (come ERP, MES, APS) necessari per la gestione e il coordinamento della produzione.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="bg-tiffany/10 text-tiffany border-tiffany/30">
                        Iperammortamento 180%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Rif: Allegato B – L. 232/2016 e L. 205/2017 | {" "}
                      <a 
                        href="https://www.mimit.gov.it/images/stories/documenti/Allegato_B_2016.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-tiffany hover:underline"
                      >
                        Vedi Allegato B MiMIT →
                      </a>
                    </p>
                  </div>

                  {/* Nuova Sabatini */}
                  <div className="p-4 bg-background rounded-lg border border-tiffany/20">
                    <h4 className="font-semibold text-tiffany mb-2">
                      Nuova Sabatini – Beni Strumentali
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Contributo MiMIT a favore delle PMI per l'acquisto di beni strumentali, inclusi software e tecnologie digitali. 
                      Agevola l'accesso al credito per investimenti in macchinari, impianti, attrezzature e software.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="bg-tiffany/10 text-tiffany border-tiffany/30">
                        Contributo fino al 7,7%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Rif: MiSE/MiMIT – Beni Strumentali | Finanziamenti fino a 4M€
                    </p>
                  </div>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4 pt-4 border-t border-tiffany/20">
                  Le agevolazioni sopra indicate sono soggette a requisiti specifici. Contattaci per una consulenza personalizzata sulla tua situazione fiscale.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Mobile Fixed Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border/50 p-3 z-50 no-print">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                {selectedServices.length} moduli · €{Math.round(monthlyFee).toLocaleString('it-IT')}/mese
              </p>
              <p className="text-lg font-bold font-mono text-resyne-gold truncate">
                €{Math.round(upfrontAmount).toLocaleString('it-IT')} anticipo
              </p>
            </div>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              size="sm"
              disabled={selectedServices.length === 0}
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-1" />
              Scarica
            </Button>
          </div>
        </div>
        
        <Footer />
      </div>

      {/* Print Layout - Hidden on screen, visible when printing */}
      <QuotePrintLayout
        selectedServices={selectedServices}
        services={services}
        grossTotal={grossTotal}
        selectedTotal={selectedTotal}
        volumeDiscountPercent={volumeDiscountPercent}
        upfrontPercentage={upfrontPercentage}
        upfrontAmount={upfrontAmount}
        fixedMonthlyFee={fixedMonthlyFee}
        monthlyFee={monthlyFee}
        monthlyDiscount={monthlyDiscount}
        variableMonthlyFee={variableMonthlyFee}
        numVehicles={numVehicles}
        numEmployees={numEmployees}
        selectedStorage={selectedStorage}
        deliveryWeeks={deliveryWeeks}
      />
    </>
  );
}
