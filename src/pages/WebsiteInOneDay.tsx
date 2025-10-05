import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, Sparkles, Rocket, Globe, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WebsiteInOneDay = () => {
  const navigate = useNavigate();

  const features = [
    "Custom domain",
    "Business logo",
    "Personalized content & CTAs",
    "All connected to your social media and WhatsApp"
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Velocità Estrema",
      description: "Il tuo sito web è pronto in sole 24 ore, non settimane o mesi"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Development",
      description: "Team di sviluppatori formati sullo sviluppo con intelligenza artificiale"
    },
    {
      icon: Rocket,
      title: "75% di Risparmio",
      description: "Costi drasticamente ridotti senza compromettere la qualità"
    }
  ];

  const scrollToContact = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("contattaci");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
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
              <span className="text-sm font-subtitle text-primary">Sviluppo AI-Powered</span>
            </div>
            
            <h1 className="font-title text-5xl md:text-7xl mb-6">
              Il Tuo Sito Web in{" "}
              <span className="gradient-text">1 Giorno</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Grazie al nostro team di sviluppatori formati sull'intelligenza artificiale, 
              creiamo siti web professionali in tempi record con un risparmio del 75%
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="gap-2"
              >
                <Rocket className="w-5 h-5" />
                Richiedi il Tuo Sito
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/")}
              >
                Scopri di Più
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
              Cosa Include il Tuo{" "}
              <span className="gradient-text">Sito Web</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tutto ciò di cui hai bisogno per una presenza online professionale
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
                  <h4 className="font-subtitle text-lg mb-2">Presenza Online Completa</h4>
                  <p className="text-muted-foreground">
                    Il tuo sito sarà completamente integrato con tutti i tuoi canali social 
                    e WhatsApp per massimizzare il contatto con i tuoi clienti
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-title text-4xl md:text-5xl mb-6">
              Come <span className="gradient-tech-text">Funziona</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                1
              </div>
              <h3 className="font-subtitle text-xl mb-3">Contattaci</h3>
              <p className="text-muted-foreground">
                Parlaci del tuo business e delle tue esigenze
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                2
              </div>
              <h3 className="font-subtitle text-xl mb-3">Sviluppo AI</h3>
              <p className="text-muted-foreground">
                Il nostro team crea il tuo sito con tecnologie AI avanzate
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                3
              </div>
              <h3 className="font-subtitle text-xl mb-3">Vai Online</h3>
              <p className="text-muted-foreground">
                In 24 ore il tuo sito è online e pronto a generare business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-12 rounded-2xl text-center">
            <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-title text-3xl md:text-4xl mb-6">
              Pronto a Portare il Tuo Business Online?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contattaci oggi e ricevi il tuo sito web professionale in sole 24 ore, 
              risparmiando il 75% rispetto ai metodi tradizionali
            </p>
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="gap-2"
            >
              <Rocket className="w-5 h-5" />
              Richiedi il Tuo Sito Ora
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebsiteInOneDay;
