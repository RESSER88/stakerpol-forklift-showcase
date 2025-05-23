
import { Language } from '../contexts/LanguageContext';

type TranslationKey = 
  | 'home' 
  | 'products' 
  | 'testimonials' 
  | 'contact' 
  | 'callToAction' 
  | 'aboutUsTitle' 
  | 'aboutUsDesc' 
  | 'advantages' 
  | 'advantagesDelivery' 
  | 'advantagesConsultation' 
  | 'advantagesAvailability' 
  | 'featuredProducts'
  | 'callNow'
  | 'sendMessage'
  | 'fullName'
  | 'email'
  | 'phone'
  | 'message'
  | 'submit'
  | 'ourLocation'
  | 'specifications'
  | 'model'
  | 'productionYear'
  | 'capacity'
  | 'workingHours'
  | 'liftHeight'
  | 'minHeight'
  | 'battery'
  | 'charger'
  | 'condition'
  | 'dimensions'
  | 'wheels'
  | 'additionalOptions'
  | 'customerOpinions';

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  pl: {
    home: 'Główna',
    products: 'Produkty',
    testimonials: 'Opinie',
    contact: 'Kontakt',
    callToAction: 'Zadzwoń do nas, doradzimy!',
    aboutUsTitle: 'O firmie Stakerpol',
    aboutUsDesc: 'Stakerpol to renomowany dostawca wózków widłowych BT Toyota. Od lat świadczymy najwyższej jakości usługi w zakresie sprzedaży i serwisu wózków widłowych dla klientów w całej Polsce.',
    advantages: 'Dlaczego warto wybrać Stakerpol?',
    advantagesDelivery: 'Szybka dostawa',
    advantagesConsultation: 'Profesjonalne doradztwo',
    advantagesAvailability: 'Używane wózki widłowe od ręki',
    featuredProducts: 'Polecane produkty',
    callNow: 'Zadzwoń teraz',
    sendMessage: 'Wyślij wiadomość',
    fullName: 'Imię i nazwisko',
    email: 'Email',
    phone: 'Telefon',
    message: 'Wiadomość',
    submit: 'Wyślij',
    ourLocation: 'Nasza lokalizacja',
    specifications: 'Specyfikacja techniczna',
    model: 'Model',
    productionYear: 'Rok produkcji',
    capacity: 'Udźwig nominalny',
    workingHours: 'Motogodziny',
    liftHeight: 'Wysokość podnoszenia',
    minHeight: 'Wysokość konstrukcyjna (minimalna)',
    battery: 'Bateria (typ i pojemność)',
    charger: 'Ładowarka (typ)',
    condition: 'Stan techniczny',
    dimensions: 'Wymiary (dł/szer/wys)',
    wheels: 'Koła (typ)',
    additionalOptions: 'Opcje dodatkowe',
    customerOpinions: 'Opinie klientów',
  },
  en: {
    home: 'Home',
    products: 'Products',
    testimonials: 'Testimonials',
    contact: 'Contact',
    callToAction: 'Call us, we will advise you!',
    aboutUsTitle: 'About Stakerpol',
    aboutUsDesc: 'Stakerpol is a renowned supplier of BT Toyota forklifts. For years, we have been providing the highest quality sales and service of forklifts to customers throughout Poland.',
    advantages: 'Why choose Stakerpol?',
    advantagesDelivery: 'Fast delivery',
    advantagesConsultation: 'Professional consultation',
    advantagesAvailability: 'Used forklifts available immediately',
    featuredProducts: 'Featured products',
    callNow: 'Call now',
    sendMessage: 'Send message',
    fullName: 'Full name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    submit: 'Submit',
    ourLocation: 'Our location',
    specifications: 'Technical specifications',
    model: 'Model',
    productionYear: 'Production year',
    capacity: 'Nominal capacity',
    workingHours: 'Working hours',
    liftHeight: 'Lift height',
    minHeight: 'Minimum height',
    battery: 'Battery (type and capacity)',
    charger: 'Charger (type)',
    condition: 'Condition',
    dimensions: 'Dimensions (L/W/H)',
    wheels: 'Wheels (type)',
    additionalOptions: 'Additional options',
    customerOpinions: 'Customer testimonials',
  },
  cs: {
    home: 'Domů',
    products: 'Produkty',
    testimonials: 'Reference',
    contact: 'Kontakt',
    callToAction: 'Zavolejte nám, poradíme vám!',
    aboutUsTitle: 'O společnosti Stakerpol',
    aboutUsDesc: 'Stakerpol je renomovaný dodavatel vysokozdvižných vozíků BT Toyota. Již léta poskytujeme nejkvalitnější prodej a servis vysokozdvižných vozíků zákazníkům po celém Polsku.',
    advantages: 'Proč zvolit Stakerpol?',
    advantagesDelivery: 'Rychlé dodání',
    advantagesConsultation: 'Profesionální poradenství',
    advantagesAvailability: 'Použité vysokozdvižné vozíky ihned k dispozici',
    featuredProducts: 'Doporučené produkty',
    callNow: 'Zavolejte nyní',
    sendMessage: 'Poslat zprávu',
    fullName: 'Celé jméno',
    email: 'Email',
    phone: 'Telefon',
    message: 'Zpráva',
    submit: 'Odeslat',
    ourLocation: 'Naše lokace',
    specifications: 'Technické specifikace',
    model: 'Model',
    productionYear: 'Rok výroby',
    capacity: 'Jmenovitá nosnost',
    workingHours: 'Odpracované hodiny',
    liftHeight: 'Výška zdvihu',
    minHeight: 'Minimální výška',
    battery: 'Baterie (typ a kapacita)',
    charger: 'Nabíječka (typ)',
    condition: 'Stav',
    dimensions: 'Rozměry (D/Š/V)',
    wheels: 'Kola (typ)',
    additionalOptions: 'Doplňkové možnosti',
    customerOpinions: 'Názory zákazníků',
  },
  sk: {
    home: 'Domov',
    products: 'Produkty',
    testimonials: 'Referencie',
    contact: 'Kontakt',
    callToAction: 'Zavolajte nám, poradíme vám!',
    aboutUsTitle: 'O spoločnosti Stakerpol',
    aboutUsDesc: 'Stakerpol je renomovaný dodávateľ vysokozdvižných vozíkov BT Toyota. Už roky poskytujeme najkvalitnejší predaj a servis vysokozdvižných vozíkov zákazníkom po celom Poľsku.',
    advantages: 'Prečo zvoliť Stakerpol?',
    advantagesDelivery: 'Rýchle dodanie',
    advantagesConsultation: 'Profesionálne poradenstvo',
    advantagesAvailability: 'Použité vysokozdvižné vozíky okamžite k dispozícii',
    featuredProducts: 'Odporúčané produkty',
    callNow: 'Zavolajte teraz',
    sendMessage: 'Poslať správu',
    fullName: 'Celé meno',
    email: 'Email',
    phone: 'Telefón',
    message: 'Správa',
    submit: 'Odoslať',
    ourLocation: 'Naša lokalita',
    specifications: 'Technické špecifikácie',
    model: 'Model',
    productionYear: 'Rok výroby',
    capacity: 'Menovitá nosnosť',
    workingHours: 'Odpracované hodiny',
    liftHeight: 'Výška zdvihu',
    minHeight: 'Minimálna výška',
    battery: 'Batéria (typ a kapacita)',
    charger: 'Nabíjačka (typ)',
    condition: 'Stav',
    dimensions: 'Rozmery (D/Š/V)',
    wheels: 'Kolesá (typ)',
    additionalOptions: 'Doplnkové možnosti',
    customerOpinions: 'Názory zákazníkov',
  }
};

export const useTranslation = (language: Language) => {
  return (key: TranslationKey): string => {
    return translations[language][key];
  };
};
