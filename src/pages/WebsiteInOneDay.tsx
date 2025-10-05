import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, Sparkles, Rocket, Globe, MessageCircle, Briefcase, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WebsiteBookingForm } from "@/components/WebsiteBookingForm";
import { SocialProofSection } from "@/components/SocialProofSection";

const WebsiteInOneDay = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    t('websiteInOneDay.features.customDomain'),
    t('websiteInOneDay.features.businessLogo'),
    t('websiteInOneDay.features.personalizedContent'),
    t('websiteInOneDay.features.socialIntegration')
  ];

  const benefits = [
    {
      icon: Zap,
      title: t('websiteInOneDay.benefits.speed.title'),
      description: t('websiteInOneDay.benefits.speed.description')
    },
    {
      icon: Sparkles,
      title: t('websiteInOneDay.benefits.ai.title'),
      description: t('websiteInOneDay.benefits.ai.description')
    },
    {
      icon: Rocket,
      title: t('websiteInOneDay.benefits.savings.title'),
      description: t('websiteInOneDay.benefits.savings.description')
    }
  ];

  const scrollToBookingForm = () => {
    const section = document.getElementById("booking-form");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden tech-web">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-subtitle text-primary">{t('websiteInOneDay.badge')}</span>
            </div>
            
            <h1 className="font-title text-5xl md:text-7xl mb-6">
              {t('websiteInOneDay.title1')}{" "}
              <span className="gradient-text">{t('websiteInOneDay.title2')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('websiteInOneDay.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToBookingForm}
                className="gap-2"
              >
                <Rocket className="w-5 h-5" />
                {t('websiteInOneDay.requestSite')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/")}
              >
                {t('websiteInOneDay.discoverMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="glass-card p-8 rounded-lg hover:shadow-tech transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-subtitle text-xl mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-title text-4xl md:text-5xl mb-6">
              {t('websiteInOneDay.features.title1')}{" "}
              <span className="gradient-text">{t('websiteInOneDay.features.title2')}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('websiteInOneDay.features.subtitle')}
            </p>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-subtitle">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-start gap-4 p-4 bg-accent/10 rounded-lg">
                <Globe className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-subtitle text-lg mb-2">{t('websiteInOneDay.features.onlinePresence.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('websiteInOneDay.features.onlinePresence.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProofSection />

      {/* Serial Entrepreneur Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-card/50 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-6 md:p-12 rounded-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-title text-2xl sm:text-3xl md:text-4xl leading-tight">
                {t("websiteBooking.entrepreneur.badge")}
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                {t("websiteBooking.entrepreneur.intro")}
              </p>
              
              <div className="grid gap-6 my-8">
                <div className="p-5 md:p-6 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-lg md:text-xl">A</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-subtitle text-lg md:text-xl mb-2 leading-snug">{t("websiteBooking.entrepreneur.caseA.title")}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("websiteBooking.entrepreneur.caseA.description")}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 md:p-6 rounded-lg bg-accent/5 border border-accent/10">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-foreground font-bold text-lg md:text-xl">B</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-subtitle text-lg md:text-xl mb-2 leading-snug">{t("websiteBooking.entrepreneur.caseB.title")}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("websiteBooking.entrepreneur.caseB.description")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-gold/10 border border-primary/20 rounded-lg p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-subtitle text-lg md:text-xl mb-3 leading-snug">{t("websiteBooking.entrepreneur.solution.title")}</h3>
                    <p className="text-base md:text-lg mb-4 leading-relaxed">{t("websiteBooking.entrepreneur.solution.description")}</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base leading-relaxed">{t("websiteBooking.entrepreneur.solution.features.domain")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base leading-relaxed">{t("websiteBooking.entrepreneur.solution.features.logo")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base leading-relaxed">{t("websiteBooking.entrepreneur.solution.features.content")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base leading-relaxed">{t("websiteBooking.entrepreneur.solution.features.cta")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl font-subtitle text-center mt-8 leading-relaxed">
                {t("websiteBooking.entrepreneur.closing")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 px-4 relative overflow-hidden" id="booking-form">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full px-6 py-2 mb-6 animate-pulse-glow">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-subtitle text-primary font-semibold uppercase tracking-wide">
                {t("websiteBooking.badge")}
              </span>
            </div>
            
            <h2 className="font-title text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {t("websiteBooking.formTitle")}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {t("websiteBooking.formSubtitle")}
            </p>
          </div>
          
          <div className="relative">
            {/* Glow effect behind form */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl -z-10"></div>
            
            {/* Form container with enhanced styling */}
            <div className="glass-card p-8 md:p-10 rounded-3xl border-2 border-primary/20 shadow-2xl">
              <WebsiteBookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebsiteInOneDay;
