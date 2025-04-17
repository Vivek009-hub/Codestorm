
import React from 'react';
import { Stethoscope, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-medical-blue text-white relative overflow-hidden">
      {/* Abstract medical shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full opacity-10 -ml-40 -mb-40"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-8 w-8" />
              <h3 className="text-2xl font-semibold">AI Health Consultation</h3>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Have Health Questions? Our AI Can Help.
            </h2>
            
            <p className="text-lg mb-8 text-blue-100">
              Get instant answers to your health questions, information about symptoms, and general health advice from our AI assistant.
            </p>
            
            <Button size="lg" className="bg-white text-medical-blue hover:bg-blue-50">
              <Link to="/ai-consultation" className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                <span>Start AI Consultation</span>
              </Link>
            </Button>
          </div>
          
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <div className="flex gap-3 items-start">
                <div className="bg-green-500 p-2 rounded-full">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">AI Health Assistant</p>
                  <p className="text-sm text-blue-100">How can I help with your health concerns today?</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <p className="text-sm italic">
                "I've been having frequent headaches in the afternoons. What could be causing this?"
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex gap-3 items-start">
                <div className="bg-green-500 p-2 rounded-full">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">AI Health Assistant</p>
                  <p className="text-sm text-blue-100">
                    Afternoon headaches could be triggered by several factors including:
                    <br/><br/>
                    • Dehydration (especially if you're not drinking enough water throughout the day)
                    <br/>
                    • Eye strain from computer screens or reading
                    <br/>
                    • Stress or tension buildup during the workday
                    <br/>
                    • Caffeine withdrawal if you drink coffee in the morning
                    <br/><br/>
                    Try staying hydrated, taking short breaks from screens, and practicing relaxation techniques. If headaches persist or are severe, please consult with a healthcare provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
