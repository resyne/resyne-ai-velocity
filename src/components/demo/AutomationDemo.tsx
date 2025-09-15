import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Mail,
  Database,
  Webhook,
  GitBranch,
  Activity
} from "lucide-react";

const workflows = [
  {
    id: 1,
    name: "Lead to CRM Sync",
    trigger: "Nuovo form compilato",
    platform: "Make",
    status: "active",
    executions: 247,
    success_rate: 98.7,
    steps: [
      { icon: Mail, label: "Form Submit", status: "completed" },
      { icon: Database, label: "Validate Data", status: "completed" },
      { icon: Webhook, label: "CRM Integration", status: "running" },
      { icon: Mail, label: "Send Welcome Email", status: "pending" }
    ]
  },
  {
    id: 2,
    name: "Invoice Processing",
    trigger: "Pagamento ricevuto",
    platform: "Zapier",
    status: "active",
    executions: 156,
    success_rate: 99.2,
    steps: [
      { icon: Database, label: "Payment Detected", status: "completed" },
      { icon: Webhook, label: "Generate Invoice", status: "completed" },
      { icon: Mail, label: "Send to Client", status: "completed" },
      { icon: Database, label: "Update Records", status: "completed" }
    ]
  },
  {
    id: 3,
    name: "AI Content Distribution",
    trigger: "Contenuto approvato",
    platform: "Make",
    status: "running",
    executions: 89,
    success_rate: 95.5,
    steps: [
      { icon: Database, label: "Content Ready", status: "completed" },
      { icon: GitBranch, label: "Multi-channel Split", status: "running" },
      { icon: Mail, label: "Social Media", status: "pending" },
      { icon: Webhook, label: "Analytics Track", status: "pending" }
    ]
  }
];

const realtimeActivities = [
  "✅ Lead qualificato e inviato al CRM",
  "🔄 Fattura generata automaticamente", 
  "📧 Email di follow-up programmata",
  "📊 Report giornaliero generato",
  "🤖 AI ha processato 15 nuovi contatti"
];

export function AutomationDemo() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [executionCount, setExecutionCount] = useState(492);

  useEffect(() => {
    const activityTimer = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % realtimeActivities.length);
    }, 3000);

    const countTimer = setInterval(() => {
      setExecutionCount(prev => prev + 1);
    }, 5000);

    return () => {
      clearInterval(activityTimer);
      clearInterval(countTimer);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'running': return 'text-tech-blue bg-tech-blue/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return CheckCircle;
      case 'running': return Activity;
      case 'pending': return Clock;
      default: return AlertCircle;
    }
  };

  return (
    <div className="h-[600px] bg-gradient-to-br from-background to-muted/30 border border-border/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-tech-blue/20 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-tech-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Automation Control Center</h3>
              <p className="text-xs text-muted-foreground">Make & Zapier Integration Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
              {executionCount} Executions Today
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              <Settings className="w-3 h-3 mr-1" />
              Config
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full overflow-hidden">
        {/* Real-time Activity Feed */}
        <div className="bg-muted/30 border-b border-border/30 p-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Live Activity:</span>
            <span className="text-foreground font-medium">{realtimeActivities[currentActivity]}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-border/30">
          <Card className="bg-card/50">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-tech-blue">{executionCount}</div>
              <p className="text-xs text-muted-foreground">Esecuzioni Oggi</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-400">97.8%</div>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-resyne-gold">€12.4K</div>
              <p className="text-xs text-muted-foreground">Risparmiato</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Workflows */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-semibold mb-4 text-sm">Workflow Attivi</h3>
          
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="bg-card/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        workflow.platform === 'Make' ? 'bg-tech-blue/20' : 'bg-tech-purple/20'
                      }`}>
                        <Zap className={`w-3 h-3 ${
                          workflow.platform === 'Make' ? 'text-tech-blue' : 'text-tech-purple'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{workflow.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{workflow.trigger}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          workflow.platform === 'Make' 
                            ? 'bg-tech-blue/20 text-tech-blue border-tech-blue/30' 
                            : 'bg-tech-purple/20 text-tech-purple border-tech-purple/30'
                        }`}
                      >
                        {workflow.platform}
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-xs h-6 w-6 p-0">
                        {workflow.status === 'active' ? 
                          <Pause className="w-3 h-3" /> : 
                          <Play className="w-3 h-3" />
                        }
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Workflow Steps */}
                  <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
                    {workflow.steps.map((step, index) => {
                      const StatusIcon = getStatusIcon(step.status);
                      return (
                        <div key={index} className="flex items-center gap-2 flex-shrink-0">
                          <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs ${getStatusColor(step.status)}`}>
                            <step.icon className="w-3 h-3" />
                            <span>{step.label}</span>
                            <StatusIcon className="w-3 h-3" />
                          </div>
                          {index < workflow.steps.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        Esecuzioni: <span className="text-foreground font-medium">{workflow.executions}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Success: <span className="text-green-400 font-medium">{workflow.success_rate}%</span>
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs h-6">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Dettagli
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}