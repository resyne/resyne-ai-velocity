import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Image, 
  FileText,
  BarChart3,
  Globe,
  Mic,
  Video,
  Sparkles,
  Bot
} from "lucide-react";
import aiHeroImage from "@/assets/ai-solutions-hero.jpg";
import { useNavigate } from "react-router-dom";

export default function AISolutions() {
  const navigate = useNavigate();

  const aiCapabilities = [
    {
      icon: Phone,
      title: "AI Phone Agents",
      description: "Agenti vocali intelligenti che gestiscono chiamate in entrata e uscita, prenotazioni e customer service 24/7",
      highlight: "24/7 Operativi"
    },
    {
      icon: MessageSquare,
      title: "Chatbot & Assistenti Virtuali",
      description: "Assistenti conversazionali multi-lingua che rispondono ai clienti, qualificano lead e supportano le vendite",
      highlight: "Multi-lingua"
    },
    {
      icon: Image,
      title: "Generazione Immagini",
      description: "Creazione automatica di contenuti visivi per marketing, social media e comunicazione aziendale",
      highlight: "Marketing AI"
    },
    {
      icon: Video,
      title: "Video AI & Avatar",
      description: "Produzione video automatizzata con avatar digitali per formazione, marketing e comunicazione interna",
      highlight: "Avatar Digitali"
    },
    {
      icon: FileText,
      title: "Analisi Documenti",
      description: "Estrazione intelligente di dati da contratti, fatture e documenti. OCR avanzato e classificazione automatica",
      highlight: "OCR Avanzato"
    },
    {
      icon: BarChart3,
      title: "Data Analytics AI",
      description: "Interpretazione automatica dei dati aziendali, report intelligenti e previsioni basate su machine learning",
      highlight: "Predictive AI"
    },
    {
      icon: Globe,
      title: "Traduzioni AI",
      description: "Traduzione simultanea di contenuti, documenti e comunicazioni in tempo reale con qualità professionale",
      highlight: "Real-time"
    },
    {
      icon: Mic,
      title: "Speech-to-Text & Voice",
      description: "Trascrizione automatica di riunioni, call e contenuti audio. Riconoscimento vocale avanzato",
      highlight: "Trascrizione Auto"
    }
  ];

  const useCases = [
    {
      industry: "E-commerce",
      applications: ["Chatbot vendita", "Generazione descrizioni prodotti", "Customer service automatico"]
    },
    {
      industry: "Hospitality",
      applications: ["Booking AI", "Concierge virtuale", "Recensioni automatiche"]
    },
    {
      industry: "Real Estate",
      applications: ["Qualificazione lead", "Tour virtuali AI", "Analisi mercato"]
    },
    {
      industry: "Healthcare",
      applications: ["Triage AI", "Prenotazioni automatiche", "Reminder pazienti"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-4"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.95)), url(${aiHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-tiffany/10 border border-tiffany/30 mb-8">
              <Brain className="w-4 h-4 mr-2 text-tiffany" />
              <span className="text-sm font-medium text-tiffany">AI Solutions</span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <span className="text-foreground">Intelligenza</span>
              <br />
              <span className="gradient-text">Artificiale Applicata</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Trasformiamo l'AI da buzzword a vantaggio competitivo concreto. 
              Soluzioni pratiche che generano risultati misurabili per la tua azienda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-tiffany text-gunmetal hover:bg-tiffany-light font-medium text-lg px-8 py-4 h-auto"
                onClick={() => navigate('/book-a-call')}
              >
                Richiedi Consulenza AI
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-foreground/30 text-foreground hover:bg-foreground hover:text-background font-medium text-lg px-8 py-4 h-auto"
                onClick={() => navigate('/audit')}
              >
                Audit AI Gratuito
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Grid */}
      <section className="py-20 px-4 bg-gunmetal-light">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4">
              Le Nostre <span className="gradient-text">Soluzioni AI</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tecnologie all'avanguardia applicate ai tuoi processi di business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCapabilities.map((capability, index) => (
              <div 
                key={index}
                className="group bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:border-tiffany/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-tiffany/20 flex items-center justify-center group-hover:bg-tiffany/30 transition-colors">
                    <capability.icon className="w-6 h-6 text-tiffany" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-tiffany/10 text-tiffany">
                    {capability.highlight}
                  </span>
                </div>
                <h3 className="font-heading text-lg mb-2">{capability.title}</h3>
                <p className="text-muted-foreground text-sm">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6">
                AI che <span className="gradient-text">Funziona Davvero</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Non vendiamo hype. Implementiamo soluzioni AI concrete che si integrano 
                con i tuoi sistemi esistenti e generano ROI misurabile.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Analisi del Caso d'Uso", desc: "Identifichiamo dove l'AI può avere maggior impatto nel tuo business" },
                  { title: "Prototipo Rapido", desc: "Sviluppiamo un MVP funzionante in settimane, non mesi" },
                  { title: "Integrazione Sistemi", desc: "Colleghiamo l'AI ai tuoi ERP, CRM e strumenti esistenti" },
                  { title: "Training & Supporto", desc: "Formiamo il tuo team e forniamo supporto continuo" }
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-tiffany/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-tiffany font-heading text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg mb-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-tiffany/10 to-transparent rounded-2xl p-8 border border-tiffany/20">
              <Sparkles className="w-12 h-12 text-tiffany mb-6" />
              <h3 className="font-heading text-2xl mb-4">Esperienza Reale</h3>
              <p className="text-foreground/80 mb-6">
                Il nostro team ha implementato soluzioni AI in aziende come ZAPPER, MioGarage e Vesuvino Forni, 
                applicando AI per:
              </p>
              <ul className="space-y-3">
                {[
                  "Interpretazione automatica dei dati",
                  "Traduzioni simultanee multi-lingua",
                  "Chiamate AI per customer service",
                  "Generazione contenuti marketing"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-tiffany" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-20 px-4 bg-gunmetal-light">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4">
              AI per <span className="gradient-text">Ogni Settore</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className="bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:border-tiffany/50 transition-colors"
              >
                <h3 className="font-heading text-lg mb-4 text-tiffany">{useCase.industry}</h3>
                <ul className="space-y-2">
                  {useCase.applications.map((app, appIndex) => (
                    <li key={appIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-tiffany" />
                      {app}
                    </li>
                  ))}
                </ul>
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
            Pronto per l'<span className="gradient-text">AI Revolution</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Richiedi un audit gratuito delle tue opportunità AI. 
            Ti mostreremo esattamente come l'intelligenza artificiale può trasformare il tuo business.
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
            <Button 
              variant="outline"
              size="lg" 
              className="border-foreground/30 text-foreground hover:bg-foreground hover:text-background font-medium text-lg px-8 py-4 h-auto"
              onClick={() => navigate('/audit')}
            >
              Audit AI Gratuito
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
