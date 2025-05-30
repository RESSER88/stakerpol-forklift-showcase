
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
    { key: 'capacity', label: 'Udźwig przy podnoszeniu masztu / Udźwig przy podnoszeniu wstępnym [kg]', value: product.specs.capacity },
    { key: 'workingHours', label: 'Godziny pracy [mh]', value: product.specs.workingHours },
    { key: 'liftHeight', label: 'Wysokość podnoszenia [mm]', value: product.specs.liftHeight },
    { key: 'minHeight', label: 'Wysokość konstrukcyjna [mm]', value: product.specs.minHeight },
    { key: 'preliminaryLifting', label: 'Wstępne podnoszenie', value: product.specs.preliminaryLifting },
    { key: 'battery', label: 'Bateria (z ładowarką)', value: product.specs.battery },
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
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-gray-900 w-2/5 align-top">
        {spec.label}
      </td>
      <td className={`px-4 py-3 text-sm text-gray-600 ${isDescription ? 'whitespace-pre-wrap break-words' : ''}`}>
        {spec.value}
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
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
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between text-stakerpol-navy hover:text-stakerpol-orange transition-colors"
          >
            <span className="font-medium">
              {isExpanded ? 'Ukryj dodatkowe specyfikacje' : 'Więcej specyfikacji'}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}

      {/* Expandable section */}
      {hasExpandableContent && isExpanded && (
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
      )}
    </div>
  );
};

export default ModernSpecificationsTable;
