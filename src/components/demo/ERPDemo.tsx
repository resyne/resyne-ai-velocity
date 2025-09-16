import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Package, 
  TrendingUp, 
  Mail, 
  Handshake, 
  BarChart3,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  PhoneCall,
  MessageCircle,
  DollarSign
} from "lucide-react";

const mockData = {
  crm: [
    { id: 1, name: "Marco Rossi", company: "Tech Solutions", status: "Hot", value: "€25,000", activity: "Chiamata programmata" },
    { id: 2, name: "Laura Bianchi", company: "Digital Hub", status: "Warm", value: "€15,000", activity: "Proposta inviata" },
    { id: 3, name: "Giuseppe Verde", company: "Innovation Corp", status: "Cold", value: "€8,000", activity: "Follow-up richiesto" },
  ],
  inventory: [
    { id: 1, product: "ERP License Pro", stock: 45, reserved: 12, available: 33, price: "€2,500" },
    { id: 2, product: "AI Integration Package", stock: 23, reserved: 8, available: 15, price: "€5,000" },
    { id: 3, product: "Automation Suite", stock: 67, reserved: 15, available: 52, price: "€3,200" },
  ]
};

export function ERPDemo() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[600px] bg-gradient-to-br from-background to-muted/30 border border-border/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-resyne-gold/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-resyne-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">RESYNE ERP Dashboard</h3>
              <p className="text-xs text-muted-foreground">Sistema Integrato di Gestione</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
              LIVE
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Nuovo
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-muted/30 border-b border-border/30 rounded-none">
          <TabsTrigger value="dashboard" className="text-xs md:text-sm px-1 md:px-3">Dashboard</TabsTrigger>
          <TabsTrigger value="crm" className="text-xs md:text-sm px-1 md:px-3">CRM</TabsTrigger>
          <TabsTrigger value="inventory" className="text-xs md:text-sm px-1 md:px-3">Magazzino</TabsTrigger>
          <TabsTrigger value="partnership" className="text-xs md:text-sm px-1 md:px-3 col-span-3 md:col-span-1">Partnership</TabsTrigger>
          <TabsTrigger value="newsletter" className="text-xs md:text-sm px-1 md:px-3 hidden md:block">Newsletter</TabsTrigger>
          <TabsTrigger value="marketing" className="text-xs md:text-sm px-1 md:px-3 hidden md:block">Marketing</TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard" className="flex-1 p-2 md:p-4 overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <Card className="bg-card/50">
              <CardHeader className="pb-1 md:pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs md:text-sm font-medium">Clienti Attivi</CardTitle>
                  <Users className="w-3 h-3 md:w-4 md:h-4 text-resyne-gold" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold text-resyne-gold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% questo mese</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader className="pb-1 md:pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs md:text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-tech-blue" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold text-tech-blue">€148K</div>
                <p className="text-xs text-muted-foreground">+8% questo mese</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader className="pb-1 md:pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs md:text-sm font-medium">Progetti</CardTitle>
                  <Package className="w-3 h-3 md:w-4 md:h-4 text-tech-purple" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold text-tech-purple">67</div>
                <p className="text-xs text-muted-foreground">23 in corso</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader className="pb-1 md:pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs md:text-sm font-medium">AI Processing</CardTitle>
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-tech-cyan" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold text-tech-cyan">{progress}%</div>
                <Progress value={progress} className="mt-2" />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-sm">Attività Recenti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <PhoneCall className="w-4 h-4 text-resyne-gold" />
                  <span>AI Assistant: Chiamata completata con Marco Rossi</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MessageCircle className="w-4 h-4 text-tech-blue" />
                  <span>Automation: Email follow-up inviata automaticamente</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Package className="w-4 h-4 text-tech-purple" />
                  <span>Magazzino: Stock aggiornato via API integration</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-sm">Performance AI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Lead Qualification</span>
                    <span className="text-resyne-gold">94%</span>
                  </div>
                  <Progress value={94} />
                  <div className="flex justify-between text-sm">
                    <span>Process Automation</span>
                    <span className="text-tech-blue">87%</span>
                  </div>
                  <Progress value={87} />
                  <div className="flex justify-between text-sm">
                    <span>Customer Satisfaction</span>
                    <span className="text-tech-purple">96%</span>
                  </div>
                  <Progress value={96} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* CRM */}
        <TabsContent value="crm" className="flex-1 p-2 md:p-4 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <h3 className="font-semibold text-sm md:text-base">Gestione Clienti</h3>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="text-xs md:text-sm flex-1 md:flex-none">
                <Search className="w-3 h-3 mr-1" />
                Cerca
              </Button>
              <Button size="sm" variant="outline" className="text-xs md:text-sm flex-1 md:flex-none">
                <Filter className="w-3 h-3 mr-1" />
                Filtri
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {mockData.crm.map((client) => (
              <Card key={client.id} className="bg-card/50">
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-resyne-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 md:w-5 md:h-5 text-resyne-gold" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate">{client.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{client.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          client.status === 'Hot' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          client.status === 'Warm' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }`}
                      >
                        {client.status}
                      </Badge>
                      <span className="text-sm font-semibold text-resyne-gold">{client.value}</span>
                      <Button size="sm" variant="ghost" className="text-xs h-8 w-8 p-0">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <p className="text-xs text-muted-foreground">{client.activity}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Inventory */}
        <TabsContent value="inventory" className="flex-1 p-2 md:p-4 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <h3 className="font-semibold text-sm md:text-base">Gestione Magazzino</h3>
            <Button size="sm" className="text-xs md:text-sm bg-tech-blue text-white">
              <Plus className="w-3 h-3 mr-1" />
              Nuovo Prodotto
            </Button>
          </div>
          
          <div className="space-y-3">
            {mockData.inventory.map((item) => (
              <Card key={item.id} className="bg-card/50">
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-tech-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4 md:w-5 md:h-5 text-tech-blue" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product}</h4>
                        <p className="text-xs text-muted-foreground">Stock: {item.stock} | Disponibili: {item.available}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:block md:text-right">
                      <div className="text-sm font-semibold text-tech-blue">{item.price}</div>
                      <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                        Disponibile
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Riservati: {item.reserved}</span>
                      <span>Ultimo aggiornamento: 5 min fa</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tabs with placeholder content */}
        {['partnership', 'newsletter', 'marketing'].map((tab) => (
          <TabsContent key={tab} value={tab} className="flex-1 p-4">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-resyne-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {tab === 'partnership' && <Handshake className="w-8 h-8 text-resyne-gold" />}
                  {tab === 'newsletter' && <Mail className="w-8 h-8 text-resyne-gold" />}
                  {tab === 'marketing' && <TrendingUp className="w-8 h-8 text-resyne-gold" />}
                </div>
                <h3 className="font-semibold mb-2 capitalize">{tab} Module</h3>
                <p className="text-sm text-muted-foreground">Modulo in sviluppo - Coming Soon</p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
