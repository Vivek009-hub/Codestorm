
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-medical-blue" />
          <Link to="/" className="text-2xl font-bold text-medical-blue">MedicInfo</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-medical-blue transition-colors">Home</Link>
          <Link to="/ai-consultation" className="font-medium hover:text-medical-blue transition-colors">AI Consultation</Link>
          <Link to="/medicine-database" className="font-medium hover:text-medical-blue transition-colors">Medicines</Link>
          <Link to="/health-articles" className="font-medium hover:text-medical-blue transition-colors">Articles</Link>
          <Link to="/fitness" className="font-medium hover:text-medical-blue transition-colors">Fitness Tracker</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/saved-articles">
              <Heart className="h-4 w-4" />
              <span>Saved</span>
            </Link>
          </Button>
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 md:hidden">
          <div className="container-custom py-6 flex flex-col gap-4">
            <Link to="/" 
              className="py-3 px-4 text-lg rounded-md hover:bg-accent transition-colors" 
              onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/ai-consultation" 
              className="py-3 px-4 text-lg rounded-md hover:bg-accent transition-colors" 
              onClick={toggleMenu}>
              AI Consultation
            </Link>
            <Link to="/medicine-database" 
              className="py-3 px-4 text-lg rounded-md hover:bg-accent transition-colors" 
              onClick={toggleMenu}>
              Medicines
            </Link>
            <Link to="/health-articles" 
              className="py-3 px-4 text-lg rounded-md hover:bg-accent transition-colors" 
              onClick={toggleMenu}>
              Articles
            </Link>
            <Link to="/fitness" 
              className="py-3 px-4 text-lg rounded-md hover:bg-accent transition-colors" 
              onClick={toggleMenu}>
              Fitness Tracker
            </Link>
            <Link to="/saved-articles" 
              className="py-3 px-4 text-lg rounded-md hover:bg-accent transition-colors" 
              onClick={toggleMenu}>
              Saved
            </Link>
            <hr className="my-2" />
            <Button className="w-full" asChild>
              <Link to="/sign-in" onClick={toggleMenu}>Sign In</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
