import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import resyneLogo from "@/assets/resyne-logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={resyneLogo} 
              alt="RESYNE Logo" 
              className="h-8 w-auto" 
            />
            <span className="font-title text-xl gradient-text">RESYNE</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#erp" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors"
            >
              ERP Solutions
            </a>
            <a 
              href="#automation" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors"
            >
              Automation
            </a>
            <a 
              href="#ai" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors"
            >
              AI Solutions
            </a>
            <a 
              href="#leads" 
              className="font-subtitle text-sm hover:text-resyne-gold transition-colors"
            >
              Lead Generation
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-resyne-gold text-resyne-gold hover:bg-resyne-gold hover:text-resyne-dark">
              Richiedi Demo
            </Button>
            <Button size="sm" className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light">
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
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ERP Solutions
              </a>
              <a 
                href="#automation" 
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Automation
              </a>
              <a 
                href="#ai" 
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Solutions
              </a>
              <a 
                href="#leads" 
                className="font-subtitle text-sm hover:text-resyne-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Lead Generation
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm" className="border-resyne-gold text-resyne-gold hover:bg-resyne-gold hover:text-resyne-dark">
                  Richiedi Demo
                </Button>
                <Button size="sm" className="bg-resyne-gold text-resyne-dark hover:bg-resyne-gold-light">
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