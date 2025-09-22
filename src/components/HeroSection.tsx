import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";
import resyneLogoWhite from "@/assets/resyne-logo-white.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center tech-web overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-dark opacity-80"></div>
      
      {/* Floating Tech Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-tech-blue/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-resyne-gold/20 rounded-full animate-float" style={{animationDelay: "2s"}}></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-tech-purple/20 rounded-full animate-float" style={{animationDelay: "4s"}}></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-resyne-gold/10 border border-resyne-gold/30 mb-8">
            <Zap className="w-4 h-4 mr-2 text-resyne-gold" />
            <span className="text-sm font-subtitle text-resyne-gold">
              Rivoluzione AI per le Aziende
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-title text-5xl md:text-7xl lg:text-8xl mb-6">
            <span className="gradient-text">Soluzioni ERP</span>
            <br />
            <span className="text-glow">con AI</span>
            <br />
            <span className="gradient-tech-text">10x Più Veloci</span>
          </h1>

          {/* Subtitle */}
          <p className="font-subtitle text-xl md:text-2xl text-muted-foreground mb-4">
            Implementazioni rivoluzionarie per la tua azienda
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-tech-blue/20">
              <TrendingUp className="w-4 h-4 text-tech-blue" />
              <span className="text-sm text-tech-blue font-medium">10x Più Rapidi</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-resyne-gold/20">
              <span className="w-2 h-2 rounded-full bg-resyne-gold"></span>
              <span className="text-sm text-resyne-gold font-medium">10x Più Economici</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            <img src={resyneLogoWhite} alt="RESYNE" className="inline h-6 w-auto mx-1" /> è specializzata in <strong className="text-resyne-gold">Automation</strong>, 
            implementazioni <strong className="text-tech-blue">AI</strong> ed 
            <strong className="gradient-text"> ERP</strong> per trasformare la tua azienda 
            con soluzioni innovative e performanti.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light font-subtitle text-lg px-8 py-4 h-auto animate-pulse-glow"
            >
              Scopri le Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white font-subtitle text-lg px-8 py-4 h-auto"
            >
              Richiedi Consulenza Gratuita
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-title gradient-text mb-2">200+</div>
              <div className="text-sm font-subtitle text-muted-foreground">Implementazioni Completate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-title gradient-tech-text mb-2">95%</div>
              <div className="text-sm font-subtitle text-muted-foreground">Riduzione Tempi Processo</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-title text-glow mb-2">24/7</div>
              <div className="text-sm font-subtitle text-muted-foreground">Supporto Automatizzato AI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}