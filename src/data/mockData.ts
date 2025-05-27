import { Product, Testimonial } from '../types';
import { generateBlackWhiteCheckerboard, generateBlueYellowCheckerboard } from '../utils/generateCheckerboard';

// Generate checkerboard images
const blackWhiteCheckerboard = generateBlackWhiteCheckerboard();
const blueYellowCheckerboard = generateBlueYellowCheckerboard();

export const products: Product[] = [
  {
    id: '1',
    model: 'BT Toyota SWE200D',
    image: 'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-SWE200-1.jpg',
    images: [
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-SWE200-1.jpg',
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-SPE-160-L-2.jpg',
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-Reflex-RRE-160-H-3-1.jpg',
      blackWhiteCheckerboard,
      blueYellowCheckerboard
    ],
    shortDescription: 'Kompaktowy wózek paletowy o udźwigu 2000 kg, idealny do zastosowań magazynowych.',
    specs: {
      productionYear: '2018',
      capacity: '2000 kg',
      workingHours: '3200',
      liftHeight: '1600 mm',
      minHeight: '85 mm',
      battery: 'Litowo-jonowa, 48V 120Ah',
      charger: 'Wbudowana ładowarka 230V',
      condition: 'Bardzo dobry',
      dimensions: '1900/720/1500 mm',
      wheels: 'Poliuretan',
      additionalOptions: 'Platforma dla operatora',
      serialNumber: 'TOY-SWE200-2018-001'
    }
  },
  {
    id: '2',
    model: 'BT Toyota SPE160L',
    image: 'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-SPE-160-L-2.jpg',
    images: [
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-SPE-160-L-2.jpg',
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-Reflex-RRE-160-H-3-1.jpg',
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-LWE-200-1.jpg',
      blackWhiteCheckerboard,
      blueYellowCheckerboard
    ],
    shortDescription: 'Wózek paletowy z masztem o udźwigu 1600 kg, idealny do lekkich zastosowań magazynowych.',
    specs: {
      productionYear: '2019',
      capacity: '1600 kg',
      workingHours: '2800',
      liftHeight: '4200 mm',
      minHeight: '90 mm',
      battery: 'Kwasowa, 24V 375Ah',
      charger: 'Zewnętrzna ładowarka 230V',
      condition: 'Dobry',
      dimensions: '2100/850/1950 mm',
      wheels: 'Poliuretan',
      additionalOptions: 'Wolny skok wideł',
      serialNumber: 'TOY-SPE160-2019-042'
    }
  },
  {
    id: '3',
    model: 'BT Toyota RRE160H',
    image: 'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-Reflex-RRE-160-H-3-1.jpg',
    images: [
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-Reflex-RRE-160-H-3-1.jpg',
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-LWE-200-1.jpg',
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-Levio-LPE-200-1.jpg',
      blackWhiteCheckerboard,
      blueYellowCheckerboard
    ],
    shortDescription: 'Wózek wysokiego składowania z przeciwwagą o udźwigu 1600 kg. Doskonały do intensywnej pracy w magazynie.',
    specs: {
      productionYear: '2020',
      capacity: '1600 kg',
      workingHours: '1900',
      liftHeight: '6300 mm',
      minHeight: '110 mm',
      battery: 'Litowo-jonowa, 48V 240Ah',
      charger: 'Szybka ładowarka 400V',
      condition: 'Idealny',
      dimensions: '2400/1200/2100 mm',
      wheels: 'Guma',
      additionalOptions: 'Kamera, pozycjoner wideł'
    }
  },
  {
    id: '4',
    model: 'BT Toyota LRE300',
    image: 'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-LWE-200-1.jpg',
    images: [
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-LWE-200-1.jpg',
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-Levio-LPE-200-1.jpg',
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-SWE200-1.jpg',
      blackWhiteCheckerboard,
      blueYellowCheckerboard
    ],
    shortDescription: 'Wózek paletowy z operatorem stojącym o udźwigu 3000 kg, idealny do intensywnych zastosowań transportowych.',
    specs: {
      productionYear: '2021',
      capacity: '3000 kg',
      workingHours: '1200',
      liftHeight: '1200 mm',
      minHeight: '85 mm',
      battery: 'Kwasowa, 24V 500Ah',
      charger: 'Zewnętrzna ładowarka 230V',
      condition: 'Idealny',
      dimensions: '2200/800/1600 mm',
      wheels: 'Poliuretan',
      additionalOptions: 'Platforma dla drugiego operatora',
      serialNumber: 'TEST-LRE300-12345'
    }
  },
  {
    id: '5',
    model: 'BT Toyota TSE300',
    image: 'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-Levio-LPE-200-1.jpg',
    images: [
      'https://stakerpol.pl/wp-content/uploads/2020/05/Toyota-BT-Levio-LPE-200-1.jpg',
      blackWhiteCheckerboard,
      blueYellowCheckerboard
    ],
    shortDescription: 'Wózek do kompletacji pionowej o udźwigu 3000 kg. Idealny do sklepów i magazynów.',
    specs: {
      productionYear: '2017',
      capacity: '3000 kg',
      workingHours: '4200',
      liftHeight: '3600 mm',
      minHeight: '95 mm',
      battery: 'Kwasowa, 48V 620Ah',
      charger: 'Zewnętrzna ładowarka 400V',
      condition: 'Dobry',
      dimensions: '3100/1400/2300 mm',
      wheels: 'Guma',
      additionalOptions: 'System ważenia, czytnik kodów'
    }
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jan Kowalski',
    company: 'Logistyka XYZ',
    content: 'Świetna współpraca. Wózki widłowe Toyota BT pracują u nas od lat bez awarii. Polecam firmę Stakerpol za profesjonalne podejście i szybką realizację zamówień.',
    rating: 5
  },
  {
    id: '2',
    name: 'Anna Nowak',
    company: 'Hurtownia Budowlana',
    content: 'Kupiliśmy trzy wózki widłowe od Stakerpol. Jakość obsługi na najwyższym poziomie, doradztwo techniczne bardzo pomocne. Sprzęt działa bez zarzutu.',
    rating: 5
  },
  {
    id: '3',
    name: 'Piotr Wiśniewski',
    company: 'Magazyny Centralne',
    content: 'Korzystamy z serwisu Stakerpol od kilku lat. Szybko reagują na zgłoszenia, części zawsze dostępne, a technicy znają się na rzeczy. Polecam!',
    rating: 4
  },
  {
    id: '4',
    name: 'Katarzyna Lis',
    company: 'Firma Produkcyjna',
    content: 'Wózki BT Toyota zakupione w Stakerpol sprawdzają się doskonale w naszej produkcji. Doradztwo przy wyborze modeli było bardzo profesjonalne.',
    rating: 5
  }
];
