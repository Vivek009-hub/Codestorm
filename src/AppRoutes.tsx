
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import MedicineDatabase from './pages/MedicineDatabase';
import MedicineDetail from './pages/MedicineDetail';
import AiConsultation from './pages/AiConsultation';
import HealthArticles from './pages/HealthArticles';
import ArticleDetail from './pages/ArticleDetail';
import SavedArticles from './pages/SavedArticles';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import FitnessTracker from './pages/FitnessTracker';
import FitnessTrackerLayout from './pages/FitnessTrackerLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/medicine-database" element={<MedicineDatabase />} />
      <Route path="/medicine-database/:id" element={<MedicineDetail />} />
      <Route path="/ai-consultation" element={<AiConsultation />} />
      <Route path="/health-articles" element={<HealthArticles />} />
      <Route path="/health-articles/:id" element={<ArticleDetail />} />
      <Route path="/saved-articles" element={<SavedArticles />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/fitness" element={<FitnessTrackerLayout />} />
      <Route path="/fitness-tracker/*" element={<FitnessTracker />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
