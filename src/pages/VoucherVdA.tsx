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
  Zap,
  Cloud,
  Lock,
  Brain
} from "lucide-react";

export default function VoucherVdA() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const solutions = [
    {
      icon: Network,
      title: t('voucherVdA.solutions.management.title'),
      description: t('voucherVdA.solutions.management.description')
    },
    {
      icon: Brain,
      title: t('voucherVdA.solutions.ai.title'),
      description: t('voucherVdA.solutions.ai.description')
    },
    {
      icon: Cloud,
      title: t('voucherVdA.solutions.cloud.title'),
      description: t('voucherVdA.solutions.cloud.description')
    },
    {
      icon: Lock,
      title: t('voucherVdA.solutions.security.title'),
      description: t('voucherVdA.solutions.security.description')
    }
  ];

  const technologiesMain = [
    {
      icon: Cpu,
      title: t('voucherVdA.technologies.main.robotics'),
      items: [
        t('voucherVdA.technologies.main.roboticsItems.0'),
        t('voucherVdA.technologies.main.roboticsItems.1')
      ]
    },
    {
      icon: Network,
      title: t('voucherVdA.technologies.main.iot'),
      items: [
        t('voucherVdA.technologies.main.iotItems.0'),
        t('voucherVdA.technologies.main.iotItems.1')
      ]
    },
    {
      icon: Brain,
      title: t('voucherVdA.technologies.main.ai'),
      items: [
        t('voucherVdA.technologies.main.aiItems.0'),
        t('voucherVdA.technologies.main.aiItems.1')
      ]
    },
    {
      icon: Shield,
      title: t('voucherVdA.technologies.main.security'),
      items: [
        t('voucherVdA.technologies.main.securityItems.0'),
        t('voucherVdA.technologies.main.securityItems.1')
      ]
    }
  ];

  const eligibility = [
    t('voucherVdA.eligibility.mpmi'),
    t('voucherVdA.eligibility.location'),
    t('voucherVdA.eligibility.registered'),
    t('voucherVdA.eligibility.sectors')
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 tech-web overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-2 rounded-full glass-card mb-4">
              <span className="text-sm font-subtitle text-resyne-gold">
                {t('voucherVdA.hero.badge')}
              </span>
            </div>
            <h1 className="font-title text-4xl md:text-5xl lg:text-6xl leading-tight">
              {t('voucherVdA.hero.title')} <br />
              <span className="gradient-text">{t('voucherVdA.hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('voucherVdA.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                size="lg"
                className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light"
                onClick={() => navigate('/book-a-call')}
              >
                {t('voucherVdA.hero.cta')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-resyne-gold text-resyne-gold hover:bg-resyne-gold hover:text-resyne-dark"
                onClick={() => window.open('https://www.ao.camcom.it/voucher-digit-vda-2025', '_blank')}
              >
                {t('voucherVdA.hero.documentation')} <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <Lightbulb className="h-5 w-5 text-resyne-gold" />
                <span className="text-sm font-subtitle text-resyne-gold">
                  {t('voucherVdA.intro.badge')}
                </span>
              </div>
              <h2 className="font-title text-3xl md:text-4xl">
                {t('voucherVdA.intro.title')}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t('voucherVdA.intro.description1')}</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-resyne-gold mt-0.5 flex-shrink-0" />
                    <span>{t('voucherVdA.intro.service1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-resyne-gold mt-0.5 flex-shrink-0" />
                    <span>{t('voucherVdA.intro.service2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-resyne-gold mt-0.5 flex-shrink-0" />
                    <span>{t('voucherVdA.intro.service3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-resyne-gold mt-0.5 flex-shrink-0" />
                    <span>{t('voucherVdA.intro.service4')}</span>
                  </li>
                </ul>
              </div>
            </div>
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-resyne-gold/10">
                    <Euro className="h-6 w-6 text-resyne-gold" />
                  </div>
                  <div>
                    <h3 className="font-subtitle text-xl mb-2">{t('voucherVdA.intro.fundingTitle')}</h3>
                    <p className="text-3xl font-title text-resyne-gold">€3.500 - €15.000</p>
                    <p className="text-sm text-muted-foreground mt-1">{t('voucherVdA.intro.fundingNote')}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-border/20">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-resyne-gold" />
                    <span>{t('voucherVdA.intro.benefit1')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-resyne-gold" />
                    <span>{t('voucherVdA.intro.benefit2')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-resyne-gold" />
                    <span>{t('voucherVdA.intro.benefit3')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-title text-3xl md:text-4xl">
              {t('voucherVdA.solutions.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('voucherVdA.solutions.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <Card key={index} className="glass-card hover:border-resyne-gold/40 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 rounded-lg bg-resyne-gold/10 w-fit">
                    <solution.icon className="h-6 w-6 text-resyne-gold" />
                  </div>
                  <h3 className="font-subtitle text-xl">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility and Funding */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-resyne-gold" />
                  <h2 className="font-title text-2xl">{t('voucherVdA.eligibility.title')}</h2>
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
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Euro className="h-8 w-8 text-tech-blue" />
                  <h2 className="font-title text-2xl">{t('voucherVdA.funding.title')}</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('voucherVdA.funding.budget')}</p>
                    <p className="text-2xl font-title text-resyne-gold">€813.008</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('voucherVdA.funding.range')}</p>
                    <p className="text-2xl font-title">€3.500 - €15.000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('voucherVdA.funding.intensity')}</p>
                    <p className="text-xl font-title text-tech-blue">70%</p>
                  </div>
                  <div className="pt-4 border-t border-border/20">
                    <p className="text-sm text-muted-foreground">{t('voucherVdA.funding.minimum')}</p>
                    <p className="text-xl font-subtitle">€5.000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-title text-3xl md:text-4xl">
              {t('voucherVdA.technologies.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('voucherVdA.technologies.subtitle')}
            </p>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-subtitle text-2xl mb-6 flex items-center gap-3">
                <Zap className="h-6 w-6 text-resyne-gold" />
                {t('voucherVdA.technologies.mainTitle')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {technologiesMain.map((tech, index) => (
                  <Card key={index} className="glass-card hover:border-resyne-gold/40 transition-all">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-resyne-gold/10">
                          <tech.icon className="h-5 w-5 text-resyne-gold" />
                        </div>
                        <h4 className="font-subtitle text-lg">{tech.title}</h4>
                      </div>
                      <ul className="space-y-2 pl-2">
                        {tech.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-tech-blue mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="glass-card border-tech-blue/20">
              <CardContent className="p-8">
                <h3 className="font-subtitle text-xl mb-4 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-tech-blue" />
                  {t('voucherVdA.technologies.complementaryTitle')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-tech-blue" />
                      <span>{t('voucherVdA.technologies.complementary.ecommerce')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-tech-blue" />
                      <span>{t('voucherVdA.technologies.complementary.fintech')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-tech-blue" />
                      <span>{t('voucherVdA.technologies.complementary.marketing')}</span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-tech-blue" />
                      <span>{t('voucherVdA.technologies.complementary.green')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-tech-blue" />
                      <span>{t('voucherVdA.technologies.complementary.automation')}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-title text-3xl md:text-4xl">
              {t('voucherVdA.application.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-resyne-gold" />
                  <h3 className="font-subtitle text-xl">{t('voucherVdA.application.phases.title')}</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-subtitle text-resyne-gold mb-2">{t('voucherVdA.application.phases.phase1')}</p>
                    <p className="text-sm text-muted-foreground">{t('voucherVdA.application.phases.phase1Dates')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-subtitle text-resyne-gold mb-2">{t('voucherVdA.application.phases.phase2')}</p>
                    <p className="text-sm text-muted-foreground">{t('voucherVdA.application.phases.phase2Dates')}</p>
                  </div>
                  <div className="pt-4 border-t border-border/20 space-y-2">
                    <p className="text-sm text-tech-blue flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {t('voucherVdA.application.phases.ranking')}
                    </p>
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {t('voucherVdA.application.phases.warning')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card border-tech-blue/20">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-tech-blue" />
                  <h3 className="font-subtitle text-xl">{t('voucherVdA.application.documentation.title')}</h3>
                </div>
                <p className="text-muted-foreground">{t('voucherVdA.application.documentation.description')}</p>
                <Button 
                  variant="outline"
                  className="w-full border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white"
                  onClick={() => window.open('https://www.ao.camcom.it/voucher-digit-vda-2025', '_blank')}
                >
                  {t('voucherVdA.application.documentation.download')} <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why RESYNE */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="glass-card border-resyne-gold/20">
            <CardContent className="p-8 md:p-12 space-y-6">
              <h2 className="font-title text-3xl md:text-4xl text-center">
                {t('voucherVdA.whyResyne.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-resyne-gold/10">
                    <CheckCircle className="h-6 w-6 text-resyne-gold" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('voucherVdA.whyResyne.reason1')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-resyne-gold/10">
                    <CheckCircle className="h-6 w-6 text-resyne-gold" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('voucherVdA.whyResyne.reason2')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-resyne-gold/10">
                    <CheckCircle className="h-6 w-6 text-resyne-gold" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('voucherVdA.whyResyne.reason3')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-resyne-gold/10">
                    <CheckCircle className="h-6 w-6 text-resyne-gold" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('voucherVdA.whyResyne.reason4')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-resyne-gold/10">
                    <CheckCircle className="h-6 w-6 text-resyne-gold" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('voucherVdA.whyResyne.reason5')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <GrantBookingSection grantName="Voucher Digit VdA" />

      <Footer />
    </div>
  );
}
