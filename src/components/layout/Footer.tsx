
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-toyota-orange">Stakerpol</h3>
            <p className="mb-4">Profesjonalna sprzedaż i serwis wózków widłowych BT Toyota.</p>
            <div className="flex items-center space-x-2 mb-3 group">
              <Phone size={16} className="text-toyota-orange group-hover:animate-pulse-light" />
              <a href="tel:+48123456789" className="hover:text-toyota-orange transition-colors">+48 123 456 789</a>
            </div>
            <div className="flex items-center space-x-2 mb-3 group">
              <Mail size={16} className="text-toyota-orange group-hover:animate-pulse-light" />
              <a href="mailto:kontakt@stakerpol.pl" className="hover:text-toyota-orange transition-colors">kontakt@stakerpol.pl</a>
            </div>
            <div className="flex items-start space-x-2 group">
              <MapPin size={16} className="mt-1 flex-shrink-0 text-toyota-orange group-hover:animate-pulse-light" />
              <p>ul. Przykładowa 123, 00-000 Warszawa, Polska</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="animate-fade-in delay-100">
            <h3 className="text-xl font-bold mb-4 text-toyota-orange">Menu</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-toyota-orange transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 bg-toyota-orange rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-toyota-orange transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 bg-toyota-orange rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-toyota-orange transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 bg-toyota-orange rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('testimonials')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-toyota-orange transition-colors inline-flex items-center group">
                  <span className="w-1 h-1 bg-toyota-orange rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="animate-fade-in delay-200">
            <h3 className="text-xl font-bold mb-4 text-toyota-orange">BT Toyota</h3>
            <p className="mb-4">BT Toyota to wiodący producent wózków widłowych, znany z niezawodności i wysokiej jakości wykonania.</p>
            <div className="mt-4">
              <img 
                src="https://stakerpol.pl/wp-content/uploads/2020/05/bt-toyota-logo.png" 
                alt="BT Toyota Logo" 
                className="h-12 object-contain hover:opacity-90 transition-opacity" 
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Stakerpol. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
