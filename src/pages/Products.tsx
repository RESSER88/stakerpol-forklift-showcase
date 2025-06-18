
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import AdminShield from '@/components/admin/AdminShield';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';

const Products = () => {
  const { products, loading, error } = useSupabaseProducts();

  console.log('Products data:', products); // Debug log
  console.log('Loading state:', loading); // Debug log
  console.log('Error state:', error); // Debug log

  if (loading) {
    return (
      <Layout>
        <AdminShield />
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

  if (error) {
    return (
      <Layout>
        <AdminShield />
        <section className="bg-white py-12">
          <div className="container-custom">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-600 mb-2">Błąd ładowania</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminShield />
      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-stakerpol-navy mb-4">Nasze Produkty</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Odkryj naszą szeroką gamę wózków widłowych i urządzeń magazynowych
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Brak produktów</h3>
              <p className="text-gray-600">
                Nie znaleziono żadnych produktów w bazie danych. Sprawdź połączenie z bazą danych.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  viewMode="grid"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
