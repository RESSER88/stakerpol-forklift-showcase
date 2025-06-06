
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
import { useProductStore } from '@/stores/productStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/utils/translations';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

interface CompactProductTableProps {
  onEdit: (product: Product) => void;
  onCopy: (product: Product) => void;
}

const CompactProductTable = ({ onEdit, onCopy }: CompactProductTableProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { toast } = useToast();
  const { products, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    return products.filter(product =>
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.specs.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.specs.productionYear?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleDelete = (product: Product) => {
    if (confirm(`Czy na pewno chcesz usunąć produkt ${product.model}?`)) {
      deleteProduct(product.id);
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
        title: t('exportCompleted'),
        description: t('printSavePdf')
      });
    }
  };

  const exportToJPG = async () => {
    try {
      if (!html2canvas) {
        toast({
          title: t('exportError'),
          description: t('exportLibraryNotAvailable'),
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
      tempDiv.style.width = '1200px';
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
          link.download = `stakerpol-produkty-${new Date().toISOString().split('T')[0]}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          toast({
            title: t('exportCompleted'),
            description: t('jpgFileDownloaded')
          });
        }
      }, 'image/jpeg', 0.95);
    } catch (error) {
      console.error('Export to JPG failed:', error);
      toast({
        title: t('exportError'),
        description: t('jpgExportFailed'),
        variant: "destructive"
      });
    }
  };

  const generateExportTable = () => {
    const currentDate = new Date().toLocaleDateString('pl-PL');
    const contactInfo = {
      pl: `
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 2px solid #1e40af;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px; font-weight: bold;">STAKERPOL</h1>
          <p style="margin: 8px 0; font-size: 16px; color: #374151;">Profesjonalna sprzedaż wózków widłowych BT Toyota</p>
          <div style="margin-top: 15px;">
            <p style="margin: 4px 0; font-size: 14px;"><strong>Tel:</strong> +48 694 133 592</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>E-mail:</strong> info@stakerpol.pl</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Adres:</strong> Puławska 403, 02-801 Warszawa</p>
          </div>
        </div>
      `,
      en: `
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 2px solid #1e40af;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px; font-weight: bold;">STAKERPOL</h1>
          <p style="margin: 8px 0; font-size: 16px; color: #374151;">Professional sales of BT Toyota forklifts</p>
          <div style="margin-top: 15px;">
            <p style="margin: 4px 0; font-size: 14px;"><strong>Tel:</strong> +48 694 133 592</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>E-mail:</strong> info@stakerpol.pl</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Address:</strong> Puławska 403, 02-801 Warsaw</p>
          </div>
        </div>
      `,
      cs: `
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 2px solid #1e40af;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px; font-weight: bold;">STAKERPOL</h1>
          <p style="margin: 8px 0; font-size: 16px; color: #374151;">Profesionální prodej vysokozdvižných vozíků BT Toyota</p>
          <div style="margin-top: 15px;">
            <p style="margin: 4px 0; font-size: 14px;"><strong>Tel:</strong> +48 694 133 592</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>E-mail:</strong> info@stakerpol.pl</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Adresa:</strong> Puławska 403, 02-801 Varšava</p>
          </div>
        </div>
      `,
      sk: `
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 2px solid #1e40af;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px; font-weight: bold;">STAKERPOL</h1>
          <p style="margin: 8px 0; font-size: 16px; color: #374151;">Profesionálny predaj vysokozdvižných vozíkov BT Toyota</p>
          <div style="margin-top: 15px;">
            <p style="margin: 4px 0; font-size: 14px;"><strong>Tel:</strong> +48 694 133 592</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>E-mail:</strong> info@stakerpol.pl</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Adresa:</strong> Puławska 403, 02-801 Varšava</p>
          </div>
        </div>
      `,
      de: `
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 2px solid #1e40af;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px; font-weight: bold;">STAKERPOL</h1>
          <p style="margin: 8px 0; font-size: 16px; color: #374151;">Professioneller Verkauf von BT Toyota Gabelstaplern</p>
          <div style="margin-top: 15px;">
            <p style="margin: 4px 0; font-size: 14px;"><strong>Tel:</strong> +48 694 133 592</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>E-mail:</strong> info@stakerpol.pl</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Adresse:</strong> Puławska 403, 02-801 Warschau</p>
          </div>
        </div>
      `
    };

    return `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: white; color: #111827; max-width: 1200px; margin: 0 auto;">
        ${contactInfo[language] || contactInfo.pl}
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #1e40af; margin: 0 0 8px 0; font-size: 20px;">${t('inventoryStatement')}</h2>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">${t('exportDate')}: ${currentDate}</p>
          <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">${t('totalProducts')}: ${filteredProducts.length}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <thead>
            <tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 13px; border-right: 1px solid rgba(255,255,255,0.3);">${t('model')}</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 13px; border-right: 1px solid rgba(255,255,255,0.3);">${t('serialNumber')}</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 13px; border-right: 1px solid rgba(255,255,255,0.3);">${t('productionYear')}</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 13px; border-right: 1px solid rgba(255,255,255,0.3);">${t('workingHours')}</th>
              <th style="padding: 12px 8px; text-align: left; font-weight: 600; font-size: 13px;">${t('condition')}</th>
            </tr>
          </thead>
          <tbody>
            ${filteredProducts.map((product, index) => `
              <tr style="background: ${index % 2 === 0 ? '#f8fafc' : 'white'}; border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 8px; font-weight: 500; color: #1e40af; border-right: 1px solid #e5e7eb; font-size: 13px;">${product.model}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 13px;">${product.specs.serialNumber || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 13px;">${product.specs.productionYear || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; border-right: 1px solid #e5e7eb; font-size: 13px;">${product.specs.workingHours || '-'}</td>
                <td style="padding: 10px 8px; color: #374151; font-size: 13px;">${product.specs.condition || '-'}</td>
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
        <title>${t('inventoryStatement')}</title>
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

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg">{t('compactTableView')}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t('filterProducts')}
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
      </CardHeader>
      
      <CardContent className="p-0 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">{t('model')}</TableHead>
              <TableHead className="hidden sm:table-cell">{t('serialNumber')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('productionYear')}</TableHead>
              <TableHead className="hidden lg:table-cell">{t('workingHours')}</TableHead>
              <TableHead className="hidden xl:table-cell">{t('condition')}</TableHead>
              <TableHead className="text-right w-[120px]">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? t('noMatchingProducts') : t('noProducts')}
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="space-y-1">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-left justify-start hover:text-stakerpol-orange"
                        onClick={() => handleModelClick(product.id)}
                      >
                        {product.model}
                      </Button>
                      <div className="text-xs text-muted-foreground sm:hidden">
                        {product.specs.serialNumber && `S/N: ${product.specs.serialNumber}`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.specs.serialNumber || '-'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.specs.productionYear || '-'}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {product.specs.workingHours || '-'}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {product.specs.condition || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePreviewClick(product.id)}
                        title={t('viewProductDetails')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onCopy(product)}
                        className="h-8 w-8 p-0"
                        title={t('copyProduct')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="h-8 w-8 p-0"
                        title={t('editProduct')}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
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
      </CardContent>
    </Card>
  );
};

export default CompactProductTable;
