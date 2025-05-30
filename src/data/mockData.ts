
import { Product } from '@/types';
import { generateBlackWhiteCheckerboard, generateBlueYellowCheckerboard } from '@/utils/generateCheckerboard';

export const products: Product[] = [
  {
    id: "1",
    model: "Toyota SPE 160L",
    image: "/lovable-uploads/6e5d96de-d749-4128-b04e-bca7004df2b7.png",
    images: [
      "/lovable-uploads/6e5d96de-d749-4128-b04e-bca7004df2b7.png",
      "/lovable-uploads/c6b103db-0f96-4137-9911-80b50af35519.png",
      generateBlackWhiteCheckerboard(),
      generateBlueYellowCheckerboard(),
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Elektryczny paletowy wózek widłowy o udźwigu 1600 kg z ergonomiczną kabiną operatora.",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
    specs: {
      // Main section
      productionYear: "2023",
      mastLiftingCapacity: "1600",
      preliminaryLiftingCapacity: "1200",
      workingHours: "1200 h",
      liftHeight: "6000 mm",
      minHeight: "85 mm",
      preliminaryLifting: "120 mm",
      battery: "80V / 500Ah z ładowarką 80V 100A",
      condition: "Bardzo dobry",
      serialNumber: "TOY-SPE160-2023-001",
      
      // Expandable section
      driveType: "Elektryczny",
      mast: "Triplex",
      freeStroke: "150 mm",
      dimensions: "2850 x 1150 x 2100 mm",
      wheels: "Poliuretanowe",
      operatorPlatform: "Tak",
      additionalOptions: "Triplex, kabina operatora, wyświetlacz LCD",
      additionalDescription: "Wózek wyposażony w nowoczesną kabinę operatora z systemem amortyzacji oraz zaawansowany system kontroli wydajności baterii.",
      
      // Legacy compatibility
      capacity: "1600 kg",
      charger: "Tak - 80V 100A"
    }
  },
  {
    id: "2", 
    model: "BT Reflex RRE 160",
    image: "/lovable-uploads/61ef61e3-2c2f-4c92-9a42-2f2932896324.png",
    images: [
      "/lovable-uploads/61ef61e3-2c2f-4c92-9a42-2f2932896324.png",
      "/lovable-uploads/afeeff55-3f29-4e9d-93fe-a19fd458a3a1.png",
      generateBlueYellowCheckerboard(),
      generateBlackWhiteCheckerboard(),
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Zasięgowy wózek widłowy BT z nowoczesnym systemem sterowania i wysoką efektywnością energetyczną.",
    createdAt: "2024-02-10T14:30:00.000Z",
    updatedAt: "2024-02-10T14:30:00.000Z",
    specs: {
      // Main section
      productionYear: "2022",
      mastLiftingCapacity: "1600",
      preliminaryLiftingCapacity: "1400", 
      workingHours: "800 h",
      liftHeight: "5500 mm",
      minHeight: "90 mm",
      preliminaryLifting: "140 mm",
      battery: "80V / 465Ah z ładowarką 80V 80A",
      condition: "Bardzo dobry",
      serialNumber: "BT-RRE160-2022-042",
      
      // Expandable section
      driveType: "Elektryczny",
      mast: "Duplex",
      freeStroke: "130 mm",
      dimensions: "2950 x 1200 x 2150 mm",
      wheels: "Pneumatyczne",
      operatorPlatform: "Nie",
      additionalOptions: "Duplex, system nawigacji, LED oświetlenie",
      additionalDescription: "Zaawansowany wózek zasięgowy z systemem automatycznej nawigacji i energooszczędnym napędem elektrycznym.",
      
      // Legacy compatibility
      capacity: "1600 kg",
      charger: "Tak - 80V 80A"
    }
  },
  {
    id: "3",
    model: "Toyota SWE 080",
    image: "/lovable-uploads/466c3bea-ce11-4033-ae63-30eed1b3d610.png",
    images: [
      "/lovable-uploads/466c3bea-ce11-4033-ae63-30eed1b3d610.png",
      "/lovable-uploads/89e3bb74-afbd-43a7-a8f2-9300ad79f08a.png",
      generateBlackWhiteCheckerboard(),
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Kompaktowy elektryczny wózek widłowy z wyjątkową manewrowością i niskim poziomem hałasu.",
    createdAt: "2024-03-05T09:15:00.000Z",
    updatedAt: "2024-03-05T09:15:00.000Z",
    specs: {
      // Main section
      productionYear: "2021",
      mastLiftingCapacity: "800",
      preliminaryLiftingCapacity: "600",
      workingHours: "1500 h", 
      liftHeight: "3200 mm",
      minHeight: "75 mm",
      preliminaryLifting: "100 mm",
      battery: "48V / 320Ah z ładowarką 48V 50A",
      condition: "Dobry",
      serialNumber: "",
      
      // Expandable section
      driveType: "Elektryczny",
      mast: "Simplex",
      freeStroke: "120 mm",
      dimensions: "2100 x 900 x 1950 mm",
      wheels: "Poliuretanowe",
      operatorPlatform: "Nie",
      additionalOptions: "Kompaktowa konstrukcja, cicha praca",
      additionalDescription: "Idealny do pracy w ciasnych przestrzeniach magazynowych. Wyróżnia się wyjątkowo cichą pracą i niskim zużyciem energii.",
      
      // Legacy compatibility
      capacity: "800 kg",
      charger: "Tak - 48V 50A"
    }
  },
  {
    id: "4",
    model: "BT Levio LWE180",
    image: "/lovable-uploads/c8fa54ec-9a98-42d8-ac0f-31ca4981943a.png",
    images: [
      "/lovable-uploads/c8fa54ec-9a98-42d8-ac0f-31ca4981943a.png",
      "/lovable-uploads/3cbce3aa-e5e0-4b49-ba14-1659b0c67cb3.png",
      generateBlackWhiteCheckerboard(),
      generateBlueYellowCheckerboard(),
      "https://images.unsplash.com/photo-1624972873447-9c82494ba575?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Wózek paletowy elektryczny z serii BT Levio o udźwigu do 1.8 tony, idealny do intensywnej pracy.",
    createdAt: "2024-04-12T16:45:00.000Z",
    updatedAt: "2024-04-12T16:45:00.000Z",
    specs: {
      // Main section
      productionYear: "2022",
      mastLiftingCapacity: "1800",
      preliminaryLiftingCapacity: "200",
      workingHours: "950 h",
      liftHeight: "200 mm",
      minHeight: "85 mm",
      preliminaryLifting: "200 mm",
      battery: "24V / 200Ah zintegrowana",
      condition: "Bardzo dobry",
      serialNumber: "BT-LWE180-2022-015",
      
      // Expandable section
      driveType: "Elektryczny",
      mast: "",
      freeStroke: "",
      dimensions: "1900 x 720 x 1300 mm",
      wheels: "Poliuretanowe",
      operatorPlatform: "Nie",
      additionalOptions: "System stabilizacji, ergonomiczny uchwyt",
      additionalDescription: "Paletowy wózek elektryczny z zaawansowanym systemem stabilizacji ładunku i ergonomicznym designem dla komfortu operatora.",
      
      // Legacy compatibility
      capacity: "1800 kg",
      charger: "Zintegrowany"
    }
  },
  {
    id: "5",
    model: "Toyota Traigo 80 8FBE18T",
    image: "/lovable-uploads/7224d802-f5cc-461f-a434-066a7220c2ce.png",
    images: [
      "/lovable-uploads/7224d802-f5cc-461f-a434-066a7220c2ce.png",
      "/lovable-uploads/d1073bb1-ba81-4404-9f27-3c2df998122a.png",
      generateBlackWhiteCheckerboard(),
      "https://images.unsplash.com/photo-1542739675-b44934a54f92?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Elektryczny wózek widłowy Toyota Traigo 80 z serii 8, udźwig 1.8 tony, wysoka wydajność i komfort.",
    createdAt: "2024-05-20T11:20:00.000Z",
    updatedAt: "2024-05-20T11:20:00.000Z",
    specs: {
      // Main section
      productionYear: "2023",
      mastLiftingCapacity: "1800",
      preliminaryLiftingCapacity: "1600",
      workingHours: "600 h",
      liftHeight: "4700 mm",
      minHeight: "140 mm",
      preliminaryLifting: "160 mm",
      battery: "80V / 575Ah z ładowarką 80V 120A",
      condition: "Jak nowy",
      serialNumber: "TOY-8FBE18T-2023-007",
      
      // Expandable section
      driveType: "Elektryczny",
      mast: "Triplex",
      freeStroke: "170 mm",
      dimensions: "2200 x 1200 x 2150 mm",
      wheels: "Superelastyczne",
      operatorPlatform: "Tak",
      additionalOptions: "Pełna kabina, ogrzewanie, oświetlenie LED",
      additionalDescription: "Najnowszy model z serii Toyota Traigo 80 wyposażony w pełną kabinę operatora z ogrzewaniem, klimatyzacją i zaawansowanym systemem oświetlenia LED.",
      
      // Legacy compatibility
      capacity: "1800 kg",
      charger: "Tak - 80V 120A"
    }
  },
  {
    id: "6",
    model: "BT Optio LSE120",
    image: "/lovable-uploads/74b0a1dc-a0f8-4301-9e73-f143182d7f72.png",
    images: [
      "/lovable-uploads/74b0a1dc-a0f8-4301-9e73-f143182d7f72.png",
      "/lovable-uploads/c9f0d435-74d7-40bc-b2f8-616e888a2689.png",
      generateBlackWhiteCheckerboard(),
      generateBlueYellowCheckerboard(),
      "https://images.unsplash.com/photo-1617831843544-545c64648699?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Wózek do kompletacji zamówień BT Optio z podnoszoną platformą, udźwig 1.2 tony, zwiększona efektywność.",
    createdAt: "2024-06-01T08:30:00.000Z",
    updatedAt: "2024-06-01T08:30:00.000Z",
    specs: {
      // Main section
      productionYear: "2021",
      mastLiftingCapacity: "1200",
      preliminaryLiftingCapacity: "280",
      workingHours: "1300 h",
      liftHeight: "2800 mm",
      minHeight: "180 mm",
      preliminaryLifting: "280 mm",
      battery: "24V / 250Ah z ładowarką 24V 40A",
      condition: "Dobry",
      serialNumber: "BT-LSE120-2021-022",
      
      // Expandable section
      driveType: "Elektryczny",
      mast: "Duplex",
      freeStroke: "200 mm",
      dimensions: "2050 x 800 x 2000 mm",
      wheels: "Poliuretanowe",
      operatorPlatform: "Tak",
      additionalOptions: "Podnoszona platforma, skaner kodów kreskowych",
      additionalDescription: "Specjalistyczny wózek do kompletacji zamówień wyposażony w podnoszącą się platformę operatora oraz zintegrowany system skanowania kodów kreskowych dla zwiększenia efektywności pracy.",
      
      // Legacy compatibility
      capacity: "1200 kg",
      charger: "Tak - 24V 40A"
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
