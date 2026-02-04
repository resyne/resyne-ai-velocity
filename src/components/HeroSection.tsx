import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroBackground from "@/assets/hero-background.jpg";

export function HeroSection() {
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-16"
      style={{ 
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12">
        <div className="text-center max-w-5xl mx-auto">

          {/* Main Title */}
          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-7xl mb-3 sm:mb-6 px-2 leading-tight">
            <span className="text-foreground">{t('hero.title1')}</span>
            <br />
            <span className="gradient-text">{t('hero.title2')}</span>
            <br />
            <span className="text-foreground">{t('hero.title3')}</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4 px-4">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 px-2 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-tiffany/20">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-tiffany" />
              <span className="text-xs sm:text-sm text-tiffany font-medium whitespace-nowrap">{t('hero.stat1')}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-foreground/10">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-tiffany"></span>
              <span className="text-xs sm:text-sm text-gray-light font-medium whitespace-nowrap">{t('hero.stat2')}</span>
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
              className="w-full sm:w-auto bg-tiffany text-gunmetal hover:bg-tiffany-light font-medium text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto transition-colors"
              onClick={() => scrollToSection('demos')}
            >
              {t('hero.discoverDemos')}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-foreground/30 text-foreground hover:bg-foreground hover:text-background font-medium text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto transition-colors"
              onClick={() => scrollToSection('leads')}
            >
              {t('hero.requestConsultation')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-20 px-2 sm:px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl md:text-5xl font-heading text-tiffany mb-1 sm:mb-2">200+</div>
              <div className="text-[10px] sm:text-sm font-body text-muted-foreground leading-tight">{t('hero.stats.implementations')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl md:text-5xl font-heading text-foreground mb-1 sm:mb-2">95%</div>
              <div className="text-[10px] sm:text-sm font-body text-muted-foreground leading-tight">{t('hero.stats.reduction')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl md:text-5xl font-heading text-tiffany mb-1 sm:mb-2">24/7</div>
              <div className="text-[10px] sm:text-sm font-body text-muted-foreground leading-tight">{t('hero.stats.support')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
