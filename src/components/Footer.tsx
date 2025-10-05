import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import resyneLogoNew from "@/assets/resyne-logo-new.png";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-resyne-dark border-t border-border/30 tech-web" id="contattaci">
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={resyneLogoNew} 
                alt="RESYNE Logo" 
                className="h-12 w-auto" 
                key="logo-new"
              />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://linkedin.com/company/resyne" 
                className="p-2 rounded-lg bg-resyne-gold/20 hover:bg-resyne-gold/30 transition-colors"
                aria-label="LinkedIn RESYNE"
              >
                <Linkedin className="w-5 h-5 text-resyne-gold" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-subtitle text-lg text-resyne-gold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#erp" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('header.erp')}
                </a>
              </li>
              <li>
                <a href="#automation" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('header.automation')}
                </a>
              </li>
              <li>
                <a href="#ai" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('header.ai')}
                </a>
              </li>
              <li>
                <a href="#leads" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.freeConsultation')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('footer.support247')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="font-subtitle text-lg text-tech-blue mb-4">{t('footer.contacts')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-resyne-gold mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('footer.email')}</p>
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
                  <p className="text-sm text-muted-foreground">{t('footer.phone')}</p>
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
                  <p className="text-sm text-muted-foreground">{t('footer.location')}</p>
                  <p className="text-foreground">
                    {t('footer.locationCity')}<br />
                    <span className="text-sm text-muted-foreground">{t('footer.locationCoverage')}</span>
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
              © {currentYear} RESYNE. {t('footer.copyright')}
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a 
                href="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('footer.privacy')}
              </a>
              <a 
                href="/terms" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('footer.terms')}
              </a>
              <a 
                href="/cookies" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('footer.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
