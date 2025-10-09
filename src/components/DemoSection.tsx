import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Zap, Bot, Brain } from "lucide-react";
import { ERPDemo } from "./demo/ERPDemo";
import { AutomationDemo } from "./demo/AutomationDemo";
import { AIDemo } from "./demo/AIDemo";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function DemoSection() {
  const { t } = useTranslation();
  
  return (
    <section className="py-24 tech-web" id="demos">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-title text-4xl md:text-6xl mb-6">
            <span className="gradient-text">{t('demos.title')}</span> {t('demos.title2')}{" "}
            <span className="text-tech-glow">{t('demos.title3')}</span>
          </h2>
          <p className="font-subtitle text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('demos.subtitle')}
          </p>
        </div>

        <Tabs defaultValue="erp" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mb-12 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="erp" className="flex items-center gap-2 data-[state=active]:bg-resyne-gold data-[state=active]:text-resyne-dark">
              <Database className="w-4 h-4" />
              {t('header.erp')}
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2 data-[state=active]:bg-tech-blue data-[state=active]:text-white">
              <Zap className="w-4 h-4" />
              {t('header.automation')}
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 data-[state=active]:bg-tech-purple data-[state=active]:text-white">
              <Bot className="w-4 h-4" />
              {t('header.ai')}
            </TabsTrigger>
          </TabsList>

          {/* ERP Demo */}
          <TabsContent value="erp" className="mt-0" id="erp">
            <Card className="glass-card shadow-card">
              <CardHeader className="p-3 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-lg bg-resyne-gold/20">
                    <Database className="w-4 h-4 md:w-6 md:h-6 text-resyne-gold" />
                  </div>
                  <div>
                    <CardTitle className="font-title text-base md:text-2xl gradient-text">
                      {t('demos.erp.title')}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm text-muted-foreground">
                      {t('demos.erp.description')}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1.5 md:gap-2 flex-wrap">
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-resyne-gold/20 text-resyne-gold">{t('demos.erp.tag1')}</span>
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-tech-blue/20 text-tech-blue">{t('demos.erp.tag2')}</span>
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-tech-purple/20 text-tech-purple">{t('demos.erp.tag3')}</span>
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-resyne-gold/20 text-resyne-gold">{t('demos.erp.tag4')}</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <ERPDemo />
                <div className="mt-4 md:mt-6 flex justify-center px-2">
                  <Link to="/audit" className="w-full md:w-auto">
                    <Button className="w-full md:w-auto bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light flex items-center justify-center gap-2 text-base md:text-lg px-6 py-6 md:px-8 md:py-7 font-bold shadow-lg hover:shadow-xl transition-all">
                      <Brain className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="flex flex-col md:flex-row md:gap-2 items-center">
                        <span>{t('demos.auditButton')}</span>
                        <span className="text-sm md:text-lg">{t('demos.auditValue')}</span>
                      </span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Demo */}
          <TabsContent value="automation" className="mt-0" id="automation">
            <Card className="glass-card shadow-card">
              <CardHeader className="p-3 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-lg bg-tech-blue/20">
                    <Zap className="w-4 h-4 md:w-6 md:h-6 text-tech-blue" />
                  </div>
                  <div>
                    <CardTitle className="font-title text-base md:text-2xl gradient-tech-text">
                      {t('demos.automation.title')}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm text-muted-foreground">
                      {t('demos.automation.description')}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1.5 md:gap-2 flex-wrap">
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-tech-blue/20 text-tech-blue">{t('demos.automation.tag1')}</span>
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-tech-cyan/20 text-tech-cyan">{t('demos.automation.tag2')}</span>
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-tech-purple/20 text-tech-purple">{t('demos.automation.tag3')}</span>
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-resyne-gold/20 text-resyne-gold">{t('demos.automation.tag4')}</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <AutomationDemo />
                <div className="mt-4 md:mt-6 flex justify-center px-2">
                  <Link to="/audit" className="w-full md:w-auto">
                    <Button className="w-full md:w-auto bg-tech-blue text-white hover:bg-tech-blue/90 flex items-center justify-center gap-2 text-base md:text-lg px-6 py-6 md:px-8 md:py-7 font-bold shadow-lg hover:shadow-xl transition-all">
                      <Brain className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="flex flex-col md:flex-row md:gap-2 items-center">
                        <span>{t('demos.auditButton')}</span>
                        <span className="text-sm md:text-lg">{t('demos.auditValue')}</span>
                      </span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Demo */}
          <TabsContent value="ai" className="mt-0" id="ai">
            <Card className="glass-card shadow-card">
              <CardHeader className="p-3 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-lg bg-tech-purple/20">
                    <Bot className="w-4 h-4 md:w-6 md:h-6 text-tech-purple" />
                  </div>
                  <div>
                    <CardTitle className="font-title text-base md:text-2xl text-tech-glow">
                      {t('demos.ai.title')}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm text-muted-foreground">
                      {t('demos.ai.description')}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1.5 md:gap-2 flex-wrap">
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-tech-purple/20 text-tech-purple">{t('demos.ai.tag1')}</span>
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-tech-cyan/20 text-tech-cyan">{t('demos.ai.tag2')}</span>
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-resyne-gold/20 text-resyne-gold">{t('demos.ai.tag3')}</span>
                  <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs rounded-full bg-tech-blue/20 text-tech-blue">{t('demos.ai.tag4')}</span>
                </div>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <AIDemo />
                <div className="mt-4 md:mt-6 flex justify-center px-2">
                  <Link to="/audit" className="w-full md:w-auto">
                    <Button className="w-full md:w-auto bg-tech-purple text-white hover:bg-tech-purple/90 flex items-center justify-center gap-2 text-base md:text-lg px-6 py-6 md:px-8 md:py-7 font-bold shadow-lg hover:shadow-xl transition-all">
                      <Brain className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="flex flex-col md:flex-row md:gap-2 items-center">
                        <span>{t('demos.auditButton')}</span>
                        <span className="text-sm md:text-lg">{t('demos.auditValue')}</span>
                      </span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
