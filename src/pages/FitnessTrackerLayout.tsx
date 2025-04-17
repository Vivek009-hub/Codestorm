
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Activity, Book, Calculator, Heart, User } from 'lucide-react';
import FitnessTracker from './FitnessTracker';

const FitnessTrackerLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  
  // Function to handle sidebar visibility change that will be passed to FitnessTracker
  const handleSidebarVisibilityChange = (isVisible: boolean) => {
    setSidebarVisible(isVisible);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className={`bg-white shadow-md py-4 sticky top-0 z-10 transition-all duration-300 ease-in-out ${sidebarVisible ? 'pl-6' : 'pl-6'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-medical-blue" />
            <h1 className="text-2xl font-bold text-medical-blue">Fitness Tracker</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hover:bg-blue-50 text-medical-blue transition-colors gap-2 rounded-xl">
              <Link to="/">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="hover:bg-blue-50 text-medical-blue transition-colors gap-2 rounded-xl">
              <Link to="/ai-consultation">
                <Calculator className="h-5 w-5" />
                <span>AI Consultation</span>
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="hover:bg-blue-50 text-medical-blue transition-colors gap-2 rounded-xl">
              <Link to="/medicine-database">
                <Heart className="h-5 w-5" />
                <span>Medicines</span>
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="hover:bg-blue-50 text-medical-blue transition-colors gap-2 rounded-xl">
              <Link to="/health-articles">
                <Book className="h-5 w-5" />
                <span>Articles</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="ml-2 bg-gradient-to-r from-blue-500 to-medical-blue text-white hover:opacity-90 rounded-xl border-none">
              <Link to="/sign-in">
                <User className="h-5 w-5 mr-1" />
                <span>Sign In</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <FitnessTracker standalone={true} />
      </main>
    </div>
  );
};

export default FitnessTrackerLayout;
