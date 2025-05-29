
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Copy, ArrowUpDown, Filter } from 'lucide-react';
import { Product } from '@/types';
import { useProductStore } from '@/stores/productStore';

interface CompactProductTableProps {
  onEdit: (product: Product) => void;
  onCopy: (product: Product) => void;
}

const CompactProductTable = ({ onEdit, onCopy }: CompactProductTableProps) => {
  const [sortField, setSortField] = useState<string>('model');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState('');
  const { products } = useProductStore();

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => 
      product.model.toLowerCase().includes(filterText.toLowerCase()) ||
      product.specs.serialNumber?.toLowerCase().includes(filterText.toLowerCase()) ||
      product.specs.productionYear.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = '';
      let bValue = '';
      
      switch (sortField) {
        case 'model':
          aValue = a.model;
          bValue = b.model;
          break;
        case 'serialNumber':
          aValue = a.specs.serialNumber || '';
          bValue = b.specs.serialNumber || '';
          break;
        case 'productionYear':
          aValue = a.specs.productionYear;
          bValue = b.specs.productionYear;
          break;
        case 'workingHours':
          aValue = a.specs.workingHours;
          bValue = b.specs.workingHours;
          break;
        default:
          aValue = a.model;
          bValue = b.model;
      }
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-gray-50 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className="h-3 w-3 text-gray-400" />
      </div>
    </TableHead>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg">Widok tabelaryczny produktów</CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Filtruj produkty..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 text-center">#</TableHead>
                <SortableHeader field="model">Model</SortableHeader>
                <SortableHeader field="serialNumber">Nr seryjny</SortableHeader>
                <SortableHeader field="productionYear">Rok prod.</SortableHeader>
                <SortableHeader field="workingHours">Godz. pracy</SortableHeader>
                <TableHead>Wys. podn.</TableHead>
                <TableHead>Min. wys.</TableHead>
                <TableHead>Bateria</TableHead>
                <TableHead className="text-right w-24">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    {filterText ? 'Brak produktów pasujących do filtra' : 'Brak produktów'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedProducts.map((product, index) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell className="text-center text-sm font-medium text-gray-500">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium max-w-32">
                      <div className="truncate" title={product.model}>
                        {product.model}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-24">
                      <div className="truncate" title={product.specs.serialNumber || '-'}>
                        {product.specs.serialNumber || '-'}
                      </div>
                    </TableCell>
                    <TableCell>{product.specs.productionYear || '-'}</TableCell>
                    <TableCell>{product.specs.workingHours || '-'}</TableCell>
                    <TableCell>{product.specs.liftHeight || '-'}</TableCell>
                    <TableCell>{product.specs.minHeight || '-'}</TableCell>
                    <TableCell className="max-w-24">
                      <div className="truncate" title={product.specs.battery || '-'}>
                        {product.specs.battery || '-'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onCopy(product)}
                          className="h-8 w-8 p-0"
                          title="Kopiuj produkt"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onEdit(product)}
                          className="h-8 w-8 p-0"
                          title="Edytuj produkt"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactProductTable;
