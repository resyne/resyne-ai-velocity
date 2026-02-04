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
  monthlyMultiplier: number; // Moltiplicatore per calcolo fee mensile (es. 0.05 = 5% del prezzo)
  category: string;
}

// Servizi placeholder - da caricare successivamente
const defaultServices: Service[] = [
  {
    id: "core-erp",
    name: "Core ERP",
    description: "Contabilità generale, gestione magazzino, ordini e fatturazione",
    basePrice: 5000,
    monthlyMultiplier: 0.03,
    category: "Base"
  },
  {
    id: "hr-payroll",
    name: "HR & Payroll",
    description: "Gestione risorse umane, buste paga, presenze",
    basePrice: 3000,
    monthlyMultiplier: 0.04,
    category: "Moduli"
  },
  {
    id: "crm-marketing",
    name: "CRM & Marketing",
    description: "Gestione clienti, pipeline vendite, campagne marketing",
    basePrice: 2500,
    monthlyMultiplier: 0.035,
    category: "Moduli"
  },
  {
    id: "bi-analytics",
    name: "Business Intelligence",
    description: "Dashboard, reportistica avanzata, analytics",
    basePrice: 2000,
    monthlyMultiplier: 0.025,
    category: "Moduli"
  },
  {
    id: "formazione",
    name: "Formazione",
    description: "Training del personale e onboarding",
    basePrice: 1500,
    monthlyMultiplier: 0,
    category: "Servizi"
  },
  {
    id: "supporto-premium",
    name: "Supporto Premium",
    description: "Assistenza prioritaria 24/7",
    basePrice: 500,
    monthlyMultiplier: 0.10,
    category: "Servizi"
  }
];

export default function QuoteGGroup() {
  const [services] = useState<Service[]>(defaultServices);
  const [selectedServices, setSelectedServices] = useState<string[]>(["core-erp"]);
  const [upfrontPercentage, setUpfrontPercentage] = useState<number>(50);

  // Calcola il totale dei servizi selezionati
  const selectedTotal = useMemo(() => {
    return services
      .filter(s => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.basePrice, 0);
  }, [services, selectedServices]);

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
                          className={`flex items-start gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
                            selectedServices.includes(service.id) 
                              ? 'border-resyne-gold/50 bg-resyne-gold/5' 
                              : 'border-border/30 hover:border-border/50'
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          <Checkbox
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() => toggleService(service.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-subtitle font-semibold">{service.name}</h3>
                              <span className="font-mono text-resyne-gold font-semibold">
                                €{service.basePrice.toLocaleString('it-IT')}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {service.description}
                            </p>
                            {service.monthlyMultiplier > 0 && (
                              <p className="text-xs text-muted-foreground/70 mt-2">
                                Fee mensile base: €{Math.round(service.basePrice * service.monthlyMultiplier).toLocaleString('it-IT')}/mese
                              </p>
                            )}
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
                      {/* Totale servizi */}
                      <div>
                        <Label className="text-muted-foreground text-sm">Totale servizi selezionati</Label>
                        <p className="text-2xl font-bold font-mono">
                          €{selectedTotal.toLocaleString('it-IT')}
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
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
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
