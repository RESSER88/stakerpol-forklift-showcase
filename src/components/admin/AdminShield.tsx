
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminShield = () => {
  return (
    <Link to="/admin">
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-stakerpol-orange hover:text-white transition-all duration-200"
        title="Panel Administracyjny"
      >
        <Shield className="h-5 w-5" />
      </Button>
    </Link>
  );
};

export default AdminShield;
