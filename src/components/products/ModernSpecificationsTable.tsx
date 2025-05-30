
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { Language } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

interface ModernSpecificationsTableProps {
  product: Product;
  language: Language;
}

const ModernSpecificationsTable = ({ product, language }: ModernSpecificationsTableProps) => {
  const t = useTranslation(language);
  const [isExpanded, setIsExpanded] = useState(false);

  // Main section specifications (always visible if filled)
  const mainSpecs = [
    { key: 'model', label: 'Model', value: product.model },
    ...(product.specs.serialNumber ? [
      { key: 'serialNumber', label: 'Numer seryjny', value: product.specs.serialNumber }
    ] : []),
    { key: 'productionYear', label: 'Rok produkcji', value: product.specs.productionYear },
    { key: 'mastLiftingCapacity', label: 'Udźwig przy podnoszeniu masztu [kg]', value: product.specs.mastLiftingCapacity || product.specs.capacity },
    { key: 'preliminaryLiftingCapacity', label: 'Udźwig przy podnoszeniu wstępnym [kg]', value: product.specs.preliminaryLiftingCapacity },
    { key: 'workingHours', label: 'Godziny pracy [mh]', value: product.specs.workingHours },
    { key: 'liftHeight', label: 'Wysokość podnoszenia [mm]', value: product.specs.liftHeight },
    { key: 'minHeight', label: 'Wysokość konstrukcyjna [mm]', value: product.specs.minHeight },
    { key: 'preliminaryLifting', label: 'Wstępne podnoszenie', value: product.specs.preliminaryLifting },
    { key: 'battery', label: 'Bateria', value: product.specs.battery },
    { key: 'condition', label: 'Stan', value: product.specs.condition },
  ].filter(spec => spec.value && spec.value.trim());

  // Expandable section specifications (hidden by default)
  const expandableSpecs = [
    { key: 'driveType', label: 'Rodzaj napędu', value: product.specs.driveType },
    { key: 'mast', label: 'Maszt', value: product.specs.mast },
    { key: 'freeStroke', label: 'Wolny skok [mm]', value: product.specs.freeStroke },
    { key: 'dimensions', label: 'Wymiary (długość / szerokość) [mm]', value: product.specs.dimensions },
    { key: 'wheels', label: 'Koła', value: product.specs.wheels },
    { key: 'operatorPlatform', label: 'Składany podest dla operatora', value: product.specs.operatorPlatform },
    { key: 'additionalOptions', label: 'Opcje dodatkowe', value: product.specs.additionalOptions },
    { key: 'additionalDescription', label: 'Opis dodatkowy', value: product.specs.additionalDescription },
  ].filter(spec => spec.value && spec.value.trim());

  const hasExpandableContent = expandableSpecs.length > 0;

  const SpecRow = ({ spec, isDescription = false }: { spec: any, isDescription?: boolean }) => (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
      <td className="px-4 py-4 text-sm font-medium text-stakerpol-navy w-2/5 align-top bg-gray-50/30">
        {spec.label}
      </td>
      <td className={`px-4 py-4 text-sm text-gray-700 bg-white ${isDescription ? 'whitespace-pre-wrap break-words leading-relaxed' : ''}`}>
        {spec.value}
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Main specifications table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {mainSpecs.map((spec) => (
              <SpecRow key={spec.key} spec={spec} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Expand button */}
      {hasExpandableContent && (
        <div className="border-t border-gray-200 px-4 py-4 bg-gradient-to-r from-gray-50 to-gray-100">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between text-stakerpol-navy hover:text-stakerpol-orange hover:bg-white/50 transition-all duration-200 font-medium py-3"
          >
            <span className="text-base">
              {isExpanded ? 'Ukryj dodatkowe specyfikacje' : 'Więcej specyfikacji'}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-5 w-5 transition-transform duration-200" />
            )}
          </Button>
        </div>
      )}

      {/* Expandable section with smooth animation */}
      {hasExpandableContent && (
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-200 overflow-x-auto">
            <table className="w-full">
              <tbody>
                {expandableSpecs.map((spec) => (
                  <SpecRow 
                    key={spec.key} 
                    spec={spec} 
                    isDescription={spec.key === 'additionalDescription'}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernSpecificationsTable;
