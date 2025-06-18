
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = useTranslation(language);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-toyota-orange tracking-tight">Stakerpol</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-toyota-orange transition-colors">
              {t('home')}
            </Link>
            <Link to="/products" className="font-medium hover:text-toyota-orange transition-colors">
              {t('electricTrolleys')}
            </Link>
            <Link to="/testimonials" className="font-medium hover:text-toyota-orange transition-colors">
              {t('testimonials')}
            </Link>
            <Link to="/contact" className="font-medium hover:text-toyota-orange transition-colors">
              {t('contact')}
            </Link>
            <LanguageSwitcher />
            <Button className="cta-button" asChild>
              <a href="tel:+48694133592">
                <Phone className="mr-2 h-4 w-4" />
                +48 694 133 592
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-toyota-orange transition-all"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-slide-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-medium py-2 hover:text-toyota-orange transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                to="/products" 
                className="font-medium py-2 hover:text-toyota-orange transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('electricTrolleys')}
              </Link>
              <Link 
                to="/testimonials" 
                className="font-medium py-2 hover:text-toyota-orange transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('testimonials')}
              </Link>
              <Link 
                to="/contact" 
                className="font-medium py-2 hover:text-toyota-orange transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              <Button className="cta-button w-full" asChild>
                <a href="tel:+48694133592">
                  <Phone className="mr-2 h-4 w-4" />
                  +48 694 133 592
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
      
      {/* Discrete Admin Button - Moved to bottom left corner */}
      <Link to="/admin">
        <Button
          variant="ghost"
          size="sm"
          className="fixed bottom-4 left-4 z-40 bg-white/90 backdrop-blur-sm shadow-md hover:bg-stakerpol-orange hover:text-white transition-all duration-200 border border-gray-200"
          title="Panel Administracyjny"
        >
          <Shield className="h-4 w-4" />
        </Button>
      </Link>
    </header>
  );
};

export default Header;
