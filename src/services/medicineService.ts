import { Medicine } from '@/components/medicine/MedicineCard';
import medicineData from './medicines.json';

interface Params {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}

/**
 * Get all medicines with pagination, search, and category filter
 */
export const getMedicines = ({ page, limit, search = '', category = '' }: Params) => {
  let filteredMedicines = [...medicineData];

  // Apply search filter
  if (search) {
    filteredMedicines = filteredMedicines.filter(medicine =>
      medicine.name.toLowerCase().includes(search.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply category filter
  if (category) {
    filteredMedicines = filteredMedicines.filter(medicine =>
      medicine.category.toLowerCase() === category.toLowerCase()
    );
  }

  const total = filteredMedicines.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = filteredMedicines.slice(startIndex, endIndex);

  return {
    data,
    total,
    totalPages,
    currentPage: page,
  };
};

/**
 * Get all medicines without pagination
 */
export const getAllMedicines = () => {
  return medicineData;
};

/**
 * Get all categories
 */
export const getAllCategories = () => {
  const categories = [...new Set(medicineData.map(medicine => medicine.category))];
  return categories;
};

/**
 * Get a specific medicine by ID
 */
export const getMedicineById = (id: number) => {
  const allMedicines = getAllMedicines();
  return allMedicines.find(medicine => medicine.id === id);
};
