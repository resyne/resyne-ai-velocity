import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Zap, Bot, TrendingUp, Brain } from "lucide-react";
import { ERPDemo } from "./demo/ERPDemo";
import { AutomationDemo } from "./demo/AutomationDemo";
import { AIDemo } from "./demo/AIDemo";
import { AuditAIForm } from "./AuditAIForm";

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
                <ERPDemo />
                <div className="mt-6 flex justify-center">
                  <AuditAIForm>
                    <Button className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light flex items-center gap-2 text-lg px-8 py-6">
                      <Brain className="w-5 h-5" />
                      Audit AI - Report Gratuito (€249 gratis)
                    </Button>
                  </AuditAIForm>
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
                <AutomationDemo />
                <div className="mt-6 flex justify-center">
                  <AuditAIForm>
                    <Button className="bg-tech-blue text-white hover:bg-tech-blue/90 flex items-center gap-2 text-lg px-8 py-6">
                      <Brain className="w-5 h-5" />
                      Audit AI - Report Gratuito (€249 gratis)
                    </Button>
                  </AuditAIForm>
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
                <AIDemo />
                <div className="mt-6 flex justify-center">
                  <AuditAIForm>
                    <Button className="bg-tech-purple text-white hover:bg-tech-purple/90 flex items-center gap-2 text-lg px-8 py-6">
                      <Brain className="w-5 h-5" />
                      Audit AI - Report Gratuito (€249 gratis)
                    </Button>
                  </AuditAIForm>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}