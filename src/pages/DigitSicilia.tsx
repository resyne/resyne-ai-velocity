import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GrantBookingSection } from "@/components/GrantBookingSection";
import { 
  Sparkles, 
  TrendingUp, 
  Cpu, 
  Network, 
  Shield, 
  Users, 
  Calendar,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Building2,
  Euro,
  FileText,
  Lightbulb,
  Bot,
  BarChart,
  Lock
} from "lucide-react";

export default function DigitSicilia() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    {
      icon: CheckCircle,
      text: t('digitSicilia.intro.service1')
    },
    {
      icon: CheckCircle,
      text: t('digitSicilia.intro.service2')
    },
    {
      icon: CheckCircle,
      text: t('digitSicilia.intro.service3')
    },
    {
      icon: CheckCircle,
      text: t('digitSicilia.intro.service4')
    },
    {
      icon: CheckCircle,
      text: t('digitSicilia.intro.service5')
    }
  ];

  const crmFeatures = [
    t('digitSicilia.solutions.crm.feature1'),
    t('digitSicilia.solutions.crm.feature2'),
    t('digitSicilia.solutions.crm.feature3'),
    t('digitSicilia.solutions.crm.feature4')
  ];

  const erpFeatures = [
    t('digitSicilia.solutions.erp.feature1'),
    t('digitSicilia.solutions.erp.feature2'),
    t('digitSicilia.solutions.erp.feature3'),
    t('digitSicilia.solutions.erp.feature4')
  ];

  const aiFeatures = [
    t('digitSicilia.solutions.ai.feature1'),
    t('digitSicilia.solutions.ai.feature2'),
    t('digitSicilia.solutions.ai.feature3')
  ];

  const digitalFeatures = [
    t('digitSicilia.solutions.digital.feature1'),
    t('digitSicilia.solutions.digital.feature2')
  ];

  const eligibility = [
    t('digitSicilia.eligibility.active'),
    t('digitSicilia.eligibility.location'),
    t('digitSicilia.eligibility.registered')
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-20 px-4 tech-web overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-2 sm:mb-4">
              <span className="text-sm font-subtitle text-resyne-gold">
                {t('digitSicilia.hero.badge')}
              </span>
            </div>
            <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight px-2">
              {t('digitSicilia.hero.title')} <br />
              <span className="gradient-text">{t('digitSicilia.hero.titleHighlight')}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {t('digitSicilia.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center pt-3 sm:pt-4">
              <Button 
                size="lg"
                className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light"
                onClick={() => navigate('/book-a-call')}
              >
                {t('digitSicilia.hero.cta')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-resyne-gold text-resyne-gold hover:bg-resyne-gold hover:text-resyne-dark"
                onClick={() => window.open('https://www.regione.sicilia.it/istituzioni/regione/strutture-regionali/presidenza-regione/dipartimento-programmazione/avviso-digit-imprese', '_blank')}
              >
                {t('digitSicilia.hero.documentation')} <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-resyne-gold" />
                <span className="text-xs sm:text-sm font-subtitle text-resyne-gold">
                  {t('digitSicilia.intro.badge')}
                </span>
              </div>
              <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
                {t('digitSicilia.intro.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('digitSicilia.intro.description')}
              </p>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <service.icon className="h-5 w-5 text-resyne-gold mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{service.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-resyne-gold/10">
                    <Euro className="h-6 w-6 text-resyne-gold" />
                  </div>
                  <div>
                    <h3 className="font-subtitle text-xl mb-2">{t('digitSicilia.intro.fundingTitle')}</h3>
                    <p className="text-3xl font-title text-resyne-gold">80%</p>
                    <p className="text-sm text-muted-foreground mt-1">{t('digitSicilia.intro.fundingNote')}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-border/20">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('digitSicilia.intro.microLabel')}</p>
                    <p className="text-xl font-subtitle">€20.000 - €60.000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('digitSicilia.intro.smallLabel')}</p>
                    <p className="text-xl font-subtitle">€20.000 - €100.000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('digitSicilia.intro.mediumLabel')}</p>
                    <p className="text-xl font-subtitle">€20.000 - €150.000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Build - CRM */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12 px-4">
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
              {t('digitSicilia.solutions.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('digitSicilia.solutions.subtitle')}
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* CRM */}
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-resyne-gold/10">
                    <Users className="h-8 w-8 text-resyne-gold" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-title text-2xl">{t('digitSicilia.solutions.crm.title')}</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {crmFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-tech-blue mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ERP */}
            <Card className="glass-card border-tech-blue/20">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-tech-blue/10">
                    <Network className="h-8 w-8 text-tech-blue" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-title text-2xl">{t('digitSicilia.solutions.erp.title')}</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {erpFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-resyne-gold mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI & Automation */}
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-resyne-gold/10">
                    <Bot className="h-8 w-8 text-resyne-gold" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-title text-2xl">{t('digitSicilia.solutions.ai.title')}</h3>
                    <ul className="space-y-3">
                      {aiFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-tech-blue mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Digital Experiences & Security */}
            <Card className="glass-card border-tech-blue/20">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-lg bg-tech-blue/10">
                    <Lock className="h-8 w-8 text-tech-blue" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-title text-2xl">{t('digitSicilia.solutions.digital.title')}</h3>
                    <ul className="space-y-3">
                      {digitalFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-resyne-gold mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Eligibility and Funding */}
      <section className="py-12 md:py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-resyne-gold" />
                  <h2 className="font-title text-2xl">{t('digitSicilia.eligibility.title')}</h2>
                </div>
                <ul className="space-y-4">
                  {eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-resyne-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="glass-card border-tech-blue/20">
              <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3">
                  <Euro className="h-8 w-8 text-tech-blue" />
                  <h2 className="font-title text-2xl">{t('digitSicilia.funding.title')}</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('digitSicilia.funding.budget')}</p>
                    <p className="text-2xl font-title text-resyne-gold">€9.624.859</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('digitSicilia.funding.intensity')}</p>
                    <p className="text-3xl font-title text-tech-blue">80%</p>
                  </div>
                  <div className="pt-4 border-t border-border/20 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{t('digitSicilia.funding.microRange')}</p>
                      <p className="text-lg font-subtitle">€20.000 - €60.000</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('digitSicilia.funding.smallRange')}</p>
                      <p className="text-lg font-subtitle">€20.000 - €100.000</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('digitSicilia.funding.mediumRange')}</p>
                      <p className="text-lg font-subtitle">€20.000 - €150.000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12 px-4">
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
              {t('digitSicilia.application.title')}
            </h2>
          </div>
          <Card className="glass-card border-resyne-gold/20 max-w-3xl mx-auto">
            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12 space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="h-8 w-8 text-resyne-gold" />
                <h3 className="font-subtitle text-xl">{t('digitSicilia.application.deadline.title')}</h3>
              </div>
              <div className="text-center space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('digitSicilia.application.deadline.label')}</p>
                  <p className="text-2xl font-title text-resyne-gold">{t('digitSicilia.application.deadline.date')}</p>
                </div>
                <div className="pt-4 border-t border-border/20 space-y-3">
                  <p className="text-sm text-tech-blue flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    {t('digitSicilia.application.deadline.online')}
                  </p>
                  <p className="text-sm text-tech-blue flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    {t('digitSicilia.application.deadline.procedure')}
                  </p>
                  <p className="text-sm text-destructive flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    {t('digitSicilia.application.deadline.warning')}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline"
                className="w-full border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white mt-6"
                onClick={() => window.open('https://www.regione.sicilia.it/istituzioni/regione/strutture-regionali/presidenza-regione/dipartimento-programmazione/avviso-digit-imprese', '_blank')}
              >
                {t('digitSicilia.application.documentation')} <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <GrantBookingSection grantName="DIGIT IMPRESE Sicilia" />

      <Footer />
    </div>
  );
}
