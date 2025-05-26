
import { Truck, Clock, Handshake } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Truck,
      title: "Szybka dostawa",
      description: "Błyskawiczna realizacja zamówień dzięki szerokiej dostępności magazynowej",
      color: "bg-stakerpol-orange"
    },
    {
      icon: Clock,
      title: "Profesjonalne doradztwo", 
      description: "Doświadczeni eksperci pomogą wybrać idealny sprzęt dla Twoich potrzeb",
      color: "bg-blue-600"
    },
    {
      icon: Handshake,
      title: "Używane wózki od ręki",
      description: "Sprawdzone i serwisowane maszyny gotowe do natychmiastowego użycia",
      color: "bg-green-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-stakerpol-navy">
          Dlaczego warto wybrać Stakerpol
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-lg animate-fade-in border border-gray-100 shadow-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-full shadow-md mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stakerpol-navy">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
