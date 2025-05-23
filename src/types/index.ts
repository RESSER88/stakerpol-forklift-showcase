
export interface Product {
  id: string;
  model: string;
  image: string;
  shortDescription: string;
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
  };
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  content: string;
  rating: number;
}
