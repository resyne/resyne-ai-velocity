import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import resyneLogoNew from "@/assets/resyne-logo-new.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
              ERP Solutions
            </a>
            <a 
              href="#automation" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('automation');
              }}
            >
              Automation
            </a>
            <a 
              href="#ai" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('ai');
              }}
            >
              AI Solutions
            </a>
            <a 
              href="/website-in-1-day" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate('/website-in-1-day');
              }}
            >
              Website in 1 Day
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-resyne-gold text-resyne-gold hover:bg-resyne-gold hover:text-resyne-dark cursor-pointer"
              onClick={() => scrollToSection('demos')}
            >
              Richiedi Demo
            </Button>
            <Button 
              size="sm" 
              className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light cursor-pointer"
              onClick={() => scrollToSection('leads')}
            >
              Contattaci
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
                ERP Solutions
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
                Automation
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
                AI Solutions
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
                Website in 1 Day
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-resyne-gold text-resyne-gold hover:bg-resyne-gold hover:text-resyne-dark cursor-pointer"
                  onClick={() => {
                    scrollToSection('demos');
                    setIsMenuOpen(false);
                  }}
                >
                  Richiedi Demo
                </Button>
                <Button 
                  size="sm" 
                  className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light cursor-pointer"
                  onClick={() => {
                    scrollToSection('leads');
                    setIsMenuOpen(false);
                  }}
                >
                  Contattaci
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}