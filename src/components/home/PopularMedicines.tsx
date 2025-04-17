
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import MedicineCard from '../medicine/MedicineCard';
import { getMedicines } from '@/services/medicineService';

const PopularMedicines = () => {
  // Get first 4 medicines from our dataset for display
  const { data: popularMedicines } = getMedicines({ page: 1, limit: 4 });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Popular Medicines</h2>
            <p className="text-muted-foreground">
              Access information on commonly prescribed medications
            </p>
          </div>
          
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/medicine-database" className="flex items-center gap-1">
              View All Medicines
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularMedicines && popularMedicines.map(medicine => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMedicines;
