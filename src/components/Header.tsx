import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import resyneLogoMain from "@/assets/resyne-logo-main.png";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
                src={resyneLogoMain} 
                alt="RESYNE Logo" 
                className="h-8 w-auto" 
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
              href="/automation" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate('/automation');
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
            <DropdownMenu>
              <DropdownMenuTrigger className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer flex items-center gap-1">
                {t('header.grants')}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card border-border/20">
                <DropdownMenuItem 
                  className="font-subtitle cursor-pointer hover:text-resyne-gold"
                  onClick={() => navigate('/bando-pid')}
                >
                  {t('header.bandoPID')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="font-subtitle cursor-pointer hover:text-resyne-gold"
                  onClick={() => navigate('/voucher-vda')}
                >
                  {t('header.voucherVdA')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="font-subtitle cursor-pointer hover:text-resyne-gold"
                  onClick={() => navigate('/digit-sicilia')}
                >
                  {t('header.digitSicilia')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                href="/automation" 
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/automation');
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
              
              {/* Grants Submenu */}
              <div className="border-t border-border/20 pt-4">
                <p className="font-subtitle text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  {t('header.grants')}
                </p>
                <div className="flex flex-col space-y-3 pl-4">
                  <a 
                    href="/bando-pid" 
                    className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/bando-pid');
                      setIsMenuOpen(false);
                    }}
                  >
                    {t('header.bandoPID')}
                  </a>
                  <a 
                    href="/voucher-vda" 
                    className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/voucher-vda');
                      setIsMenuOpen(false);
                    }}
                  >
                    {t('header.voucherVdA')}
                  </a>
                  <a 
                    href="/digit-sicilia" 
                    className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/digit-sicilia');
                      setIsMenuOpen(false);
                    }}
                  >
                    {t('header.digitSicilia')}
                  </a>
                </div>
              </div>
              
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