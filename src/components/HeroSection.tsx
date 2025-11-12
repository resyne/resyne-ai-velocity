import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center tech-web overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-dark opacity-80"></div>
      
      {/* Floating Tech Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-tech-blue/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-resyne-gold/20 rounded-full animate-float" style={{animationDelay: "2s"}}></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-tech-purple/20 rounded-full animate-float" style={{animationDelay: "4s"}}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-resyne-gold/10 border border-resyne-gold/30 mb-6 sm:mb-8">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-resyne-gold" />
            <span className="text-xs sm:text-sm font-subtitle text-resyne-gold">
              {t('hero.badge')}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 px-2">
            <span className="gradient-text">{t('hero.title1')}</span>
            <br />
            <span className="text-glow">{t('hero.title2')}</span>
            <br />
            <span className="gradient-tech-text">{t('hero.title3')}</span>
          </h1>

          {/* Subtitle */}
          <p className="font-subtitle text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4 px-4">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 px-2 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-tech-blue/20">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-tech-blue" />
              <span className="text-xs sm:text-sm text-tech-blue font-medium whitespace-nowrap">{t('hero.stat1')}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-resyne-gold/20">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-resyne-gold"></span>
              <span className="text-xs sm:text-sm text-resyne-gold font-medium whitespace-nowrap">{t('hero.stat2')}</span>
            </div>
          </div>

          {/* Description */}
          <p 
            className="text-sm sm:text-base md:text-lg text-foreground/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
            dangerouslySetInnerHTML={{ __html: t('hero.description') }}
          />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light font-subtitle text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto animate-pulse-glow"
              onClick={() => scrollToSection('demos')}
            >
              {t('hero.discoverDemos')}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white font-subtitle text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
              onClick={() => scrollToSection('leads')}
            >
              {t('hero.requestConsultation')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-20 px-4">
            <div className="text-center py-4 sm:py-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-title gradient-text mb-2">200+</div>
              <div className="text-xs sm:text-sm font-subtitle text-muted-foreground">{t('hero.stats.implementations')}</div>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-title gradient-tech-text mb-2">95%</div>
              <div className="text-xs sm:text-sm font-subtitle text-muted-foreground">{t('hero.stats.reduction')}</div>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-title text-glow mb-2">24/7</div>
              <div className="text-xs sm:text-sm font-subtitle text-muted-foreground">{t('hero.stats.support')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
