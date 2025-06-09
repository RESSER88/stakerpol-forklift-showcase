
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Mail, X } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

interface PriceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const PriceInquiryModal = ({ isOpen, onClose, product }: PriceInquiryModalProps) => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');

  const generateEmailContent = () => {
    const productDetails = [
      `Model: ${product.model}`,
      product.specs.productionYear && `Rok produkcji: ${product.specs.productionYear}`,
      product.specs.serialNumber && `Numer seryjny: ${product.specs.serialNumber}`
    ].filter(Boolean).join('\n');

    const phoneInfo = phoneNumber ? `\nNumer telefonu: ${phoneNumber}` : '';

    const messages = {
      pl: `Witam,

jestem zainteresowany produktem:

${productDetails}

Proszę o przesłanie oferty cenowej oraz informacji o dostępności.${phoneInfo}

Pozdrawiam`,
      en: `Hello,

I am interested in the product:

${productDetails}

Please send me a price quote and availability information.${phoneInfo}

Best regards`,
      cs: `Dobrý den,

zajímám se o produkt:

${productDetails}

Prosím o zaslání cenové nabídky a informací o dostupnosti.${phoneInfo}

S pozdravem`,
      sk: `Dobrý deň,

zaujímam sa o produkt:

${productDetails}

Prosím o zaslanie cenovej ponuky a informácií o dostupnosti.${phoneInfo}

S pozdravom`,
      de: `Hallo,

ich interessiere mich für das Produkt:

${productDetails}

Bitte senden Sie mir ein Preisangebot und Verfügbarkeitsinformationen.${phoneInfo}

Mit freundlichen Grüßen`
    };

    // Wersja w języku polskim jako backup
    const polishVersion = `

---

Wersja w języku polskim:

Witam,

jestem zainteresowany produktem:

${productDetails}

Proszę o przesłanie oferty cenowej oraz informacji o dostępności.${phoneInfo}

Pozdrawiam`;

    return messages[language] + (language !== 'pl' ? polishVersion : '');
  };

  const handleEmailRedirect = () => {
    const subject = encodeURIComponent(`Zapytanie o cenę - ${product.model}`);
    const body = encodeURIComponent(generateEmailContent());
    const mailtoLink = `mailto:info@stakerpol.pl?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: t('success'),
      description: 'Przekierowanie do programu pocztowego',
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {t('askForPrice')}
          </DialogTitle>
          <DialogDescription>
            Zostaniesz przekierowany do domyślnego programu pocztowego z przygotowaną wiadomością.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">{t('productModel')}:</h4>
            <p className="text-sm">{product.model}</p>
            {product.specs.productionYear && (
              <p className="text-sm mt-1">Rok produkcji: {product.specs.productionYear}</p>
            )}
            {product.specs.serialNumber && (
              <p className="text-sm mt-1">Numer seryjny: {product.specs.serialNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Numer telefonu (opcjonalnie)
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="np. +48 123 456 789"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">E-mail:</h4>
            <p className="text-sm font-mono">info@stakerpol.pl</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleEmailRedirect}
              className="flex-1"
            >
              <Mail className="mr-2 h-4 w-4" />
              Otwórz program pocztowy
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceInquiryModal;
