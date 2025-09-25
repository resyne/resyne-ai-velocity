import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import resyneLogoWhite from "@/assets/resyne-logo-white.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-resyne-dark border-t border-border/30 tech-web">
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={resyneLogoWhite} 
                alt="RESYNE Logo" 
                className="h-12 w-auto" 
                key="logo-new"
              />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Soluzioni innovative AI-ERP per trasformare la tua azienda. 
              Specialisti in automazione, implementazioni AI ed ERP 
              per risultati 10x più veloci ed economici.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://linkedin.com/company/resyne" 
                className="p-2 rounded-lg bg-resyne-gold/20 hover:bg-resyne-gold/30 transition-colors"
                aria-label="LinkedIn RESYNE"
              >
                <Linkedin className="w-5 h-5 text-resyne-gold" />
              </a>
              <a 
                href="https://github.com/resyne" 
                className="p-2 rounded-lg bg-tech-blue/20 hover:bg-tech-blue/30 transition-colors"
                aria-label="GitHub RESYNE"
              >
                <Github className="w-5 h-5 text-tech-blue" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-subtitle text-lg text-resyne-gold mb-4">Servizi</h3>
            <ul className="space-y-3">
              <li>
                <a href="#erp" className="text-muted-foreground hover:text-foreground transition-colors">
                  ERP Solutions
                </a>
              </li>
              <li>
                <a href="#automation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Automation
                </a>
              </li>
              <li>
                <a href="#ai" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Solutions
                </a>
              </li>
              <li>
                <a href="#leads" className="text-muted-foreground hover:text-foreground transition-colors">
                  Consulenza Gratuita
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Supporto 24/7
                </a>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="font-subtitle text-lg text-tech-blue mb-4">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-resyne-gold mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href="mailto:contact@re-syne.com" 
                    className="text-foreground hover:text-resyne-gold transition-colors"
                  >
                    contact@re-syne.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-tech-blue mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefono</p>
                  <a 
                    href="tel:+393911491256" 
                    className="text-foreground hover:text-tech-blue transition-colors"
                  >
                    +393911491256
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-tech-purple mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Sede</p>
                  <p className="text-foreground">
                    Milano, Italia<br />
                    <span className="text-sm text-muted-foreground">Servizi in tutta Europa</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} RESYNE. Tutti i diritti riservati.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a 
                href="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Termini di Servizio
              </a>
              <a 
                href="/cookies" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}