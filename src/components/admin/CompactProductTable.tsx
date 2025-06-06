
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
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';

interface CompactProductTableProps {
  onEdit: (product: Product) => void;
  onCopy: (product: Product) => void;
}

const CompactProductTable = ({ onEdit, onCopy }: CompactProductTableProps) => {
  const { language } = useLanguage();
  const t = useTranslation(language);
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
    const confirmMessage = language === 'pl' ? `Czy na pewno chcesz usunąć produkt ${product.model}?` :
                          language === 'en' ? `Are you sure you want to delete the product ${product.model}?` :
                          language === 'cs' ? `Opravdu chcete smazat produkt ${product.model}?` :
                          language === 'sk' ? `Naozaj chcete zmazať produkt ${product.model}?` :
                          `Möchten Sie das Produkt ${product.model} wirklich löschen?`;
    
    if (confirm(confirmMessage)) {
      deleteProduct(product.id);
      toast({
        title: language === 'pl' ? "Produkt usunięty" : 
               language === 'en' ? "Product deleted" :
               language === 'cs' ? "Produkt smazán" :
               language === 'sk' ? "Produkt zmazaný" :
               "Produkt gelöscht",
        description: language === 'pl' ? `Pomyślnie usunięto produkt ${product.model}` :
                    language === 'en' ? `Successfully deleted product ${product.model}` :
                    language === 'cs' ? `Úspěšně smazán produkt ${product.model}` :
                    language === 'sk' ? `Úspešne zmazaný produkt ${product.model}` :
                    `Produkt ${product.model} erfolgreich gelöscht`
      });
    }
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const currentDate = new Date().toLocaleString(language === 'cs' ? 'cs-CZ' : 
                                                 language === 'sk' ? 'sk-SK' :
                                                 language === 'de' ? 'de-DE' :
                                                 language === 'en' ? 'en-US' : 'pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const tableHeaders = {
      number: '#',
      model: t('model'),
      serialNumber: t('serialNumber'),
      productionYear: language === 'pl' ? 'Rok prod.' : 
                     language === 'en' ? 'Prod. Year' :
                     language === 'cs' ? 'Rok výr.' :
                     language === 'sk' ? 'Rok výr.' :
                     'Baujahr',
      workingHours: language === 'pl' ? 'Godz. pracy' :
                   language === 'en' ? 'Work. Hours' :
                   language === 'cs' ? 'Prac. hod.' :
                   language === 'sk' ? 'Prac. hod.' :
                   'Betr. Std.',
      liftHeight: language === 'pl' ? 'Wys. podn.' :
                 language === 'en' ? 'Lift Height' :
                 language === 'cs' ? 'Výš. zdv.' :
                 language === 'sk' ? 'Výš. zdv.' :
                 'Hubhöhe',
      minHeight: language === 'pl' ? 'Min. wys.' :
                language === 'en' ? 'Min. Height' :
                language === 'cs' ? 'Min. výš.' :
                language === 'sk' ? 'Min. výš.' :
                'Min. Höhe',
      battery: t('battery')
    };

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
          <title>${t('inventoryStatement')}</title>
          <style>
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 12px;
              margin: 20px;
              line-height: 1.4;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #1e40af;
              padding-bottom: 15px;
            }
            .company-info {
              display: flex;
              flex-direction: column;
            }
            .company-name {
              font-size: 20px;
              font-weight: bold;
              color: #1e40af;
              margin-bottom: 5px;
            }
            .company-contact {
              font-size: 10px;
              color: #666;
              line-height: 1.3;
            }
            .export-info {
              text-align: right;
              font-size: 10px;
              color: #666;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
              font-size: 11px;
            }
            th {
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              padding: 10px 8px;
              font-weight: bold;
              text-align: left;
              color: #1e40af;
            }
            td {
              border: 1px solid #e2e8f0;
              padding: 8px;
            }
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
            .footer {
              text-align: center;
              font-size: 10px;
              color: #666;
              border-top: 1px solid #e2e8f0;
              padding-top: 15px;
              margin-top: 20px;
            }
            .summary {
              margin-bottom: 15px;
              padding: 10px;
              background-color: #f8fafc;
              border-left: 4px solid #1e40af;
              font-size: 11px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-info">
              <div class="company-name">${t('inventoryStatement')}</div>
              <div class="company-contact">
                Stakerpol<br>
                Tel: +48 694 133 592<br>
                Email: kontakt@stakerpol.pl<br>
                www.stakerpol.pl
              </div>
            </div>
            <div class="export-info">
              ${t('exportDate')}: ${currentDate}<br>
              ${language === 'pl' ? 'Produktów w zestawieniu' : 
                language === 'en' ? 'Products in statement' :
                language === 'cs' ? 'Produktů v přehledu' :
                language === 'sk' ? 'Produktov v súpise' :
                'Produkte in Aufstellung'}: ${filteredAndSortedProducts.length}
            </div>
          </div>
          
          <div class="summary">
            <strong>${language === 'pl' ? 'Podsumowanie:' : 
                     language === 'en' ? 'Summary:' :
                     language === 'cs' ? 'Shrnutí:' :
                     language === 'sk' ? 'Súhrn:' :
                     'Zusammenfassung:'}</strong> 
            ${language === 'pl' ? 'Łączna liczba produktów w inwentaryzacji' : 
              language === 'en' ? 'Total number of products in inventory' :
              language === 'cs' ? 'Celkový počet produktů v inventáři' :
              language === 'sk' ? 'Celkový počet produktov v inventári' :
              'Gesamtanzahl der Produkte im Inventar'}: <strong>${filteredAndSortedProducts.length}</strong>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>${tableHeaders.number}</th>
                <th>${tableHeaders.model}</th>
                <th>${tableHeaders.serialNumber}</th>
                <th>${tableHeaders.productionYear}</th>
                <th>${tableHeaders.workingHours}</th>
                <th>${tableHeaders.liftHeight}</th>
                <th>${tableHeaders.minHeight}</th>
                <th>${tableHeaders.battery}</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          
          <div class="footer">
            <div style="margin-bottom: 5px;">
              <strong>Stakerpol</strong> - ${language === 'pl' ? 'Profesjonalne wózki widłowe BT Toyota' :
                                             language === 'en' ? 'Professional BT Toyota Forklifts' :
                                             language === 'cs' ? 'Profesionální vysokozdvižné vozíky BT Toyota' :
                                             language === 'sk' ? 'Profesionálne vysokozdvižné vozíky BT Toyota' :
                                             'Professionelle BT Toyota Gabelstapler'}
            </div>
            <div>www.stakerpol.pl | kontakt@stakerpol.pl | +48 694 133 592</div>
          </div>
          
          <div class="no-print" style="margin-top: 30px; text-align: center;">
            <button onclick="window.print()" style="padding: 12px 24px; background: #1e40af; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 10px; font-size: 14px;">${t('printSavePdf')}</button>
            <button onclick="window.close()" style="padding: 12px 24px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">${t('close')}</button>
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
    exportDiv.style.width = '1200px'; // Wider for better quality
    exportDiv.style.backgroundColor = 'white';
    exportDiv.style.padding = '30px';
    exportDiv.style.fontFamily = 'Arial, sans-serif';

    const currentDate = new Date().toLocaleString(language === 'cs' ? 'cs-CZ' : 
                                                 language === 'sk' ? 'sk-SK' :
                                                 language === 'de' ? 'de-DE' :
                                                 language === 'en' ? 'en-US' : 'pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const tableHeaders = {
      number: '#',
      model: t('model'),
      serialNumber: t('serialNumber'),
      productionYear: language === 'pl' ? 'Rok prod.' : 
                     language === 'en' ? 'Prod. Year' :
                     language === 'cs' ? 'Rok výr.' :
                     language === 'sk' ? 'Rok výr.' :
                     'Baujahr',
      workingHours: language === 'pl' ? 'Godz. pracy' :
                   language === 'en' ? 'Work. Hours' :
                   language === 'cs' ? 'Prac. hod.' :
                   language === 'sk' ? 'Prac. hod.' :
                   'Betr. Std.',
      liftHeight: language === 'pl' ? 'Wys. podn.' :
                 language === 'en' ? 'Lift Height' :
                 language === 'cs' ? 'Výš. zdv.' :
                 language === 'sk' ? 'Výš. zdv.' :
                 'Hubhöhe',
      minHeight: language === 'pl' ? 'Min. wys.' :
                language === 'en' ? 'Min. Height' :
                language === 'cs' ? 'Min. výš.' :
                language === 'sk' ? 'Min. výš.' :
                'Min. Höhe',
      battery: t('battery')
    };

    const tableRows = filteredAndSortedProducts.map((product, index) => `
      <tr style="${index % 2 === 1 ? 'background-color: #f9fafb;' : ''}">
        <td style="border: 1px solid #e2e8f0; padding: 12px; text-align: center; font-weight: 500;">${index + 1}</td>
        <td style="border: 1px solid #e2e8f0; padding: 12px; font-weight: 500;">${product.model}</td>
        <td style="border: 1px solid #e2e8f0; padding: 12px;">${product.specs.serialNumber || '-'}</td>
        <td style="border: 1px solid #e2e8f0; padding: 12px;">${product.specs.productionYear || '-'}</td>
        <td style="border: 1px solid #e2e8f0; padding: 12px;">${product.specs.workingHours || '-'}</td>
        <td style="border: 1px solid #e2e8f0; padding: 12px;">${product.specs.liftHeight || '-'}</td>
        <td style="border: 1px solid #e2e8f0; padding: 12px;">${product.specs.minHeight || '-'}</td>
        <td style="border: 1px solid #e2e8f0; padding: 12px;">${product.specs.battery || '-'}</td>
      </tr>
    `).join('');

    exportDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 3px solid #1e40af; padding-bottom: 20px;">
        <div>
          <div style="font-size: 28px; font-weight: bold; color: #1e40af; margin-bottom: 10px;">${t('inventoryStatement')}</div>
          <div style="font-size: 14px; color: #666; line-height: 1.5;">
            <strong>Stakerpol</strong><br>
            Tel: +48 694 133 592<br>
            Email: kontakt@stakerpol.pl<br>
            www.stakerpol.pl
          </div>
        </div>
        <div style="text-align: right; font-size: 14px; color: #666;">
          <div style="margin-bottom: 5px;"><strong>${t('exportDate')}:</strong> ${currentDate}</div>
          <div><strong>${language === 'pl' ? 'Produktów w zestawieniu' : 
                        language === 'en' ? 'Products in statement' :
                        language === 'cs' ? 'Produktů v přehledu' :
                        language === 'sk' ? 'Produktov v súpise' :
                        'Produkte in Aufstellung'}:</strong> ${filteredAndSortedProducts.length}</div>
        </div>
      </div>
      
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f8fafc; border-left: 5px solid #1e40af; border-radius: 4px;">
        <div style="font-size: 16px; font-weight: bold; color: #1e40af; margin-bottom: 5px;">
          ${language === 'pl' ? 'Podsumowanie inwentaryzacji' : 
            language === 'en' ? 'Inventory Summary' :
            language === 'cs' ? 'Shrnutí inventáře' :
            language === 'sk' ? 'Súhrn inventára' :
            'Inventar-Zusammenfassung'}
        </div>
        <div style="font-size: 14px; color: #374151;">
          ${language === 'pl' ? 'Łączna liczba produktów' : 
            language === 'en' ? 'Total number of products' :
            language === 'cs' ? 'Celkový počet produktů' :
            language === 'sk' ? 'Celkový počet produktov' :
            'Gesamtanzahl der Produkte'}: <strong style="color: #1e40af;">${filteredAndSortedProducts.length}</strong>
        </div>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <thead>
          <tr style="background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);">
            <th style="border: 1px solid #1e40af; padding: 15px 12px; font-weight: bold; color: white; text-align: center;">${tableHeaders.number}</th>
            <th style="border: 1px solid #1e40af; padding: 15px 12px; font-weight: bold; color: white;">${tableHeaders.model}</th>
            <th style="border: 1px solid #1e40af; padding: 15px 12px; font-weight: bold; color: white;">${tableHeaders.serialNumber}</th>
            <th style="border: 1px solid #1e40af; padding: 15px 12px; font-weight: bold; color: white;">${tableHeaders.productionYear}</th>
            <th style="border: 1px solid #1e40af; padding: 15px 12px; font-weight: bold; color: white;">${tableHeaders.workingHours}</th>
            <th style="border: 1px solid #1e40af; padding: 15px 12px; font-weight: bold; color: white;">${tableHeaders.liftHeight}</th>
            <th style="border: 1px solid #1e40af; padding: 15px 12px; font-weight: bold; color: white;">${tableHeaders.minHeight}</th>
            <th style="border: 1px solid #1e40af; padding: 15px 12px; font-weight: bold; color: white;">${tableHeaders.battery}</th>
          </tr>
        </thead>
        <tbody style="font-size: 13px;">
          ${tableRows}
        </tbody>
      </table>
      
      <div style="text-align: center; font-size: 12px; color: #666; border-top: 2px solid #e2e8f0; padding-top: 20px;">
        <div style="margin-bottom: 8px; font-weight: bold; color: #1e40af;">
          Stakerpol - ${language === 'pl' ? 'Profesjonalne wózki widłowe BT Toyota' :
                       language === 'en' ? 'Professional BT Toyota Forklifts' :
                       language === 'cs' ? 'Profesionální vysokozdvižné vozíky BT Toyota' :
                       language === 'sk' ? 'Profesionálne vysokozdvižné vozíky BT Toyota' :
                       'Professionelle BT Toyota Gabelstapler'}
        </div>
        <div style="color: #374151;">www.stakerpol.pl | kontakt@stakerpol.pl | +48 694 133 592</div>
      </div>
    `;

    document.body.appendChild(exportDiv);

    // Use html2canvas for JPG export
    import('html2canvas').then(html2canvas => {
      html2canvas.default(exportDiv, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        width: 1200,
        height: exportDiv.scrollHeight
      }).then(canvas => {
        // Create download link
        const link = document.createElement('a');
        link.download = `${language === 'pl' ? 'inwentaryzacja' : 
                         language === 'en' ? 'inventory' :
                         language === 'cs' ? 'inventura' :
                         language === 'sk' ? 'inventar' :
                         'inventar'}-stakerpol-${new Date().toISOString().split('T')[0]}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
        
        // Clean up
        document.body.removeChild(exportDiv);
        
        toast({
          title: t('exportCompleted'),
          description: t('jpgFileDownloaded')
        });
      }).catch(error => {
        console.error('Export error:', error);
        document.body.removeChild(exportDiv);
        toast({
          title: t('exportError'),
          description: t('jpgExportFailed'),
          variant: "destructive"
        });
      });
    }).catch(error => {
      console.error('html2canvas import error:', error);
      document.body.removeChild(exportDiv);
      toast({
        title: t('exportError'),
        description: t('exportLibraryNotAvailable'),
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
          <CardTitle className="text-lg">{t('compactTableView')}</CardTitle>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Input
                placeholder={t('filterProducts')}
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
                <SortableHeader field="model">{t('model')}</SortableHeader>
                <SortableHeader field="serialNumber">{t('serialNumber')}</SortableHeader>
                <SortableHeader field="productionYear">{language === 'pl' ? 'Rok prod.' : 
                                                          language === 'en' ? 'Prod. Year' :
                                                          language === 'cs' ? 'Rok výr.' :
                                                          language === 'sk' ? 'Rok výr.' :
                                                          'Baujahr'}</SortableHeader>
                <SortableHeader field="workingHours">{language === 'pl' ? 'Godz. pracy' :
                                                       language === 'en' ? 'Work. Hours' :
                                                       language === 'cs' ? 'Prac. hod.' :
                                                       language === 'sk' ? 'Prac. hod.' :
                                                       'Betr. Std.'}</SortableHeader>
                <TableHead>{language === 'pl' ? 'Wys. podn.' :
                           language === 'en' ? 'Lift Height' :
                           language === 'cs' ? 'Výš. zdv.' :
                           language === 'sk' ? 'Výš. zdv.' :
                           'Hubhöhe'}</TableHead>
                <TableHead>{language === 'pl' ? 'Min. wys.' :
                           language === 'en' ? 'Min. Height' :
                           language === 'cs' ? 'Min. výš.' :
                           language === 'sk' ? 'Min. výš.' :
                           'Min. Höhe'}</TableHead>
                <TableHead>{t('battery')}</TableHead>
                <TableHead className="text-right w-32">{language === 'pl' ? 'Akcje' :
                                                          language === 'en' ? 'Actions' :
                                                          language === 'cs' ? 'Akce' :
                                                          language === 'sk' ? 'Akcie' :
                                                          'Aktionen'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProducts.length === 0 ? (
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  {filterText ? t('noMatchingProducts') : t('noProducts')}
                </TableCell>
              ) : (
                filteredAndSortedProducts.map((product, index) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell className="text-center text-sm font-medium text-gray-500">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium max-w-32">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-left justify-start hover:text-stakerpol-orange truncate"
                        onClick={() => onEdit(product)}
                        title={product.model}
                      >
                        {product.model}
                      </Button>
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
                          title={t('copyProduct')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onEdit(product)}
                          className="h-8 w-8 p-0"
                          title={t('editProduct')}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(product)}
                          className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                          title={t('deleteProduct')}
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
