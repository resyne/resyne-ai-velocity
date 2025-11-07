import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GrantBookingSection } from "@/components/GrantBookingSection";
import { useEffect } from "react";
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
  Lightbulb
} from "lucide-react";

export default function BandoPID() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Remove any hash from URL that might cause scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    // Ensure scroll position is maintained at top
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const solutions = [
    {
      icon: Network,
      title: t('bandoPID.solutions.management.title'),
      description: t('bandoPID.solutions.management.description')
    },
    {
      icon: Cpu,
      title: t('bandoPID.solutions.ai.title'),
      description: t('bandoPID.solutions.ai.description')
    },
    {
      icon: TrendingUp,
      title: t('bandoPID.solutions.booking.title'),
      description: t('bandoPID.solutions.booking.description')
    },
    {
      icon: Sparkles,
      title: t('bandoPID.solutions.experiences.title'),
      description: t('bandoPID.solutions.experiences.description')
    }
  ];

  const interventionAreas = [
    {
      id: 'A',
      icon: Network,
      title: t('bandoPID.interventions.digital.title'),
      description: t('bandoPID.interventions.digital.description'),
      resyne: t('bandoPID.interventions.digital.resyne')
    },
    {
      id: 'B',
      icon: Cpu,
      title: t('bandoPID.interventions.ai.title'),
      description: t('bandoPID.interventions.ai.description'),
      resyne: t('bandoPID.interventions.ai.resyne')
    },
    {
      id: 'C',
      icon: Sparkles,
      title: t('bandoPID.interventions.experiences.title'),
      description: t('bandoPID.interventions.experiences.description'),
      resyne: t('bandoPID.interventions.experiences.resyne')
    },
    {
      id: 'D',
      icon: Shield,
      title: t('bandoPID.interventions.security.title'),
      description: t('bandoPID.interventions.security.description'),
      resyne: t('bandoPID.interventions.security.resyne')
    },
    {
      id: 'E',
      icon: Users,
      title: t('bandoPID.interventions.integrated.title'),
      description: t('bandoPID.interventions.integrated.description'),
      resyne: t('bandoPID.interventions.integrated.resyne')
    }
  ];

  const eligibility = [
    t('bandoPID.eligibility.registered'),
    t('bandoPID.eligibility.location'),
    t('bandoPID.eligibility.sectors')
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
                {t('bandoPID.hero.badge')}
              </span>
            </div>
            <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight px-2">
              {t('bandoPID.hero.title')} <br />
              <span className="gradient-text">{t('bandoPID.hero.titleHighlight')}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {t('bandoPID.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center pt-3 sm:pt-4">
              <Button 
                size="lg"
                className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light"
                onClick={() => navigate('/book-a-call')}
              >
                {t('bandoPID.hero.cta')} <ArrowRight className="ml-2 h-4 w-4" />
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
                  {t('bandoPID.intro.badge')}
                </span>
              </div>
              <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
                {t('bandoPID.intro.title')}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                {t('bandoPID.intro.description')}
              </p>
            </div>
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-resyne-gold/10">
                    <Euro className="h-6 w-6 text-resyne-gold" />
                  </div>
                  <div>
                    <h3 className="font-subtitle text-xl mb-2">{t('bandoPID.intro.fundingTitle')}</h3>
                    <p className="text-3xl font-title text-resyne-gold">€10,000</p>
                    <p className="text-sm text-muted-foreground mt-1">{t('bandoPID.intro.fundingNote')}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-border/20">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-resyne-gold" />
                    <span>{t('bandoPID.intro.benefit1')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-resyne-gold" />
                    <span>{t('bandoPID.intro.benefit2')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-resyne-gold" />
                    <span>{t('bandoPID.intro.benefit3')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12 px-4">
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
              {t('bandoPID.solutions.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('bandoPID.solutions.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {solutions.map((solution, index) => (
              <Card key={index} className="glass-card hover:border-resyne-gold/40 transition-all">
                <CardContent className="p-4 sm:p-5 md:p-6 space-y-3 md:space-y-4">
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

      {/* Eligibility */}
      <section className="py-12 md:py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-resyne-gold" />
                  <h2 className="font-title text-2xl">{t('bandoPID.eligibility.title')}</h2>
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
                  <h2 className="font-title text-2xl">{t('bandoPID.funding.title')}</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('bandoPID.funding.amount')}</p>
                    <p className="text-3xl font-title text-resyne-gold">€10,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('bandoPID.funding.minimum')}</p>
                    <p className="text-2xl font-title">€20,000</p>
                  </div>
                  <div className="pt-4 border-t border-border/20">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-tech-blue" />
                      <p className="text-sm font-subtitle">{t('bandoPID.funding.bonus')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Intervention Areas */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12 px-4">
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
              {t('bandoPID.interventions.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('bandoPID.interventions.subtitle')}
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            {interventionAreas.map((area) => (
              <Card key={area.id} className="glass-card hover:border-resyne-gold/40 transition-all">
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="p-4 rounded-lg bg-resyne-gold/10 w-fit">
                        <area.icon className="h-8 w-8 text-resyne-gold" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-title text-resyne-gold">{area.id}</span>
                        <h3 className="font-subtitle text-xl">{area.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{area.description}</p>
                      <div className="flex items-start gap-2 pt-2 pl-4 border-l-2 border-tech-blue/30">
                        <ArrowRight className="h-5 w-5 text-tech-blue mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-tech-blue/90">{area.resyne}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 md:py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12 px-4">
            <h2 className="font-title text-2xl sm:text-3xl md:text-4xl">
              {t('bandoPID.application.title')}
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="glass-card border-resyne-gold/20">
              <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-resyne-gold" />
                  <h3 className="font-subtitle text-xl">{t('bandoPID.application.deadline.title')}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('bandoPID.application.deadline.from')}</p>
                    <p className="text-xl font-subtitle">{t('bandoPID.application.deadline.fromDate')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('bandoPID.application.deadline.to')}</p>
                    <p className="text-xl font-subtitle text-resyne-gold">{t('bandoPID.application.deadline.toDate')}</p>
                  </div>
                  <div className="pt-4 border-t border-border/20">
                    <p className="text-sm text-destructive">{t('bandoPID.application.deadline.warning')}</p>
                  </div>
                  <div className="pt-4">
                    <Button 
                      size="lg"
                      className="w-full bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light"
                      onClick={() => {
                        const bookingSection = document.getElementById('booking-section');
                        bookingSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {t('bandoPID.hero.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="booking-section">
        <GrantBookingSection grantName="Bando PID Salerno" />
      </section>

      <Footer />
    </div>
  );
}
