import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Workflow, 
  Bot, 
  Clock, 
  TrendingUp,
  Layers,
  RefreshCcw,
  Mail,
  Calendar,
  FileText,
  Users,
  ShoppingCart
} from "lucide-react";
import automationHeroImage from "@/assets/automation-hero.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Automation() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Clock,
      title: "Risparmio Tempo",
      description: "Automatizza task ripetitivi e libera ore preziose per attività strategiche",
      stat: "95%",
      statLabel: "tempo risparmiato"
    },
    {
      icon: TrendingUp,
      title: "Zero Errori",
      description: "Elimina gli errori umani con processi automatizzati e affidabili",
      stat: "0%",
      statLabel: "margine di errore"
    },
    {
      icon: RefreshCcw,
      title: "Operatività 24/7",
      description: "I tuoi processi lavorano anche quando tu non ci sei",
      stat: "24/7",
      statLabel: "operatività"
    }
  ];

  const useCases = [
    {
      icon: Mail,
      title: "Email Marketing Automation",
      description: "Campagne email automatiche basate sul comportamento utente, follow-up intelligenti e nurturing leads"
    },
    {
      icon: FileText,
      title: "Gestione Documenti",
      description: "Generazione automatica di preventivi, fatture e contratti. Archiviazione e organizzazione smart"
    },
    {
      icon: Users,
      title: "CRM & Lead Management",
      description: "Acquisizione lead automatica, scoring, assegnazione e notifiche al team vendite in tempo reale"
    },
    {
      icon: Calendar,
      title: "Scheduling & Booking",
      description: "Prenotazioni automatiche, reminder, conferme e gestione calendario integrata"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Operations",
      description: "Sincronizzazione inventario, notifiche ordini, tracking spedizioni e gestione resi automatizzata"
    },
    {
      icon: Layers,
      title: "Integrazioni Multi-piattaforma",
      description: "Connessione tra tutti i tuoi strumenti: CRM, ERP, contabilità, marketing e customer service"
    }
  ];

  const tools = [
    { name: "Make", description: "Automazioni visuali avanzate" },
    { name: "Zapier", description: "Connessioni tra 5000+ app" },
    { name: "n8n", description: "Workflow open-source" },
    { name: "Custom APIs", description: "Integrazioni su misura" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-4"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.95)), url(${automationHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-tiffany/10 border border-tiffany/30 mb-8">
              <Zap className="w-4 h-4 mr-2 text-tiffany" />
              <span className="text-sm font-medium text-tiffany">Automation Solutions</span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <span className="text-foreground">Automatizza</span>
              <br />
              <span className="gradient-text">i Tuoi Processi</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Libera il tuo team dalle attività ripetitive. Con le nostre soluzioni di automazione, 
              i tuoi processi aziendali lavorano in modo intelligente, 24 ore su 24.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-tiffany text-gunmetal hover:bg-tiffany-light font-medium text-lg px-8 py-4 h-auto"
                onClick={() => navigate('/book-a-call')}
              >
                Richiedi Consulenza
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-foreground/30 text-foreground hover:bg-foreground hover:text-background font-medium text-lg px-8 py-4 h-auto"
                onClick={() => {
                  const element = document.getElementById('use-cases');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Scopri i Casi d'Uso
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gunmetal-light">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4">
              Perché <span className="gradient-text">Automatizzare</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              L'automazione non è un lusso, è una necessità competitiva
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-background/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8 text-center hover:border-tiffany/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-tiffany/20 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-tiffany" />
                </div>
                <div className="text-4xl font-heading text-tiffany mb-2">{benefit.stat}</div>
                <div className="text-sm text-muted-foreground mb-4">{benefit.statLabel}</div>
                <h3 className="font-heading text-xl mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4">
              Cosa Possiamo <span className="gradient-text">Automatizzare</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ogni processo ripetitivo nella tua azienda può essere automatizzato
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className="group bg-gunmetal-light border border-border/30 rounded-xl p-6 hover:border-tiffany/50 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-tiffany/20 flex items-center justify-center mb-4 group-hover:bg-tiffany/30 transition-colors">
                  <useCase.icon className="w-6 h-6 text-tiffany" />
                </div>
                <h3 className="font-heading text-lg mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4 bg-gunmetal-light">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4">
              I Nostri <span className="gradient-text">Strumenti</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Utilizziamo le migliori piattaforme di automazione sul mercato
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 text-center hover:border-tiffany/50 transition-colors"
              >
                <Workflow className="w-10 h-10 text-tiffany mx-auto mb-4" />
                <h3 className="font-heading text-lg mb-1">{tool.name}</h3>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4">
              Come <span className="gradient-text">Lavoriamo</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analisi", description: "Mappiamo i tuoi processi e identifichiamo le opportunità di automazione" },
              { step: "02", title: "Design", description: "Progettiamo il workflow ottimale con le tecnologie più adatte" },
              { step: "03", title: "Implementazione", description: "Sviluppiamo e testiamo le automazioni in ambiente sicuro" },
              { step: "04", title: "Ottimizzazione", description: "Monitoriamo le performance e ottimizziamo continuamente" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-heading text-tiffany/20 mb-4">{item.step}</div>
                <h3 className="font-heading text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-8 h-0.5 bg-tiffany/30 translate-x-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-tiffany/10">
        <div className="container mx-auto max-w-4xl text-center">
          <Bot className="w-16 h-16 text-tiffany mx-auto mb-6" />
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6">
            Pronto a <span className="gradient-text">Automatizzare</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Richiedi una consulenza gratuita. Analizzeremo i tuoi processi e ti mostreremo 
            come l'automazione può trasformare la tua azienda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-tiffany text-gunmetal hover:bg-tiffany-light font-medium text-lg px-8 py-4 h-auto"
              onClick={() => navigate('/book-a-call')}
            >
              Prenota una Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
