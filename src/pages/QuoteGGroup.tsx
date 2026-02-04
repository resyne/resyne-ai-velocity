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
import { Calculator, Check, Euro, Percent, TrendingDown } from "lucide-react";

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
    monthlyMultiplier: 0.02,
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
    monthlyMultiplier: 0.035,
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
    description: "Parco mezzi, tracking GPS real-time, scadenze e manutenzioni",
    basePrice: 6000,
    monthlyMultiplier: 0.04,
    category: "Moduli Core",
    features: [
      "Parco mezzi con schede tecniche e stato",
      "Live Tracking GPS su mappa Mapbox",
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
    monthlyMultiplier: 0.03,
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
    monthlyMultiplier: 0.03,
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
    monthlyMultiplier: 0.035,
    category: "Moduli Operativi",
    features: [
      "Anagrafica completa con contratti e qualifiche",
      "Presenze con mappa GPS per cantiere",
      "Richieste ferie/permessi con approvazione",
      "Archivio buste paga e cedolini",
      "Assegnazioni cantiere e certificazioni"
    ]
  },
  // 7. Sicurezza
  {
    id: "sicurezza",
    name: "Sicurezza",
    description: "Scadenze critiche, visite mediche, formazione e documenti obbligatori",
    basePrice: 4000,
    monthlyMultiplier: 0.025,
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
    monthlyMultiplier: 0.02,
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
    monthlyMultiplier: 0.015,
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
    monthlyMultiplier: 0.02,
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
    monthlyMultiplier: 0.02,
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
    monthlyMultiplier: 0.01,
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
    monthlyMultiplier: 0.05,
    category: "Funzionalità Trasversali",
    features: [
      "Mappa interattiva con posizioni live",
      "Geolocalizzazione check-in/out",
      "Marker colorati per stato",
      "Storico percorsi e posizioni"
    ]
  },
  {
    id: "alert-automatici",
    name: "Sistema Alert Automatici",
    description: "Notifiche automatiche multi-canale per tutte le scadenze",
    basePrice: 2000,
    monthlyMultiplier: 0.025,
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

  // Calcola la fee mensile con moltiplicatore basato su upfront
  // Più upfront = meno mensile (sconto progressivo)
  const monthlyFee = useMemo(() => {
    const selectedServicesList = services.filter(s => selectedServices.includes(s.id));
    
    // Calcola la fee base mensile
    const baseMonthlyFee = selectedServicesList.reduce((sum, s) => {
      return sum + (s.basePrice * s.monthlyMultiplier);
    }, 0);
    
    // Moltiplicatore basato su upfront: 100% upfront = 0.5x fee, 0% upfront = 1.5x fee
    // Formula: 1.5 - (upfrontPercentage / 100)
    const upfrontMultiplier = 1.5 - (upfrontPercentage / 100);
    
    return baseMonthlyFee * upfrontMultiplier;
  }, [services, selectedServices, upfrontPercentage]);

  // Percentuale di sconto sulla fee mensile
  const monthlyDiscount = useMemo(() => {
    const baseMultiplier = 1.5;
    const currentMultiplier = 1.5 - (upfrontPercentage / 100);
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
        
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-resyne-gold/20 text-resyne-gold border-resyne-gold/30">
                Preventivo Personalizzato
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Configuratore <span className="text-resyne-gold">G-Group ERP</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Seleziona i moduli e servizi di cui hai bisogno, poi usa lo slider per personalizzare il pagamento
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Servizi selezionabili */}
              <div className="lg:col-span-2 space-y-6">
                {Object.entries(groupedServices).map(([category, categoryServices]) => (
                  <Card key={category} className="glass-card border-border/30">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-subtitle text-resyne-gold">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {categoryServices.map(service => (
                        <div 
                          key={service.id}
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            selectedServices.includes(service.id) 
                              ? 'border-resyne-gold/50 bg-resyne-gold/5' 
                              : 'border-border/30 hover:border-border/50'
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={selectedServices.includes(service.id)}
                              onCheckedChange={() => toggleService(service.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <h3 className="font-subtitle font-semibold">{service.name}</h3>
                                <span className="font-mono text-resyne-gold font-semibold">
                                  €{service.basePrice.toLocaleString('it-IT')}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {service.description}
                              </p>
                              {service.features && service.features.length > 0 && (
                                <ul className="mt-3 space-y-1">
                                  {service.features.map((feature, idx) => (
                                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <Check className="h-3 w-3 text-resyne-gold mt-0.5 shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {service.monthlyMultiplier > 0 && (
                                <p className="text-xs text-muted-foreground/70 mt-3 pt-2 border-t border-border/20">
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
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-resyne-gold" />
                        Riepilogo
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
                          min={0}
                          max={100}
                          step={5}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
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
                      </div>

                      {/* Fee mensile */}
                      <div className="p-4 rounded-lg bg-tiffany/10 border border-tiffany/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-tiffany" />
                            <Label className="text-sm">Fee mensile</Label>
                          </div>
                          {monthlyDiscount > 0 && (
                            <Badge className="bg-accent/20 text-accent-foreground border-accent/30 text-xs">
                              -{monthlyDiscount}%
                            </Badge>
                          )}
                        </div>
                        <p className="text-3xl font-bold font-mono text-tiffany">
                          €{Math.round(monthlyFee).toLocaleString('it-IT')}<span className="text-lg">/mese</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {upfrontPercentage < 100 
                            ? `Più anticipo paghi, meno sarà la fee mensile`
                            : `Con il 100% di anticipo hai la fee mensile minima`
                          }
                        </p>
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

                      {/* CTA */}
                      <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        size="lg"
                        disabled={selectedServices.length === 0}
                      >
                        Richiedi preventivo dettagliato
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
