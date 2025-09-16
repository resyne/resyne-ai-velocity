import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bot, 
  Phone, 
  MessageCircle, 
  Calendar, 
  CheckCircle,
  Clock,
  TrendingUp,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Languages,
  Activity,
  Star,
  Users
} from "lucide-react";

const aiAgents = [
  {
    id: 1,
    name: "Sofia",
    role: "Sales Agent",
    status: "active",
    language: "IT/EN",
    calls_today: 23,
    success_rate: 94,
    specialization: "Lead Qualification & Sales",
    current_call: {
      customer: "Marco Rossi",
      duration: "00:04:32",
      type: "Ordinazione ERP Pro",
      status: "in_progress"
    }
  },
  {
    id: 2,
    name: "Alessandro",
    role: "Support Agent",
    status: "available",
    language: "IT/EN/ES",
    calls_today: 17,
    success_rate: 98,
    specialization: "Technical Support & Troubleshooting",
    current_call: null
  },
  {
    id: 3,
    name: "Giulia",
    role: "Booking Agent",
    status: "active",
    language: "IT/EN/FR",
    calls_today: 31,
    success_rate: 96,
    specialization: "Appointment Scheduling & Customer Service",
    current_call: {
      customer: "Laura Bianchi",
      duration: "00:02:18",
      type: "Consulenza AI Implementation",
      status: "in_progress"
    }
  }
];

const recentInteractions = [
  { time: "14:23", agent: "Sofia", action: "Ordinazione completata", customer: "TechCorp Srl", value: "€15,000" },
  { time: "14:18", agent: "Giulia", action: "Appuntamento fissato", customer: "Digital Hub", value: "Demo ERP" },
  { time: "14:12", agent: "Alessandro", action: "Problema risolto", customer: "Innovation Lab", value: "Support" },
  { time: "14:05", agent: "Sofia", action: "Lead qualificato", customer: "StartUp Italia", value: "Hot Lead" },
];

const liveConversation = [
  { speaker: "customer", message: "Buongiorno, vorrei informazioni sui vostri servizi ERP", time: "14:30" },
  { speaker: "ai", message: "Buongiorno! Sono Sofia, il suo assistente AI per RESYNE. Sarò felice di aiutarla con informazioni sui nostri servizi ERP. Può dirmi quale settore rappresenta la sua azienda?", time: "14:30" },
  { speaker: "customer", message: "Siamo una media impresa manifatturiera con 150 dipendenti", time: "14:31" },
  { speaker: "ai", message: "Perfetto! Per aziende manifatturiere della sua dimensione, la nostra soluzione ERP Pro con AI Integration è ideale. Include gestione completa di produzione, magazzino, CRM e controllo qualità. Posso programmarle una demo personalizzata?", time: "14:31" },
];

export function AIDemo() {
  const [selectedAgent, setSelectedAgent] = useState(aiAgents[0]);
  const [isListening, setIsListening] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % liveConversation.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'available': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'busy': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="h-[600px] bg-gradient-to-br from-background to-muted/30 border border-border/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-tech-purple/20 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-tech-purple animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Phone Dealers Hub</h3>
              <p className="text-xs text-muted-foreground">Assistenti AI per Vendite e Supporto</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
              71 Chiamate Oggi
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              <Languages className="w-3 h-3 mr-1" />
              Multi-lingua
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Agents Sidebar */}
        <div className="w-full md:w-1/3 max-h-60 md:max-h-none border-b md:border-b-0 md:border-r border-border/30 bg-muted/20 overflow-y-auto">
          <div className="p-2 md:p-4 border-b border-border/30">
            <h4 className="font-semibold text-sm mb-3">AI Agents Active</h4>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:space-y-3 md:gap-0">
              {aiAgents.map((agent) => (
                <Card 
                  key={agent.id} 
                  className={`cursor-pointer transition-all hover:bg-card/70 ${
                    selectedAgent.id === agent.id ? 'ring-2 ring-tech-purple/50 bg-card/60' : 'bg-card/30'
                  }`}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <CardContent className="p-2 md:p-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                      <Avatar className="w-6 h-6 md:w-8 md:h-8 mx-auto md:mx-0">
                        <AvatarFallback className="bg-tech-purple/20 text-tech-purple text-xs">
                          {agent.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <h5 className="font-medium text-xs truncate">{agent.name}</h5>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(agent.status)} mt-1 md:mt-0`}>
                            <span className="hidden md:inline">{agent.status}</span>
                            <div className={`w-2 h-2 rounded-full md:hidden ${
                              agent.status === 'active' ? 'bg-green-400' : 'bg-blue-400'
                            }`}></div>
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{agent.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{agent.calls_today}</span>
                      <span>{agent.success_rate}%</span>
                    </div>
                    
                    {agent.current_call && (
                      <div className="mt-2 pt-2 border-t border-border/30">
                        <div className="flex items-center gap-1 text-xs text-green-400 justify-center md:justify-start">
                          <Phone className="w-3 h-3" />
                          <span className="hidden md:inline">In chiamata: {agent.current_call.duration}</span>
                          <span className="md:hidden">{agent.current_call.duration}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate hidden md:block">
                          {agent.current_call.customer} - {agent.current_call.type}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h4 className="font-semibold text-sm mb-3">Interazioni Recenti</h4>
            <div className="space-y-2">
              {recentInteractions.map((interaction, index) => (
                <div key={index} className="text-xs p-2 bg-card/30 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-tech-purple">{interaction.agent}</span>
                    <span className="text-muted-foreground">{interaction.time}</span>
                  </div>
                  <p className="text-foreground">{interaction.action}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-muted-foreground">{interaction.customer}</span>
                    <span className="text-resyne-gold font-medium">{interaction.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Agent Details */}
          <div className="p-2 md:p-4 border-b border-border/30 bg-card/50 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-tech-purple/20 text-tech-purple text-lg">
                    {selectedAgent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedAgent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAgent.specialization}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Languages className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{selectedAgent.language}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={() => setIsListening(!isListening)}
                >
                  {isListening ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                </Button>
                <Badge variant="outline" className={`text-xs ${getStatusColor(selectedAgent.status)}`}>
                  {selectedAgent.status}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-tech-purple">{selectedAgent.calls_today}</div>
                <p className="text-xs text-muted-foreground">Chiamate Oggi</p>
              </div>
              <div>
                <div className="text-lg font-bold text-green-400">{selectedAgent.success_rate}%</div>
                <p className="text-xs text-muted-foreground">Success Rate</p>
              </div>
              <div>
                <div className="text-lg font-bold text-resyne-gold">4.8</div>
                <p className="text-xs text-muted-foreground">Rating Cliente</p>
              </div>
            </div>
          </div>

          {/* Live Conversation */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-sm">Conversazione Live</h4>
              {selectedAgent.current_call && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">
                    {selectedAgent.current_call.customer} - {selectedAgent.current_call.duration}
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              {liveConversation.slice(0, currentMessage + 1).map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.speaker === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.speaker === 'ai' 
                      ? 'bg-tech-purple/20 text-tech-purple' 
                      : 'bg-muted text-foreground'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.speaker === 'ai' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <Users className="w-4 h-4" />
                      )}
                      <span className="font-medium text-xs">
                        {message.speaker === 'ai' ? selectedAgent.name : 'Cliente'}
                      </span>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
              
              {currentMessage < liveConversation.length - 1 && (
                <div className="flex justify-start">
                  <div className="bg-tech-purple/20 text-tech-purple p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <span className="text-sm">{selectedAgent.name} sta scrivendo...</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-tech-purple rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-tech-purple rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-tech-purple rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="border-t border-border/30 p-2 md:p-4 bg-muted/20 flex-shrink-0">
            <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
              <div className="flex items-center gap-1 md:gap-2">
                <Button size="sm" variant="outline" className="text-xs flex-1 md:flex-none">
                  <Mic className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">Intercetta</span>
                </Button>
                <Button size="sm" variant="outline" className="text-xs flex-1 md:flex-none">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">Chat Support</span>
                </Button>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <Button size="sm" className="text-xs bg-tech-purple text-white flex-1 md:flex-none">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">Prenota Follow-up</span>
                  <span className="md:hidden">Follow-up</span>
                </Button>
                <Button size="sm" variant="outline" className="text-xs flex-1 md:flex-none">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">Analytics</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}