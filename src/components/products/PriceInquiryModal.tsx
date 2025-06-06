
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, X } from 'lucide-react';
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
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateInquiryMessage = () => {
    const messages = {
      pl: `Witam,

jestem zainteresowany produktem: ${product.model}

Proszę o przesłanie oferty cenowej oraz informacji o dostępności.

Dodatkowe uwagi: ${message || 'Brak'}

Pozdrawiam`,
      en: `Hello,

I am interested in the product: ${product.model}

Please send me a price quote and availability information.

Additional notes: ${message || 'None'}

Best regards`,
      cs: `Dobrý den,

zajímám se o produkt: ${product.model}

Prosím o zaslání cenové nabídky a informací o dostupnosti.

Dodatečné poznámky: ${message || 'Žádné'}

S pozdravem`,
      sk: `Dobrý deň,

zaujímam sa o produkt: ${product.model}

Prosím o zaslanie cenovej ponuky a informácií o dostupnosti.

Dodatočné poznámky: ${message || 'Žiadne'}

S pozdravom`,
      de: `Hallo,

ich interessiere mich für das Produkt: ${product.model}

Bitte senden Sie mir ein Preisangebot und Verfügbarkeitsinformationen.

Zusätzliche Anmerkungen: ${message || 'Keine'}

Mit freundlichen Grüßen`
    };

    // Wersja w języku polskim jako backup
    const polishVersion = `

---

Wersja w języku polskim:

Witam,

jestem zainteresowany produktem: ${product.model}

Proszę o przesłanie oferty cenowej oraz informacji o dostępności.

Dodatkowe uwagi: ${message || 'Brak'}

Pozdrawiam`;

    return messages[language] + (language !== 'pl' ? polishVersion : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email && !phone) {
      toast({
        title: t('error'),
        description: t('pleaseProvideEmailOrPhone'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const inquiryMessage = generateInquiryMessage();
      
      // Symulacja wysyłania zapytania - w rzeczywistej aplikacji tutaj byłby prawdziwy endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Price inquiry submitted:', {
        product: product.model,
        email,
        phone,
        message: inquiryMessage,
        language
      });

      toast({
        title: t('success'),
        description: t('inquirySent'),
      });

      // Resetowanie formularza
      setEmail('');
      setPhone('');
      setMessage('');
      onClose();
    } catch (error) {
      toast({
        title: t('error'),
        description: t('inquiryError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            {t('priceInquiryFormIntro')}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="product">{t('productModel')}</Label>
            <Input
              id="product"
              value={product.model}
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div>
            <Label htmlFor="email">{t('yourEmail')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jan.kowalski@example.com"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">{t('yourPhone')}</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+48 123 456 789"
            />
          </div>
          
          <div>
            <Label htmlFor="message">{t('message')} ({t('additionalOptions')})</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={language === 'pl' ? 'Dodatkowe informacje lub pytania...' : 
                          language === 'en' ? 'Additional information or questions...' :
                          language === 'cs' ? 'Dodatečné informace nebo otázky...' :
                          language === 'sk' ? 'Dodatočné informácie alebo otázky...' :
                          'Zusätzliche Informationen oder Fragen...'}
              rows={3}
            />
          </div>
          
          <p className="text-sm text-gray-600">
            {t('provideAtLeastOne')}
          </p>
          
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? t('sending') : t('submit')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              {t('cancel')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PriceInquiryModal;
