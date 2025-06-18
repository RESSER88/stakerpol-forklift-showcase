
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, Image, Copy, ExternalLink } from 'lucide-react';
import { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  viewMode: 'grid' | 'table';
  onEdit: (product: Product) => void;
  onCopy: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductList = ({ products, viewMode, onEdit, onCopy, onDelete }: ProductListProps) => {
  const navigate = useNavigate();
  
  const handlePreviewClick = (productId: string) => {
    window.open(`/products/${productId}`, '_blank');
  };

  const handleModelClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Card>
      <CardContent className="p-0 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Zdjęcie</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="hidden md:table-cell">Krótki Opis</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Brak produktów. Dodaj pierwszy produkt używając przycisku powyżej.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      {product.images?.[0] || product.image ? (
                        <img 
                          src={product.images?.[0] || product.image} 
                          alt={product.model} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/150?text=Brak+zdjęcia";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="link"
                          className="p-0 h-auto font-medium text-left justify-start hover:text-stakerpol-orange"
                          onClick={() => handleModelClick(product.id)}
                        >
                          {product.model}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handlePreviewClick(product.id)}
                          title="Zobacz podgląd produktu"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground sm:hidden line-clamp-1">
                        {product.shortDescription}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {product.shortDescription}
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
                        onClick={() => onDelete(product)}
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

export default ProductList;
