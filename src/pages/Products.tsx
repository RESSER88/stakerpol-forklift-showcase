
import { useState, useEffect } from 'react';
import { ChevronDown, Filter, Grid, List } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import { Product } from '@/types';

const Products = () => {
  const { products, loading } = useSupabaseProducts();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [filters, setFilters] = useState({
    hasImages: false,
    hasSpecs: false
  });

  // Filtrowanie i sortowanie produktów
  useEffect(() => {
    let result = [...products];

    // Filtrowanie po wyszukiwanej frazie
    if (searchTerm) {
      result = result.filter(product =>
        product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrowanie po kryteriach
    if (filters.hasImages) {
      result = result.filter(product => product.images && product.images.length > 0);
    }

    if (filters.hasSpecs) {
      result = result.filter(product => 
        product.specs && Object.values(product.specs).some(value => value && value.toString().trim() !== '')
      );
    }

    // Sortowanie
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        break;
      case 'name':
        result.sort((a, b) => a.model.localeCompare(b.model));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchTerm, sortBy, filters]);

  if (loading) {
    return (
      <Layout>
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-stakerpol-orange mx-auto"></div>
              <p className="mt-4 text-gray-600">Ładowanie produktów...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar z filtrami */}
            <div className="lg:w-1/4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Wyszukaj</h3>
                      <input
                        type="text"
                        placeholder="Szukaj produktów..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Sortowanie</h3>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="newest">Najnowsze</option>
                        <option value="oldest">Najstarsze</option>
                        <option value="name">Nazwa A-Z</option>
                      </select>
                    </div>

                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full">
                        <h3 className="font-semibold">Filtry</h3>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-3 mt-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasImages"
                            checked={filters.hasImages}
                            onCheckedChange={(checked) =>
                              setFilters(prev => ({ ...prev, hasImages: !!checked }))
                            }
                          />
                          <label htmlFor="hasImages" className="text-sm">Ze zdjęciami</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasSpecs"
                            checked={filters.hasSpecs}
                            onCheckedChange={(checked) =>
                              setFilters(prev => ({ ...prev, hasSpecs: !!checked }))
                            }
                          />
                          <label htmlFor="hasSpecs" className="text-sm">Ze specyfikacją</label>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista produktów */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-stakerpol-navy">Nasze Produkty</h1>
                  <p className="text-gray-600 mt-2">
                    Znaleziono {filteredProducts.length} z {products.length} produktów
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Brak produktów</h3>
                  <p className="text-gray-600">
                    {searchTerm || Object.values(filters).some(Boolean)
                      ? "Spróbuj zmienić kryteria wyszukiwania"
                      : "Nie znaleziono żadnych produktów w bazie danych"
                    }
                  </p>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
