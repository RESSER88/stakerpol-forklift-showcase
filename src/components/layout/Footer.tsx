
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Company info translations based on language
  const getCompanyInfo = () => {
    switch (language) {
      case 'en':
        return {
          description: 'Professional sales and service of BT Toyota forklifts.',
          address: 'ul. Międzyleśna 115, 32-095 Celiny, Poland'
        };
      case 'cs':
        return {
          description: 'Profesionální prodej a servis vysokozdvižných vozíků BT Toyota.',
          address: 'ul. Międzyleśna 115, 32-095 Celiny, Polsko'
        };
      case 'sk':
        return {
          description: 'Profesionálny predaj a servis vysokozdvižných vozíkov BT Toyota.',
          address: 'ul. Międzyleśna 115, 32-095 Celiny, Poľsko'
        };
      case 'de':
        return {
          description: 'Professioneller Verkauf und Service von BT Toyota Gabelstaplern.',
          address: 'ul. Międzyleśna 115, 32-095 Celiny, Polen'
        };
      default:
        return {
          description: 'Profesjonalna sprzedaż i serwis wózków widłowych BT Toyota.',
          address: 'ul. Międzyleśna 115, 32-095 Celiny, Polska'
        };
    }
  };

  const companyInfo = getCompanyInfo();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-toyota-orange">Stakerpol</h3>
            <p className="mb-4">{companyInfo.description}</p>
            <div className="flex items-center space-x-2 mb-3 group">
              <Phone size={16} className="text-toyota-orange group-hover:animate-pulse-light" />
              <a href="tel:+48694133592" className="hover:text-toyota-orange transition-colors">+48 694 133 592</a>
            </div>
            <div className="flex items-center space-x-2 mb-3 group">
              <Mail size={16} className="text-toyota-orange group-hover:animate-pulse-light" />
              <a href="mailto:info@stakerpol.pl" className="hover:text-toyota-orange transition-colors">info@stakerpol.pl</a>
            </div>
            <div className="flex items-start space-x-2 group">
              <MapPin size={16} className="mt-1 flex-shrink-0 text-toyota-orange group-hover:animate-pulse-light" />
              <p>{companyInfo.address}</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="animate-fade-in delay-100">
            <h3 className="text-xl font-bold mb-4 text-toyota-orange">Menu</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" onClick={handleLinkClick} className="hover:text-toyota-orange transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 bg-toyota-orange rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={handleLinkClick} className="hover:text-toyota-orange transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 bg-toyota-orange rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link to="/testimonials" onClick={handleLinkClick} className="hover:text-toyota-orange transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 bg-toyota-orange rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('testimonials')}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleLinkClick} className="hover:text-toyota-orange transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 bg-toyota-orange rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Stakerpol. {
            language === 'en' ? 'All rights reserved.' :
            language === 'cs' ? 'Všechna práva vyhrazena.' :
            language === 'sk' ? 'Všetky práva vyhradené.' :
            language === 'de' ? 'Alle Rechte vorbehalten.' :
            'Wszelkie prawa zastrzeżone.'
          }</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
