import { Product } from '@/types';
import { generateBlackWhiteCheckerboard, generateBlueYellowCheckerboard } from '@/utils/generateCheckerboard';

export const products: Product[] = [
  {
    id: "1",
    model: "Toyota SPE 160L",
    image: "/lovable-uploads/fa30cbc1-42a2-4099-97e4-34085393ad6d.png",
    images: [
      "/lovable-uploads/fa30cbc1-42a2-4099-97e4-34085393ad6d.png",
      "/lovable-uploads/22977e26-b33e-4a22-8283-08e0b5e5e71c.png",
      generateBlackWhiteCheckerboard(),
      generateBlueYellowCheckerboard(),
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Elektryczny paletowy wózek widłowy o udźwigu 1600 kg z ergonomiczną kabiną operatora.",
    specs: {
      productionYear: "2023",
      capacity: "1600 kg",
      workingHours: "1200 h",
      liftHeight: "6000 mm",
      minHeight: "85 mm",
      battery: "80V / 500Ah",
      charger: "Tak - 80V 100A",
      condition: "Bardzo dobry",
      dimensions: "2850 x 1150 x 2100 mm",
      wheels: "Poliuretanowe",
      additionalOptions: "Triplex, kabina operatora, wyświetlacz LCD",
      serialNumber: "TOY-SPE160-2023-001"
    }
  },
  {
    id: "2", 
    model: "BT Reflex RRE 160",
    image: "/lovable-uploads/ad037c0d-1889-4e04-8356-53cf6e6dc21f.png",
    images: [
      "/lovable-uploads/ad037c0d-1889-4e04-8356-53cf6e6dc21f.png",
      "/lovable-uploads/5e91de32-068f-41a0-94fe-99901204a2b0.png",
      generateBlueYellowCheckerboard(),
      generateBlackWhiteCheckerboard(),
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Zasięgowy wózek widłowy BT z nowoczesnym systemem sterowania i wysoką efektywnością energetyczną.",
    specs: {
      productionYear: "2022",
      capacity: "1600 kg", 
      workingHours: "800 h",
      liftHeight: "5500 mm",
      minHeight: "90 mm",
      battery: "80V / 465Ah",
      charger: "Tak - 80V 80A",
      condition: "Bardzo dobry",
      dimensions: "2950 x 1200 x 2150 mm",
      wheels: "Pneumatyczne",
      additionalOptions: "Duplex, system nawigacji, LED oświetlenie",
      serialNumber: "BT-RRE160-2022-042"
    }
  },
  {
    id: "3",
    model: "Toyota SWE 080",
    image: "/lovable-uploads/29ae705b-a0e6-4261-b14f-a54443a4b9b0.png",
    images: [
      "/lovable-uploads/29ae705b-a0e6-4261-b14f-a54443a4b9b0.png",
      "/lovable-uploads/603e5bbd-67da-4488-8c8c-0e2505a3a576.png",
      generateBlackWhiteCheckerboard(),
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Kompaktowy elektryczny wózek widłowy z wyjątkową manewrowością i niskim poziomem hałasu.",
    specs: {
      productionYear: "2021",
      capacity: "800 kg",
      workingHours: "1500 h", 
      liftHeight: "3200 mm",
      minHeight: "75 mm",
      battery: "48V / 320Ah",
      charger: "Tak - 48V 50A",
      condition: "Dobry",
      dimensions: "2100 x 900 x 1950 mm",
      wheels: "Poliuretanowe",
      additionalOptions: "Kompaktowa konstrukcja, cicha praca",
      serialNumber: ""
    }
  },
  {
    id: "4",
    model: "BT Levio LWE180",
    image: "/lovable-uploads/07e5989b-1e44-4c54-b67c-75b90709506f.png",
    images: [
      "/lovable-uploads/07e5989b-1e44-4c54-b67c-75b90709506f.png",
      generateBlackWhiteCheckerboard(),
      generateBlueYellowCheckerboard(),
      "https://images.unsplash.com/photo-1624972873447-9c82494ba575?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Wózek paletowy elektryczny z serii BT Levio o udźwigu do 1.8 tony, idealny do intensywnej pracy.",
    specs: {
      productionYear: "2022",
      capacity: "1800 kg",
      workingHours: "950 h",
      liftHeight: "200 mm",
      minHeight: "85 mm",
      battery: "24V / 200Ah",
      charger: "Zintegrowany",
      condition: "Bardzo dobry",
      dimensions: "1900 x 720 x 1300 mm",
      wheels: "Poliuretanowe",
      additionalOptions: "System stabilizacji, ergonomiczny uchwyt",
      serialNumber: "BT-LWE180-2022-015"
    }
  },
  {
    id: "5",
    model: "Toyota Traigo 80 8FBE18T",
    image: "/lovable-uploads/49996994-6981-484e-a99d-50199198e39f.png",
    images: [
      "/lovable-uploads/49996994-6981-484e-a99d-50199198e39f.png",
      generateBlackWhiteCheckerboard(),
      "https://images.unsplash.com/photo-1542739675-b44934a54f92?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Elektryczny wózek widłowy Toyota Traigo 80 z serii 8, udźwig 1.8 tony, wysoka wydajność i komfort.",
    specs: {
      productionYear: "2023",
      capacity: "1800 kg",
      workingHours: "600 h",
      liftHeight: "4700 mm",
      minHeight: "140 mm",
      battery: "80V / 575Ah",
      charger: "Tak - 80V 120A",
      condition: "Jak nowy",
      dimensions: "2200 x 1200 x 2150 mm",
      wheels: "Superelastyczne",
      additionalOptions: "Pełna kabina, ogrzewanie, oświetlenie LED",
      serialNumber: "TOY-8FBE18T-2023-007"
    }
  },
  {
    id: "6",
    model: "BT Optio LSE120",
    image: "/lovable-uploads/c93491b1-118f-4978-a939-0e9328abd5d3.png",
    images: [
      "/lovable-uploads/c93491b1-118f-4978-a939-0e9328abd5d3.png",
      generateBlackWhiteCheckerboard(),
      generateBlueYellowCheckerboard(),
      "https://images.unsplash.com/photo-1617831843544-545c64648699?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Wózek do kompletacji zamówień BT Optio z podnoszoną platformą, udźwig 1.2 tony, zwiększona efektywność.",
    specs: {
      productionYear: "2021",
      capacity: "1200 kg",
      workingHours: "1300 h",
      liftHeight: "2800 mm",
      minHeight: "180 mm",
      battery: "24V / 250Ah",
      charger: "Tak - 24V 40A",
      condition: "Dobry",
      dimensions: "2050 x 800 x 2000 mm",
      wheels: "Poliuretanowe",
      additionalOptions: "Podnoszona platforma, skaner kodów kreskowych",
      serialNumber: "BT-LSE120-2021-022"
    }
  }
];

export const testimonials = [
  {
    id: "1",
    name: "Jan Kowalski",
    company: "LogiTrans Sp. z o.o.",
    content: "Doskonała jakość wózków i profesjonalna obsługa. Polecam każdemu, kto szuka niezawodnego sprzętu do magazynu.",
    rating: 5
  },
  {
    id: "2", 
    name: "Anna Nowak",
    company: "Hurtownia ABC",
    content: "Szybka dostawa i fachowe doradztwo. Wózek pracuje bez zarzutu od roku. Bardzo zadowolona z zakupu.",
    rating: 5
  },
  {
    id: "3",
    name: "Piotr Wiśniewski", 
    company: "Magazyn XYZ",
    content: "Konkurencyjne ceny i szeroki wybór. Znaleźliśmy idealny wózek do naszych potrzeb. Serdecznie polecamy!",
    rating: 4
  }
];
