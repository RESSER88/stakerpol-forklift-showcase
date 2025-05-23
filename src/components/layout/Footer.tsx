
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
          <div>
            <h3 className="text-xl font-bold mb-4">Stakerpol</h3>
            <p className="mb-4">Profesjonalna sprzedaż i serwis wózków widłowych BT Toyota.</p>
            <div className="flex items-center space-x-2 mb-2">
              <Phone size={16} />
              <a href="tel:+48123456789" className="hover:text-toyota-red transition-colors">+48 123 456 789</a>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Mail size={16} />
              <a href="mailto:kontakt@stakerpol.pl" className="hover:text-toyota-red transition-colors">kontakt@stakerpol.pl</a>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <p>ul. Przykładowa 123, 00-000 Warszawa, Polska</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-toyota-red transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-toyota-red transition-colors">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-toyota-red transition-colors">
                  {t('testimonials')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-toyota-red transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">BT Toyota</h3>
            <p className="mb-4">BT Toyota to wiodący producent wózków widłowych, znany z niezawodności i wysokiej jakości wykonania.</p>
            <div className="mt-4">
              <img 
                src="https://stakerpol.pl/wp-content/uploads/2020/05/bt-toyota-logo.png" 
                alt="BT Toyota Logo" 
                className="h-12 object-contain" 
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Stakerpol. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
