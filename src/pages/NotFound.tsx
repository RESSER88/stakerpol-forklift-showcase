
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const NotFound = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      window.location.pathname
    );
  }, []);

  return (
    <Layout>
      <div className="container-custom py-20 text-center">
        <h1 className="text-6xl font-bold mb-4 text-toyota-red">404</h1>
        <p className="text-2xl text-gray-600 mb-8">
          {language === 'pl' ? 'Strona nie została znaleziona' : 
           language === 'en' ? 'Page not found' :
           language === 'cs' ? 'Stránka nebyla nalezena' : 'Stránka nebola nájdená'}
        </p>
        <Button className="cta-button" asChild>
          <Link to="/">
            {language === 'pl' ? 'Wróć do strony głównej' : 
             language === 'en' ? 'Return to Home' :
             language === 'cs' ? 'Zpět na domovskou stránku' : 'Späť na domovskú stránku'}
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
