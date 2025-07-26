import React from 'react';
import { PremiumContact } from '../components/ui/premium-contact';
import { Globe, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RainbowButton } from '../components/ui/rainbow-button';

const Contact = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 w-48 flex-shrink-0">
            <Globe className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">Websives</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Hem</Link>
            <Link to="/#tjanster" className="text-gray-300 hover:text-white transition-colors">Tjänster</Link>
            <Link to="/#priser" className="text-gray-300 hover:text-white transition-colors">Priser</Link>
            <Link to="/omoss" className="text-gray-300 hover:text-white transition-colors">Om oss</Link>
            <Link to="/kontakt" className="text-white font-semibold">Kontakt</Link>
          </div>

          <div className="hidden md:flex items-center flex-shrink-0">
            <a href="https://cal.com/websives/30min" target="_blank" rel="noopener noreferrer">
              <RainbowButton className="text-white font-semibold">
                Boka Konsultation
              </RainbowButton>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden bg-black/95 backdrop-blur-sm border-t border-white/10 mt-4"
        >
          <div className="py-4 space-y-4">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-lg mx-2"
            >
              Hem
            </Link>
            <Link
              to="/#tjanster"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-lg mx-2"
            >
              Tjänster
            </Link>
            <Link
              to="/#priser"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-lg mx-2"
            >
              Priser
            </Link>
            <Link
              to="/omoss"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-lg mx-2"
            >
              Om oss
            </Link>
            <Link
              to="/kontakt"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-white font-semibold hover:bg-white/5 transition-all rounded-lg mx-2"
            >
              Kontakt
            </Link>
            <div className="px-2 pt-2">
              <a href="https://cal.com/websives/30min" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
                <RainbowButton 
                  className="w-full text-white font-semibold justify-center"
                >
                  Boka Konsultation
                </RainbowButton>
              </a>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Contact Component */}
      <PremiumContact />

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold">Websives</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professionella webbsidor som konverterar. 
                Byggt för svenska företag.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Tjänster</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/#tjanster" className="hover:text-white transition-colors">Webbdesign</Link></li>
                <li><Link to="/#tjanster" className="hover:text-white transition-colors">AI Automatisering</Link></li>
                <li><Link to="/#tjanster" className="hover:text-white transition-colors">Marknadsföring</Link></li>
                <li><Link to="/#tjanster" className="hover:text-white transition-colors">SEO</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Företag</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/#om-oss" className="hover:text-white transition-colors">Om Oss</Link></li>
                <li><Link to="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+46 79-301 05 68</li>
                <li>info@websives.com</li>
                <li>Piteå, Sverige</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Websives. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
