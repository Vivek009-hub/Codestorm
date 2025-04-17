
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatBox from '@/components/consultation/ChatBox';
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const AiConsultation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI Health Consultation
              </h1>
              <p className="text-xl text-gray-600">
                Get instant answers to your health questions from our AI assistant
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChatBox />
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-medical-blue" />
                    <h3 className="font-semibold text-lg">How It Works</h3>
                  </div>
                  
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <span className="bg-medical-lightblue text-medical-blue h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 font-medium">1</span>
                      <span>Type your health question in the chat box</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-medical-lightblue text-medical-blue h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 font-medium">2</span>
                      <span>Our AI analyzes your question based on medical information</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-medical-lightblue text-medical-blue h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 font-medium">3</span>
                      <span>Receive reliable information and guidance</span>
                    </li>
                  </ol>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-2 mb-4 text-amber-600">
                    <AlertTriangle className="h-5 w-5" />
                    <h3 className="font-semibold text-lg">Important Notice</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Our AI provides general health information and is not a replacement for professional medical advice. Always consult with a qualified healthcare provider for medical concerns.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-2 mb-4 text-medical-green">
                    <CheckCircle className="h-5 w-5" />
                    <h3 className="font-semibold text-lg">What You Can Ask</h3>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li>• General health questions</li>
                    <li>• Information about common symptoms</li>
                    <li>• Basic information about medications</li>
                    <li>• General wellness and prevention tips</li>
                    <li>• Understanding medical terms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AiConsultation;
