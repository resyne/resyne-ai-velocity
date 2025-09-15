import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Zap, Bot, TrendingUp } from "lucide-react";

export function DemoSection() {
  return (
    <section className="py-24 tech-web" id="demos">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-title text-4xl md:text-6xl mb-6">
            <span className="gradient-text">Demo Live</span> delle nostre{" "}
            <span className="text-tech-glow">Soluzioni</span>
          </h2>
          <p className="font-subtitle text-xl text-muted-foreground max-w-3xl mx-auto">
            Esplora le nostre piattaforme innovative in azione. Ogni demo è completamente funzionale 
            e mostra il potere dell'integrazione AI-ERP.
          </p>
        </div>

        <Tabs defaultValue="erp" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mb-12 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="erp" className="flex items-center gap-2 data-[state=active]:bg-resyne-gold data-[state=active]:text-resyne-dark">
              <Database className="w-4 h-4" />
              ERP Solutions
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2 data-[state=active]:bg-tech-blue data-[state=active]:text-white">
              <Zap className="w-4 h-4" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 data-[state=active]:bg-tech-purple data-[state=active]:text-white">
              <Bot className="w-4 h-4" />
              AI Solutions
            </TabsTrigger>
          </TabsList>

          {/* ERP Demo */}
          <TabsContent value="erp" className="mt-0" id="erp">
            <Card className="glass-card shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-resyne-gold/20">
                    <Database className="w-6 h-6 text-resyne-gold" />
                  </div>
                  <div>
                    <CardTitle className="font-title text-2xl gradient-text">
                      ERP Completo con AI Integration
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      CRM, Magazzino, Partnership, Newsletter, Controllo Gestione, Marketing - Tutto in un'unica piattaforma
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 text-xs rounded-full bg-resyne-gold/20 text-resyne-gold">CRM Intelligente</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-tech-blue/20 text-tech-blue">Gestione Magazzino</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-tech-purple/20 text-tech-purple">AI Analytics</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-resyne-gold/20 text-resyne-gold">Marketing Automation</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden border border-border/30">
                  <iframe 
                    src="https://demo-erp.resyne.ai" 
                    width="100%" 
                    height="600" 
                    className="w-full"
                    title="ERP Demo - RESYNE"
                  >
                    <div className="flex items-center justify-center h-[600px] bg-muted">
                      <div className="text-center">
                        <Database className="w-16 h-16 text-resyne-gold mx-auto mb-4" />
                        <h3 className="font-subtitle text-xl mb-2">ERP Demo Loading...</h3>
                        <p className="text-muted-foreground">Simulazione completa del sistema ERP integrato</p>
                      </div>
                    </div>
                  </iframe>
                  <div className="absolute top-4 right-4">
                    <Button size="sm" className="bg-resyne-gold/90 text-resyne-dark hover:bg-resyne-gold">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Demo Live
                    </Button>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light">
                    Richiedi Accesso Completo
                  </Button>
                  <Button variant="outline" className="border-resyne-gold text-resyne-gold hover:bg-resyne-gold hover:text-resyne-dark">
                    Scarica Brochure ERP
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Demo */}
          <TabsContent value="automation" className="mt-0" id="automation">
            <Card className="glass-card shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-tech-blue/20">
                    <Zap className="w-6 h-6 text-tech-blue" />
                  </div>
                  <div>
                    <CardTitle className="font-title text-2xl gradient-tech-text">
                      Automation Suite con Make & Zapier
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Automazioni intelligenti per ottimizzare i processi aziendali e aumentare l'efficienza
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 text-xs rounded-full bg-tech-blue/20 text-tech-blue">Make Integration</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-tech-cyan/20 text-tech-cyan">Zapier Workflows</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-tech-purple/20 text-tech-purple">Smart Triggers</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-resyne-gold/20 text-resyne-gold">Real-time Sync</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden border border-border/30">
                  <iframe 
                    src="https://automation-demo.resyne.ai" 
                    width="100%" 
                    height="600" 
                    className="w-full"
                    title="Automation Demo - RESYNE"
                  >
                    <div className="flex items-center justify-center h-[600px] bg-muted">
                      <div className="text-center">
                        <Zap className="w-16 h-16 text-tech-blue mx-auto mb-4" />
                        <h3 className="font-subtitle text-xl mb-2">Automation Demo Loading...</h3>
                        <p className="text-muted-foreground">Workflow intelligenti Make & Zapier in azione</p>
                      </div>
                    </div>
                  </iframe>
                  <div className="absolute top-4 right-4">
                    <Button size="sm" className="bg-tech-blue/90 text-white hover:bg-tech-blue">
                      <Zap className="w-4 h-4 mr-2" />
                      Demo Attiva
                    </Button>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button className="bg-tech-blue text-white hover:bg-tech-blue/90">
                    Configura Automation
                  </Button>
                  <Button variant="outline" className="border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white">
                    Guida Workflow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Demo */}
          <TabsContent value="ai" className="mt-0" id="ai">
            <Card className="glass-card shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-tech-purple/20">
                    <Bot className="w-6 h-6 text-tech-purple" />
                  </div>
                  <div>
                    <CardTitle className="font-title text-2xl text-tech-glow">
                      AI Phone Dealers & Assistenti Virtuali
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Agenti AI che gestiscono ordinazioni, prenotazioni e supporto clienti 24/7
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 text-xs rounded-full bg-tech-purple/20 text-tech-purple">Voice AI</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-tech-cyan/20 text-tech-cyan">NLP Processing</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-resyne-gold/20 text-resyne-gold">24/7 Support</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-tech-blue/20 text-tech-blue">Multi-lingua</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden border border-border/30">
                  <iframe 
                    src="https://ai-demo.resyne.ai" 
                    width="100%" 
                    height="600" 
                    className="w-full"
                    title="AI Solutions Demo - RESYNE"
                  >
                    <div className="flex items-center justify-center h-[600px] bg-muted">
                      <div className="text-center">
                        <Bot className="w-16 h-16 text-tech-purple mx-auto mb-4 animate-pulse" />
                        <h3 className="font-subtitle text-xl mb-2">AI Assistant Loading...</h3>
                        <p className="text-muted-foreground">Prova i nostri assistenti AI conversazionali</p>
                        <div className="mt-4">
                          <Button size="sm" className="bg-tech-purple text-white">
                            Avvia Chat AI
                          </Button>
                        </div>
                      </div>
                    </div>
                  </iframe>
                  <div className="absolute top-4 right-4">
                    <Button size="sm" className="bg-tech-purple/90 text-white hover:bg-tech-purple">
                      <Bot className="w-4 h-4 mr-2" />
                      AI Attivo
                    </Button>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button className="bg-tech-purple text-white hover:bg-tech-purple/90">
                    Testa AI Assistant
                  </Button>
                  <Button variant="outline" className="border-tech-purple text-tech-purple hover:bg-tech-purple hover:text-white">
                    Integra nel tuo Business
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}