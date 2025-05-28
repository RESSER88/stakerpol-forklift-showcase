
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
  | 'customerOpinions'
  | 'heroTitle'
  | 'heroSubtitle'
  | 'browseProducts'
  | 'viewAllProducts'
  | 'featuredProductsSubtitle'
  | 'aboutUsAdvantages'
  | 'advantagesDeliveryDesc'
  | 'advantagesConsultationDesc'
  | 'advantagesAvailabilityDesc'
  | 'productNotFound'
  | 'backToProducts'
  | 'relatedProducts'
  | 'shareExperience'
  | 'shareExperienceDesc'
  | 'addGoogleReview'
  | 'callToActionDesc'
  | 'pageNotFound'
  | 'returnToHome'
  | 'clickToEnlarge'
  | 'close'
  | 'nextImage'
  | 'previousImage'
  | 'noImage'
  | 'adminPanel'
  | 'fastDeliveryForklift'
  | 'professionalAdvice'
  | 'usedForkliftReady';

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
    heroTitle: 'Wózki widłowe BT Toyota od Stakerpol',
    heroSubtitle: 'Profesjonalna sprzedaż i serwis wózków widłowych BT Toyota. Zapewniamy najwyższą jakość, szybką dostawę i fachowe doradztwo.',
    browseProducts: 'Przeglądaj wózki',
    viewAllProducts: 'Zobacz wszystkie produkty',
    featuredProductsSubtitle: 'Najnowsze i wybrane wózki widłowe z naszej oferty',
    aboutUsAdvantages: 'Dlaczego warto wybrać Stakerpol?',
    advantagesDeliveryDesc: 'Dostarczamy wózki widłowe BT Toyota w najkrótszym możliwym terminie, dostosowując się do Twoich potrzeb.',
    advantagesConsultationDesc: 'Nasi eksperci pomogą Ci wybrać idealny wózek widłowy, dopasowany do specyfiki Twojej działalności.',
    advantagesAvailabilityDesc: 'Posiadamy szeroki wybór używanych wózków widłowych dostępnych od ręki, gotowych do natychmiastowej pracy.',
    productNotFound: 'Produkt nie został znaleziony',
    backToProducts: 'Powrót do listy produktów',
    relatedProducts: 'Podobne produkty',
    shareExperience: 'Masz doświadczenie z naszą firmą?',
    shareExperienceDesc: 'Podziel się swoją opinią na naszej stronie Google lub skontaktuj się z nami bezpośrednio.',
    addGoogleReview: 'Dodaj opinię na Google',
    callToActionDesc: 'Zadzwoń do naszych ekspertów, którzy pomogą Ci wybrać idealny wózek widłowy dopasowany do Twoich potrzeb.',
    pageNotFound: 'Strona nie została znaleziona',
    returnToHome: 'Wróć do strony głównej',
    clickToEnlarge: 'Kliknij, aby powiększyć',
    close: 'Zamknij',
    nextImage: 'Następne zdjęcie',
    previousImage: 'Poprzednie zdjęcie',
    noImage: 'Brak zdjęcia',
    adminPanel: 'Panel Admin',
    fastDeliveryForklift: 'Dostarczamy wózki widłowe BT Toyota w najkrótszym możliwym terminie, dostosowując się do Twoich potrzeb.',
    professionalAdvice: 'Nasi eksperci pomogą Ci wybrać idealny wózek widłowy, dopasowany do specyfiki Twojej działalności.',
    usedForkliftReady: 'Posiadamy szeroki wybór używanych wózków widłowych dostępnych od ręki, gotowych do natychmiastowej pracy.',
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
    heroTitle: 'BT Toyota Forklifts from Stakerpol',
    heroSubtitle: 'Professional sales and service of BT Toyota forklifts. We ensure the highest quality, fast delivery and expert advice.',
    browseProducts: 'Browse forklifts',
    viewAllProducts: 'View all products',
    featuredProductsSubtitle: 'Latest and selected forklifts from our offer',
    aboutUsAdvantages: 'Why choose Stakerpol?',
    advantagesDeliveryDesc: 'We deliver BT Toyota forklifts in the shortest possible time, adapting to your needs.',
    advantagesConsultationDesc: 'Our experts will help you choose the perfect forklift, tailored to the specifics of your business.',
    advantagesAvailabilityDesc: 'We have a wide selection of used forklifts available immediately, ready for immediate work.',
    productNotFound: 'Product not found',
    backToProducts: 'Back to product list',
    relatedProducts: 'Related products',
    shareExperience: 'Have experience with our company?',
    shareExperienceDesc: 'Share your opinion on our Google page or contact us directly.',
    addGoogleReview: 'Add Google review',
    callToActionDesc: 'Call our experts who will help you choose the perfect forklift tailored to your needs.',
    pageNotFound: 'Page not found',
    returnToHome: 'Return to Home',
    clickToEnlarge: 'Click to enlarge',
    close: 'Close',
    nextImage: 'Next image',
    previousImage: 'Previous image',
    noImage: 'No image',
    adminPanel: 'Admin Panel',
    fastDeliveryForklift: 'We deliver BT Toyota forklifts in the shortest possible time, adapting to your needs.',
    professionalAdvice: 'Our experts will help you choose the perfect forklift, tailored to the specifics of your business.',
    usedForkliftReady: 'We have a wide selection of used forklifts available immediately, ready for immediate work.',
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
    ourLocation: 'Naše lokalita',
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
    heroTitle: 'Vysokozdvižné vozíky BT Toyota od Stakerpol',
    heroSubtitle: 'Profesionální prodej a servis vysokozdvižných vozíků BT Toyota. Zajišťujeme nejvyšší kvalitu, rychlé dodání a odborné poradenství.',
    browseProducts: 'Procházet vozíky',
    viewAllProducts: 'Zobrazit všechny produkty',
    featuredProductsSubtitle: 'Nejnovější a vybrané vysokozdvižné vozíky z naší nabídky',
    aboutUsAdvantages: 'Proč zvolit Stakerpol?',
    advantagesDeliveryDesc: 'Dodáváme vysokozdvižné vozíky BT Toyota v nejkratším možném termínu, přizpůsobujeme se vašim potřebám.',
    advantagesConsultationDesc: 'Naši odborníci vám pomohou vybrat ideální vysokozdvižný vozík, přizpůsobený specifikám vaší činnosti.',
    advantagesAvailabilityDesc: 'Máme široký výběr použitých vysokozdvižných vozíků dostupných ihned, připravených k okamžité práci.',
    productNotFound: 'Produkt nebyl nalezen',
    backToProducts: 'Zpět na seznam produktů',
    relatedProducts: 'Související produkty',
    shareExperience: 'Máte zkušenosti s naší společností?',
    shareExperienceDesc: 'Sdílejte svůj názor na naší stránce Google nebo nás kontaktujte přímo.',
    addGoogleReview: 'Přidat hodnocení na Google',
    callToActionDesc: 'Zavolejte našim odborníkům, kteří vám pomohou vybrat ideální vysokozdvižný vozík přizpůsobený vašim potřebám.',
    pageNotFound: 'Stránka nebyla nalezena',
    returnToHome: 'Zpět na domovskou stránku',
    clickToEnlarge: 'Klikněte pro zvětšení',
    close: 'Zavřít',
    nextImage: 'Další obrázek',
    previousImage: 'Předchozí obrázek',
    noImage: 'Žádný obrázek',
    adminPanel: 'Administrační panel',
    fastDeliveryForklift: 'Dodáváme vysokozdvižné vozíky BT Toyota v nejkratším možném termínu, přizpůsobujeme se vašim potřebám.',
    professionalAdvice: 'Naši odborníci vám pomohou vybrat ideální vysokozdvižný vozík, přizpůsobený specifikám vaší činnosti.',
    usedForkliftReady: 'Máme široký výběr použitých vysokozdvižných vozíků dostupných ihned, připravených k okamžité práci.',
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
    heroTitle: 'Vysokozdvižné vozíky BT Toyota od Stakerpol',
    heroSubtitle: 'Profesionálny predaj a servis vysokozdvižných vozíkov BT Toyota. Zabezpečujeme najvyššiu kvalitu, rýchle dodanie a odborné poradenstvo.',
    browseProducts: 'Prezerať vozíky',
    viewAllProducts: 'Zobraziť všetky produkty',
    featuredProductsSubtitle: 'Najnovšie a vybrané vysokozdvižné vozíky z našej ponuky',
    aboutUsAdvantages: 'Prečo zvoliť Stakerpol?',
    advantagesDeliveryDesc: 'Dodávame vysokozdvižné vozíky BT Toyota v najkratšom možnom termíne, prispôsobujeme sa vašim potrebám.',
    advantagesConsultationDesc: 'Naši odborníci vám pomôžu vybrať ideálny vysokozdvižný vozík, prispôsobený špecifikám vašej činnosti.',
    advantagesAvailabilityDesc: 'Máme široký výber použitých vysokozdvižných vozíkov dostupných okamžite, pripravených na okamžitú prácu.',
    productNotFound: 'Produkt nebol nájdený',
    backToProducts: 'Späť na zoznam produktov',
    relatedProducts: 'Súvisiace produkty',
    shareExperience: 'Máte skúsenosti s našou spoločnosťou?',
    shareExperienceDesc: 'Zdieľajte svoj názor na našej stránke Google alebo nás kontaktujte priamo.',
    addGoogleReview: 'Pridať hodnotenie na Google',
    callToActionDesc: 'Zavolajte našim odborníkom, ktorí vám pomôžu vybrať ideálny vysokozdvižný vozík prispôsobený vašim potrebám.',
    pageNotFound: 'Stránka nebola nájdená',
    returnToHome: 'Späť na domovskú stránku',
    clickToEnlarge: 'Kliknite pre zväčšenie',
    close: 'Zavrieť',
    nextImage: 'Ďalší obrázok',
    previousImage: 'Predchádzajúci obrázok',
    noImage: 'Žiadny obrázok',
    adminPanel: 'Administračný panel',
    fastDeliveryForklift: 'Dodávame vysokozdvižné vozíky BT Toyota v najkratšom možnom termíne, prispôsobujeme sa vašim potrebám.',
    professionalAdvice: 'Naši odborníci vám pomôžu vybrať ideálny vysokozdvižný vozík, prispôsobený špecifikám vašej činnosti.',
    usedForkliftReady: 'Máme široký výber použitých vysokozdvižných vozíkov dostupných okamžite, pripravených na okamžitú prácu.',
  },
  de: {
    home: 'Startseite',
    products: 'Produkte',
    testimonials: 'Referenzen',
    contact: 'Kontakt',
    callToAction: 'Rufen Sie uns an, wir beraten Sie!',
    aboutUsTitle: 'Über Stakerpol',
    aboutUsDesc: 'Stakerpol ist ein renommierter Anbieter von BT Toyota Gabelstaplern. Seit Jahren bieten wir höchste Qualität in Verkauf und Service von Gabelstaplern für Kunden in ganz Polen.',
    advantages: 'Warum Stakerpol wählen?',
    advantagesDelivery: 'Schnelle Lieferung',
    advantagesConsultation: 'Professionelle Beratung',
    advantagesAvailability: 'Gebrauchte Gabelstapler sofort verfügbar',
    featuredProducts: 'Empfohlene Produkte',
    callNow: 'Jetzt anrufen',
    sendMessage: 'Nachricht senden',
    fullName: 'Vollständiger Name',
    email: 'E-Mail',
    phone: 'Telefon',
    message: 'Nachricht',
    submit: 'Senden',
    ourLocation: 'Unser Standort',
    specifications: 'Technische Spezifikationen',
    model: 'Modell',
    productionYear: 'Baujahr',
    capacity: 'Nennkapazität',
    workingHours: 'Betriebsstunden',
    liftHeight: 'Hubhöhe',
    minHeight: 'Mindesthöhe',
    battery: 'Batterie (Typ und Kapazität)',
    charger: 'Ladegerät (Typ)',
    condition: 'Zustand',
    dimensions: 'Abmessungen (L/B/H)',
    wheels: 'Räder (Typ)',
    additionalOptions: 'Zusatzoptionen',
    customerOpinions: 'Kundenmeinungen',
    heroTitle: 'BT Toyota Gabelstapler von Stakerpol',
    heroSubtitle: 'Professioneller Verkauf und Service von BT Toyota Gabelstaplern. Wir gewährleisten höchste Qualität, schnelle Lieferung und fachkundige Beratung.',
    browseProducts: 'Gabelstapler durchsuchen',
    viewAllProducts: 'Alle Produkte anzeigen',
    featuredProductsSubtitle: 'Neueste und ausgewählte Gabelstapler aus unserem Angebot',
    aboutUsAdvantages: 'Warum Stakerpol wählen?',
    advantagesDeliveryDesc: 'Wir liefern BT Toyota Gabelstapler in kürzester Zeit und passen uns Ihren Bedürfnissen an.',
    advantagesConsultationDesc: 'Unsere Experten helfen Ihnen, den perfekten Gabelstapler zu wählen, der auf die Besonderheiten Ihres Unternehmens zugeschnitten ist.',
    advantagesAvailabilityDesc: 'Wir haben eine breite Auswahl an gebrauchten Gabelstaplern sofort verfügbar, bereit für den sofortigen Einsatz.',
    productNotFound: 'Produkt nicht gefunden',
    backToProducts: 'Zurück zur Produktliste',
    relatedProducts: 'Ähnliche Produkte',
    shareExperience: 'Haben Sie Erfahrungen mit unserem Unternehmen?',
    shareExperienceDesc: 'Teilen Sie Ihre Meinung auf unserer Google-Seite oder kontaktieren Sie uns direkt.',
    addGoogleReview: 'Google-Bewertung hinzufügen',
    callToActionDesc: 'Rufen Sie unsere Experten an, die Ihnen helfen, den perfekten Gabelstapler für Ihre Bedürfnisse zu wählen.',
    pageNotFound: 'Seite nicht gefunden',
    returnToHome: 'Zur Startseite zurückkehren',
    clickToEnlarge: 'Zum Vergrößern klicken',
    close: 'Schließen',
    nextImage: 'Nächstes Bild',
    previousImage: 'Vorheriges Bild',
    noImage: 'Kein Bild',
    adminPanel: 'Admin-Panel',
    fastDeliveryForklift: 'Wir liefern BT Toyota Gabelstapler in kürzester Zeit und passen uns Ihren Bedürfnissen an.',
    professionalAdvice: 'Unsere Experten helfen Ihnen, den perfekten Gabelstapler zu wählen, der auf die Besonderheiten Ihres Unternehmens zugeschnitten ist.',
    usedForkliftReady: 'Wir haben eine breite Auswahl an gebrauchten Gabelstaplern sofort verfügbar, bereit für den sofortigen Einsatz.',
  }
};

export const useTranslation = (language: Language) => {
  return (key: TranslationKey): string => {
    return translations[language][key];
  };
};
