
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Download, FileImage, Search, Copy, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Product } from '@/types';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import { useToast } from '@/hooks/use-toast';
import { measurePerformance } from '@/utils/performance';

interface CompactProductTableProps {
  onEdit: (product: Product) => void;
  onCopy: (product: Product) => void;
}

const CompactProductTable = ({ onEdit, onCopy }: CompactProductTableProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { toast } = useToast();
  const { products, deleteProduct } = useSupabaseProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    
    if (searchTerm) {
      filtered = products.filter(product =>
        product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specs.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specs.productionYear?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any = '';
        let bValue: any = '';

        switch (sortColumn) {
          case 'model':
            aValue = a.model;
            bValue = b.model;
            break;
          case 'serialNumber':
            aValue = a.specs.serialNumber || '';
            bValue = b.specs.serialNumber || '';
            break;
          case 'productionYear':
            aValue = parseInt(a.specs.productionYear || '0');
            bValue = parseInt(b.specs.productionYear || '0');
            break;
          case 'workingHours':
            aValue = parseInt(a.specs.workingHours?.replace(/[^\d]/g, '') || '0');
            bValue = parseInt(b.specs.workingHours?.replace(/[^\d]/g, '') || '0');
            break;
          case 'liftHeight':
            aValue = parseInt(a.specs.liftHeight?.replace(/[^\d]/g, '') || '0');
            bValue = parseInt(b.specs.liftHeight?.replace(/[^\d]/g, '') || '0');
            break;
          case 'minHeight':
            aValue = parseInt(a.specs.minHeight?.replace(/[^\d]/g, '') || '0');
            bValue = parseInt(b.specs.minHeight?.replace(/[^\d]/g, '') || '0');
            break;
          case 'preliminaryLifting':
            aValue = a.specs.preliminaryLifting || '';
            bValue = b.specs.preliminaryLifting || '';
            break;
          case 'battery':
            aValue = a.specs.battery || '';
            bValue = b.specs.battery || '';
            break;
          case 'operatorPlatform':
            aValue = a.specs.operatorPlatform || '';
            bValue = b.specs.operatorPlatform || '';
            break;
          default:
            return 0;
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        const comparison = aValue.toString().localeCompare(bValue.toString());
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [products, searchTerm, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (product: Product) => {
    if (confirm(`Czy na pewno chcesz usunąć produkt ${product.model}?`)) {
      await deleteProduct(product.id);
      toast({
        title: "Produkt usunięty",
        description: `Pomyślnie usunięto produkt ${product.model}`
      });
    }
  };

  const handlePreviewClick = (productId: string) => {
    window.open(`/products/${productId}`, '_blank');
  };

  const handleModelClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const exportToPDF = () => {
    const printContent = generatePrintableTable();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
      
      toast({
        title: 'Eksport PDF',
        description: 'Dokument został przygotowany do druku/zapisu'
      });
    }
  };

  const exportToJPG = async () => {
    try {
      measurePerformance.markStart('jpg-export');
      
      const html2canvas = await measurePerformance.loadHtml2Canvas();
      
      if (!html2canvas) {
        toast({
          title: 'Błąd eksportu',
          description: 'Biblioteka eksportu nie jest dostępna',
          variant: "destructive"
        });
        return;
      }

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateExportTable();
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '40px';
      tempDiv.style.width = '1400px';
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false
      });

      document.body.removeChild(tempDiv);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `stakerpol-magazyn-${new Date().toISOString().split('T')[0]}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          measurePerformance.markEnd('jpg-export');
          
          toast({
            title: 'Eksport JPG',
            description: 'Plik JPG został pobrany'
          });
        }
      }, 'image/jpeg', 0.95);
    } catch (error) {
      console.error('Export to JPG failed:', error);
      toast({
        title: 'Błąd eksportu',
        description: 'Nie udało się wyeksportować do JPG',
        variant: "destructive"
      });
    }
  };

  const generateExportTable = () => {
    const currentDate = new Date().toLocaleDateString('pl-PL');
    const contactInfo = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #1e40af;">
        <div style="flex: 1;">
          <h1 style="color: #1e40af; margin: 0 0 12px 0; font-size: 28px; font-weight: bold;">FHU Stakerpol</h1>
          <p style="margin: 6px 0; font-size: 14px; color: #374151;"><strong>Michał Seweryn</strong></p>
          <p style="margin: 4px 0; font-size: 13px; color: #374151;">ul. Szewska 6, 32-043 Skała</p>
          <p style="margin: 4px 0; font-size: 13px; color: #374151;"><strong>E-mail:</strong> info@stakerpol.pl</p>
          <p style="margin: 4px 0; font-size: 13px; color: #374151;"><strong>Tel:</strong> +48 694 133 592</p>
          <p style="margin: 4px 0; font-size: 13px; color: #374151;"><strong>www.stakerpol.pl</strong></p>
        </div>
        <div style="text-align: right;">
          <p style="margin: 0; color: #6b7280; font-size: 13px;">Data eksportu: ${currentDate}</p>
          <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 13px;">Liczba produktów: ${filteredAndSortedProducts.length}</p>
        </div>
      </div>
    `;

    return `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: white; color: #111827; max-width: 1400px; margin: 0 auto;">
        ${contactInfo}
        
        <h2 style="color: #1e40af; margin: 0 0 25px 0; font-size: 22px; text-align: center;">Karta stanu magazynu</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <thead>
            <tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Nr</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Model</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Nr seryjny</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Rok prod.</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Godz. pracy [mh]</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Wys. podn. [mm]</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Wys. konstr. [mm]</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Wstępne podn.</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Bateria</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Składany podest</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Maszt</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px; border-right: 1px solid rgba(255,255,255,0.3);">Wymiary [mm]</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 12px;">Wolny skok [mm]</th>
            </tr>
          </thead>
          <tbody>
            ${filteredAndSortedProducts.map((product, index) => `
              <tr style="background: ${index % 2 === 0 ? '#f8fafc' : 'white'}; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 8px; font-weight: 500; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${index + 1}</td>
                <td style="padding: 10px 8px; font-weight: 500; color: #1e40af; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.model}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.serialNumber || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.productionYear || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.workingHours || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.liftHeight || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.minHeight || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.preliminaryLifting || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.battery || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.operatorPlatform || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.mast || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 11px;">${product.specs.dimensions || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; font-size: 11px;">${product.specs.freeStroke || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  };

  const generatePrintableTable = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Karta stanu magazynu - FHU Stakerpol</title>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: white; }
          @media print {
            body { margin: 0; padding: 15px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        ${generateExportTable()}
      </body>
      </html>
    `;
  };

  const SortableHeader = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center justify-between">
        {children}
        {sortColumn === column && (
          <span className="ml-1 text-xs">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg">Zarządzanie Produktami - Widok Kompaktowy</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Filtruj produkty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportToPDF}
                className="flex-1 sm:flex-initial"
              >
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToJPG}
                className="flex-1 sm:flex-initial"
              >
                <FileImage className="mr-2 h-4 w-4" />
                JPG
              </Button>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Łącznie produktów: <span className="font-semibold text-stakerpol-orange">{products.length}</span>
          {searchTerm && (
            <span className="ml-2">
              (wyświetlane: <span className="font-semibold">{filteredAndSortedProducts.length}</span>)
            </span>
          )}
        </p>
      </CardHeader>
      
      <CardContent className="p-0 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Nr</TableHead>
              <SortableHeader column="model">Model</SortableHeader>
              <SortableHeader column="serialNumber">Nr seryjny</SortableHeader>
              <SortableHeader column="productionYear">Rok prod.</SortableHeader>
              <SortableHeader column="workingHours">Godz. pracy [mh]</SortableHeader>
              <SortableHeader column="liftHeight">Wys. podn. [mm]</SortableHeader>
              <SortableHeader column="minHeight">Wys. konstr. [mm]</SortableHeader>
              <SortableHeader column="preliminaryLifting">Wstępne podn.</SortableHeader>
              <SortableHeader column="battery">Bateria</SortableHeader>
              <SortableHeader column="operatorPlatform">Składany podest</SortableHeader>
              <TableHead className="text-right w-[120px]">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? 'Brak produktów pasujących do filtra' : 'Brak produktów'}
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedProducts.map((product, index) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium text-left justify-start hover:text-stakerpol-orange"
                      onClick={() => handleModelClick(product.id)}
                    >
                      {product.model}
                    </Button>
                  </TableCell>
                  <TableCell>{product.specs.serialNumber || '-'}</TableCell>
                  <TableCell>{product.specs.productionYear || '-'}</TableCell>
                  <TableCell>{product.specs.workingHours || '-'}</TableCell>
                  <TableCell>{product.specs.liftHeight || '-'}</TableCell>
                  <TableCell>{product.specs.minHeight || '-'}</TableCell>
                  <TableCell>{product.specs.preliminaryLifting || '-'}</TableCell>
                  <TableCell>{product.specs.battery || '-'}</TableCell>
                  <TableCell>{product.specs.operatorPlatform || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePreviewClick(product.id)}
                        title="Podgląd produktu"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onCopy(product)}
                        className="h-8 w-8 p-0"
                        title="Duplikuj produkt"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="h-8 w-8 p-0"
                        title="Edytuj produkt"
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
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
      </CardContent>
    </Card>
  );
};

export default CompactProductTable;
