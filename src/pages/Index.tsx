
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PopularMedicines from '@/components/home/PopularMedicines';
import LatestArticles from '@/components/home/LatestArticles';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PopularMedicines />
        <LatestArticles />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
