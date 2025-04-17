
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-8 w-8 text-medical-blue" />
              <span className="text-xl font-bold text-medical-blue">MedicInfo</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Providing reliable health information and resources to help you make informed decisions about your wellbeing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-medical-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-medical-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/ai-consultation" className="text-muted-foreground hover:text-medical-blue transition-colors">AI Consultation</Link>
              </li>
              <li>
                <Link to="/medicine-database" className="text-muted-foreground hover:text-medical-blue transition-colors">Medicine Database</Link>
              </li>
              <li>
                <Link to="/health-articles" className="text-muted-foreground hover:text-medical-blue transition-colors">Health Articles</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-medical-blue transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Health Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-medical-blue transition-colors">Heart Health</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-medical-blue transition-colors">Mental Wellness</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-medical-blue transition-colors">Diabetes</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-medical-blue transition-colors">Women's Health</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-medical-blue transition-colors">Men's Health</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} />
                <span>contact@medicinfo.com</span>
              </p>
              <p className="text-muted-foreground">
                This website provides general information and is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 text-center text-muted-foreground">
          <p>© {currentYear} MedicInfo. All rights reserved. Medical information disclaimer applies.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
