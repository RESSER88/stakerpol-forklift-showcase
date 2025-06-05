
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';
import { Language } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import ExpandableText from '@/components/ui/ExpandableText';

interface ModernSpecificationsTableProps {
  product: Product;
  language: Language;
}

const ModernSpecificationsTable = ({ product, language }: ModernSpecificationsTableProps) => {
  const [showExtended, setShowExtended] = useState(false);
  const t = useTranslation(language);

  // Main specifications (always visible)
  const mainSpecs = [
    { label: 'Model', value: product.model },
    { label: 'Numer seryjny', value: product.specs.serialNumber },
    { label: 'Rok produkcji', value: product.specs.productionYear },
    { label: 'Udźwig przy podnoszeniu masztu [kg]', value: product.specs.mastLiftingCapacity },
    { label: 'Udźwig przy podnoszeniu wstępnym [kg]', value: product.specs.preliminaryLiftingCapacity },
    { label: 'Godziny pracy [mh]', value: product.specs.workingHours },
    { label: 'Wysokość podnoszenia [mm]', value: product.specs.liftHeight },
    { label: 'Wysokość konstrukcyjna [mm]', value: product.specs.minHeight },
    { label: 'Wstępne podnoszenie', value: product.specs.preliminaryLifting },
    { label: 'Bateria', value: product.specs.battery },
    { label: 'Stan', value: product.specs.condition }
  ].filter(spec => spec.value && spec.value.trim() !== '');

  // Extended specifications (collapsible)
  const extendedSpecs = [
    { label: 'Rodzaj napędu', value: product.specs.driveType },
    { label: 'Maszt', value: product.specs.mast },
    { label: 'Wolny skok [mm]', value: product.specs.freeStroke },
    { label: 'Wymiary (długość / szerokość) [mm]', value: product.specs.dimensions },
    { label: 'Koła', value: product.specs.wheels },
    { label: 'Składany podest dla operatora', value: product.specs.operatorPlatform },
    { label: 'Opcje dodatkowe', value: product.specs.additionalOptions }
  ].filter(spec => spec.value && spec.value.trim() !== '');

  const hasExtendedSpecs = extendedSpecs.length > 0 || (product.specs.additionalDescription && product.specs.additionalDescription.trim() !== '');

  return (
    <div className="space-y-6">
      {/* Main Specifications */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {mainSpecs.map((spec, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between p-4 hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-700 sm:w-1/2">{spec.label}</span>
                <span className="text-gray-900 mt-1 sm:mt-0 sm:text-right sm:w-1/2">{spec.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Extended Specifications Toggle */}
      {hasExtendedSpecs && (
        <>
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowExtended(!showExtended)}
              className="flex items-center gap-2 text-stakerpol-navy border-stakerpol-navy hover:bg-stakerpol-navy hover:text-white transition-all duration-300"
            >
              {showExtended ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ukryj dodatkowe specyfikacje
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Więcej specyfikacji
                </>
              )}
            </Button>
          </div>

          {/* Extended Specifications Content */}
          {showExtended && (
            <div className="animate-fade-in space-y-4">
              {extendedSpecs.length > 0 && (
                <Card className="shadow-sm border border-gray-200">
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {extendedSpecs.map((spec, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:justify-between p-4 hover:bg-gray-50 transition-colors">
                          <span className="font-medium text-gray-700 sm:w-1/2">{spec.label}</span>
                          <span className="text-gray-900 mt-1 sm:mt-0 sm:text-right sm:w-1/2">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Additional Description */}
              {product.specs.additionalDescription && product.specs.additionalDescription.trim() !== '' && (
                <Card className="shadow-sm border border-gray-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-700 mb-3">Opis dodatkowy</h4>
                    <ExpandableText 
                      text={product.specs.additionalDescription}
                      className="text-gray-600 leading-relaxed whitespace-pre-wrap"
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ModernSpecificationsTable;
