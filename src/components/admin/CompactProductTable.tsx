
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
import { Pencil, Copy, ArrowUpDown, Filter, Trash2, FileText, Download } from 'lucide-react';
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
  const { products, deleteProduct } = useProductStore();
  const { toast } = useToast();

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

  const handleDelete = (product: Product) => {
    if (confirm(`Czy na pewno chcesz usunąć produkt ${product.model}?`)) {
      deleteProduct(product.id);
      toast({
        title: "Produkt usunięty",
        description: `Pomyślnie usunięto produkt ${product.model}`
      });
    }
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const currentDate = new Date().toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const tableRows = filteredAndSortedProducts.map((product, index) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.model}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.serialNumber || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.productionYear || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.workingHours || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.liftHeight || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.minHeight || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.battery || '-'}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Zestawienie inwentaryzacji - Stakerpol</title>
          <style>
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 12px;
              margin: 20px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            .company-name {
              font-size: 18px;
              font-weight: bold;
              color: #1e40af;
            }
            .export-date {
              font-size: 10px;
              color: #666;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th {
              background-color: #f3f4f6;
              border: 1px solid #ddd;
              padding: 8px;
              font-weight: bold;
              text-align: left;
            }
            .footer {
              text-align: center;
              font-size: 10px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 10px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="company-name">Zestawienie inwentaryzacji - Stakerpol</div>
            </div>
            <div class="export-date">Data eksportu: ${currentDate}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Model</th>
                <th>Nr seryjny</th>
                <th>Rok prod.</th>
                <th>Godz. pracy</th>
                <th>Wys. podn.</th>
                <th>Min. wys.</th>
                <th>Bateria</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          
          <div class="footer">
            www.stakerpol.pl
          </div>
          
          <div class="no-print" style="margin-top: 20px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #1e40af; color: white; border: none; border-radius: 4px; cursor: pointer;">Drukuj / Zapisz jako PDF</button>
            <button onclick="window.close()" style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Zamknij</button>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
  };

  const exportToJPG = () => {
    // Create a temporary div with the table content
    const exportDiv = document.createElement('div');
    exportDiv.style.position = 'absolute';
    exportDiv.style.left = '-9999px';
    exportDiv.style.width = '794px'; // A4 width in pixels
    exportDiv.style.backgroundColor = 'white';
    exportDiv.style.padding = '20px';
    exportDiv.style.fontFamily = 'Arial, sans-serif';

    const currentDate = new Date().toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const tableRows = filteredAndSortedProducts.map((product, index) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.model}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.serialNumber || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.productionYear || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.workingHours || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.liftHeight || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.minHeight || '-'}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${product.specs.battery || '-'}</td>
      </tr>
    `).join('');

    exportDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
        <div style="font-size: 18px; font-weight: bold; color: #1e40af;">Zestawienie inwentaryzacji - Stakerpol</div>
        <div style="font-size: 12px; color: #666;">Data eksportu: ${currentDate}</div>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">#</th>
            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Model</th>
            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Nr seryjny</th>
            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Rok prod.</th>
            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Godz. pracy</th>
            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Wys. podn.</th>
            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Min. wys.</th>
            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Bateria</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      
      <div style="text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px;">
        www.stakerpol.pl
      </div>
    `;

    document.body.appendChild(exportDiv);

    // Use html2canvas for JPG export
    import('html2canvas').then(html2canvas => {
      html2canvas.default(exportDiv, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true
      }).then(canvas => {
        // Create download link
        const link = document.createElement('a');
        link.download = `inwentaryzacja-stakerpol-${new Date().toISOString().split('T')[0]}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
        
        // Clean up
        document.body.removeChild(exportDiv);
        
        toast({
          title: "Eksport ukończony",
          description: "Plik JPG został pobrany"
        });
      }).catch(error => {
        console.error('Export error:', error);
        document.body.removeChild(exportDiv);
        toast({
          title: "Błąd eksportu",
          description: "Nie udało się wyeksportować do JPG",
          variant: "destructive"
        });
      });
    }).catch(error => {
      console.error('html2canvas import error:', error);
      document.body.removeChild(exportDiv);
      toast({
        title: "Błąd eksportu",
        description: "Biblioteka eksportu nie jest dostępna",
        variant: "destructive"
      });
    });
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Filtruj produkty..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportToPDF}
                className="flex-1 sm:flex-none"
              >
                <FileText className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToJPG}
                className="flex-1 sm:flex-none"
              >
                <Download className="h-4 w-4 mr-1" />
                JPG
              </Button>
            </div>
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
                <TableHead className="text-right w-32">Akcje</TableHead>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(product)}
                          className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                          title="Usuń produkt"
                        >
                          <Trash2 className="h-3 w-3" />
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
