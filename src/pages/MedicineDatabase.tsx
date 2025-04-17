
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/medicine/SearchBar';
import MedicineCard from '@/components/medicine/MedicineCard';
import MedicinePagination from '@/components/medicine/MedicinePagination';
import { Filter, Pill, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useQuery } from '@tanstack/react-query';
import { getMedicines, getAllCategories } from '@/services/medicineService';

const MedicineDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12; // Items per page

  // Get all categories for filter
  const categories: string[] = getAllCategories();

  // Query for medicines with pagination and filtering
  const { data: medicinesData, isLoading, isError } = useQuery({
    queryKey: ['medicines', page, searchTerm, selectedCategory, limit],
    queryFn: () => getMedicines({
      page,
      limit,
      search: searchTerm,
      category: selectedCategory
    })
  });

  // Handle search and filter
  const handleSearch = (term: string, category: string) => {
    setSearchTerm(term);
    setSelectedCategory(category === 'all' ? '' : category);
    setPage(1); // Reset to first page on new search
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show toast on error
  useEffect(() => {
    if (isError) {
      toast.error("Failed to load medicines. Please try again.");
    }
  }, [isError]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="flex justify-center items-center mb-4">
                <Pill className="h-10 w-10 text-medical-blue mr-2" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Medicine Database
                </h1>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Database className="h-5 w-5 text-medical-blue" />
                <p className="text-xl text-gray-600">
                  {medicinesData ? `Discover our database of ${medicinesData.total} medicines` : 'Loading database...'}
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} categories={categories} />
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                {!isLoading && medicinesData && (
                  <>
                    Showing {Math.min(medicinesData.total, (page - 1) * limit + 1)}-
                    {Math.min(medicinesData.total, page * limit)} of {medicinesData.total} medicines
                  </>
                )}
              </div>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
            
            {/* Mobile filters panel */}
            {showFilters && (
              <div className="p-4 mb-6 border rounded-lg bg-white">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  <Button 
                    variant={selectedCategory === '' ? "default" : "outline"} 
                    size="sm"
                    className="mr-2 mb-2"
                    onClick={() => {
                      setSelectedCategory('');
                      setPage(1);
                    }}
                  >
                    All
                  </Button>
                  
                  {categories.map((cat: string) => (
                    <Button 
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"} 
                      size="sm"
                      className="mr-2 mb-2"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setPage(1);
                      }}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Loading state */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : medicinesData && medicinesData.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {medicinesData.data.map(medicine => (
                    <MedicineCard key={medicine.id} medicine={medicine} />
                  ))}
                </div>
                
                {/* Pagination */}
                <MedicinePagination 
                  currentPage={page} 
                  totalPages={medicinesData.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium mb-2">No medicines found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MedicineDatabase;
