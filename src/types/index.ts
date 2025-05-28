
export interface Product {
  id: string;
  model: string;
  image: string; // Keep for backward compatibility - will be same as images[0]
  images: string[]; // Array of up to 5 images
  shortDescription: string;
  createdAt: string; // ISO date string for when product was created
  updatedAt: string; // ISO date string for when product was last updated
  specs: {
    productionYear: string;
    capacity: string;
    workingHours: string;
    liftHeight: string;
    minHeight: string;
    battery: string;
    charger: string;
    condition: string;
    dimensions: string;
    wheels: string;
    additionalOptions: string;
    serialNumber?: string; // Optional serial number
  };
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  content: string;
  rating: number;
}
