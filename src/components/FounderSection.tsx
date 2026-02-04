import { Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function FounderSection() {
  const navigate = useNavigate();

  const ventures = [
    { name: "ZAPPER", description: "AI & Automation" },
    { name: "MioGarage", description: "Automotive Tech" },
    { name: "Vesuvino Forni", description: "Food Industry" }
  ];

  const expertise = [
    "Strategy & Process Architecture",
    "AI Systems Integration",
    "ERP Custom Development",
    "MarTech Avanzato"
  ];

  return (
    <section className="py-20 px-4 bg-gunmetal-light" id="founder">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-tiffany/10 border border-tiffany/30 mb-6">
              <span className="text-xs font-medium text-tiffany uppercase tracking-wider">
                Head Équipe Resyne
              </span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-2">
              <span className="text-foreground">Stanislao</span>
              <br />
              <span className="gradient-text">Elefante</span>
            </h2>
            
            <p className="text-muted-foreground text-sm mb-6">
              Strategy, Process Architecture & AI Systems
            </p>
            
            <p className="text-foreground/80 leading-relaxed mb-6">
              Imprenditore e strategist specializzato nella costruzione di sistemi aziendali avanzati, 
              con un focus sull'integrazione dell'intelligenza artificiale nei processi decisionali, 
              operativi e di marketing.
            </p>
            
            <p className="text-foreground/80 leading-relaxed mb-8">
              Founder e co-founder di realtà come <strong className="text-tiffany">ZAPPER</strong>, 
              <strong className="text-tiffany"> MioGarage</strong> e <strong className="text-tiffany">Vesuvino Forni</strong>, 
              dove ha applicato soluzioni di AI per interpretazione dei dati, traduzioni simultanee, 
              chiamate AI e generazione di contenuti, trasformando la tecnologia in vantaggio competitivo reale.
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {expertise.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-background/50 border border-border/30 rounded-full text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-tiffany text-gunmetal hover:bg-tiffany-light"
                onClick={() => navigate('/book-a-call')}
              >
                Prenota una Call
              </Button>
              <Button 
                variant="outline" 
                className="border-border/50 hover:border-tiffany/50"
                onClick={() => window.open('https://linkedin.com/in/stanislaoelefante', '_blank')}
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <div className="bg-gradient-to-br from-tiffany/20 to-transparent rounded-2xl p-8 border border-tiffany/20">
              {/* Quote */}
              <blockquote className="text-lg md:text-xl font-body italic text-foreground/90 mb-8">
                "Guido Équipe Resyne con un approccio orientato alla strategia, al controllo dei processi 
                e alla scalabilità, progettando architetture digitali su misura che uniscono ERP custom, 
                AI applicata e MarTech avanzato."
              </blockquote>

              {/* Ventures */}
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Ventures</p>
                <div className="grid grid-cols-3 gap-4">
                  {ventures.map((venture, index) => (
                    <div 
                      key={index}
                      className="bg-background/30 rounded-lg p-3 text-center border border-border/20"
                    >
                      <p className="font-heading text-sm text-foreground">{venture.name}</p>
                      <p className="text-xs text-muted-foreground">{venture.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-tiffany/30 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-tiffany/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
