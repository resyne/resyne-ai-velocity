import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import resyneLogoNew from "@/assets/resyne-logo-new.png";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src={resyneLogoNew} 
                alt="RESYNE Logo" 
                className="h-10 w-auto" 
                key="logo-new"
              />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#erp" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('erp');
              }}
            >
              {t('header.erp')}
            </a>
            <a 
              href="#automation" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('automation');
              }}
            >
              {t('header.automation')}
            </a>
            <a 
              href="#ai" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('ai');
              }}
            >
              {t('header.ai')}
            </a>
            <a 
              href="/website-in-1-day" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate('/website-in-1-day');
              }}
            >
              {t('header.websiteInOneDay')}
            </a>
            <a 
              href="/book-a-call" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate('/book-a-call');
              }}
            >
              {t('header.bookACall')}
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              size="sm" 
              className="border-resyne-gold text-resyne-gold hover:bg-resyne-gold hover:text-resyne-dark cursor-pointer"
              onClick={() => scrollToSection('demos')}
            >
              {t('header.requestDemo')}
            </Button>
            <Button 
              size="sm" 
              className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light cursor-pointer"
              onClick={() => scrollToSection('leads')}
            >
              {t('header.contactUs')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-resyne-gold" />
            ) : (
              <Menu className="h-6 w-6 text-resyne-gold" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#erp" 
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('erp');
                  setIsMenuOpen(false);
                }}
              >
                {t('header.erp')}
              </a>
              <a 
                href="#automation" 
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('automation');
                  setIsMenuOpen(false);
                }}
              >
                {t('header.automation')}
              </a>
              <a 
                href="#ai" 
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('ai');
                  setIsMenuOpen(false);
                }}
              >
                {t('header.ai')}
              </a>
              <a 
                href="/website-in-1-day" 
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/website-in-1-day');
                  setIsMenuOpen(false);
                }}
              >
                {t('header.websiteInOneDay')}
              </a>
              <a 
                href="/book-a-call" 
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/book-a-call');
                  setIsMenuOpen(false);
                }}
              >
                {t('header.bookACall')}
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <LanguageSwitcher />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-resyne-gold text-resyne-gold hover:bg-resyne-gold hover:text-resyne-dark cursor-pointer"
                  onClick={() => {
                    scrollToSection('demos');
                    setIsMenuOpen(false);
                  }}
                >
                  {t('header.requestDemo')}
                </Button>
                <Button 
                  size="sm" 
                  className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light cursor-pointer"
                  onClick={() => {
                    scrollToSection('leads');
                    setIsMenuOpen(false);
                  }}
                >
                  {t('header.contactUs')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}