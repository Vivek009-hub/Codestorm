
import React from 'react';
import { ArrowRight, Search, MessageCircle, Pill } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-green-50 py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Health, <span className="text-medical-blue">Our Priority</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700">
              Get reliable health information, access our medicine database, and receive AI-powered health consultations - all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-medical-blue hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg">
                <Link to="/ai-consultation" className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>AI Consultation</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="px-8 py-6 text-lg">
                <Link to="/medicine-database" className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  <span>Search Medicines</span>
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              * Get immediate answers to your health questions with our advanced AI system.
            </p>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -top-12 right-10 w-48 h-48 bg-medical-lightblue rounded-lg p-6 shadow-lg animate-fade-in-up">
              <Pill className="h-10 w-10 text-medical-blue mb-2" />
              <h4 className="font-medium">Medicine Database</h4>
              <p className="text-sm mt-1 text-muted-foreground">Access information on 1000+ medications</p>
            </div>
            
            <div className="absolute -bottom-4 left-10 w-48 h-48 bg-medical-lightblue rounded-lg p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <MessageCircle className="h-10 w-10 text-medical-blue mb-2" />
              <h4 className="font-medium">AI Consultation</h4>
              <p className="text-sm mt-1 text-muted-foreground">Get health advice from our AI assistant</p>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
              alt="Doctor with digital tablet"
              className="rounded-xl shadow-xl max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
