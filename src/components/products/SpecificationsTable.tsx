
import { Product } from '@/types';
import { Language } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

interface SpecificationsTableProps {
  product: Product;
  language: Language;
}

const SpecificationsTable = ({ product, language }: SpecificationsTableProps) => {
  const t = useTranslation(language);

  const specifications = [
    { key: 'model', label: t('model'), value: product.model },
    { key: 'productionYear', label: t('productionYear'), value: product.specs.productionYear },
    { key: 'capacity', label: t('capacity'), value: product.specs.capacity },
    { key: 'workingHours', label: t('workingHours'), value: product.specs.workingHours },
    { key: 'liftHeight', label: t('liftHeight'), value: product.specs.liftHeight },
    { key: 'minHeight', label: t('minHeight'), value: product.specs.minHeight },
    { key: 'battery', label: t('battery'), value: product.specs.battery },
    { key: 'charger', label: t('charger'), value: product.specs.charger },
    { key: 'condition', label: t('condition'), value: product.specs.condition },
    { key: 'dimensions', label: t('dimensions'), value: product.specs.dimensions },
    { key: 'wheels', label: t('wheels'), value: product.specs.wheels },
    { key: 'additionalOptions', label: t('additionalOptions'), value: product.specs.additionalOptions },
  ];

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-lg overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {specifications.map((spec, index) => (
              <tr key={spec.key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                  {spec.label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {specifications.map((spec, index) => (
          <div key={spec.key} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="font-medium text-gray-900 text-sm mb-1">
              {spec.label}
            </div>
            <div className="text-gray-600 text-sm">
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SpecificationsTable;
