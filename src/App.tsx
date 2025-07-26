import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Users, Zap, Globe, Phone, Mail, MapPin, Clock, Award, Target, Rocket, Lightbulb, Gem, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { RainbowButton } from './components/ui/rainbow-button';
import { RainbowOutlineButton } from './components/ui/rainbow-outline-button';
import { Squares } from './components/ui/squares-background';

// Typewriter Animation Component
const TypewriterLogo = () => {
  const [currentText, setCurrentText] = React.useState('Websites');
  const [phase, setPhase] = React.useState('websites-display'); // websites-display, transition-to-websives, websives-display, transition-to-websites
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    switch (phase) {
      case 'websites-display':
        // Show "Websites" for 2 seconds
        timer = setTimeout(() => {
          setPhase('transition-to-websives');
        }, 2000);
        break;
        
      case 'transition-to-websives':
        // Quick transition: remove 't', add 'v'
        timer = setTimeout(() => {
          setCurrentText('Websives');
          setPhase('websives-display');
        }, 150);
        break;
        
      case 'websives-display':
        // Show "Websives" for 5 seconds
        timer = setTimeout(() => {
          setPhase('transition-to-websites');
        }, 5000);
        break;
        
      case 'transition-to-websites':
        // Quick transition: remove 'v', add 't'
        timer = setTimeout(() => {
          setCurrentText('Websites');
          setPhase('websites-display');
        }, 150);
        break;
    }
    
    return () => clearTimeout(timer);
  }, [phase]);

  const renderText = () => {
    if (currentText === 'Websites') {
      return <span className="text-white">Websites</span>;
    } else {
      return (
        <span>
          <span className="text-white">Websi</span>
          <span className="text-white">v</span>
          <span className="text-white">es</span>
        </span>
      );
    }
  };

  return (
    <span className="text-2xl font-bold">
      {renderText()}
      <span className="animate-[blink_1s_step-end_infinite]">|</span>
    </span>
  );
};

// Static Logo Component
const StaticLogo = () => {
  return (
    <span className="text-2xl font-bold">
      <span className="text-white">Websives</span>
    </span>
  );
};

const LogoScroller = () => {
  const logos = [
    "Solstråle Byggkonsult",
    "FjällTech Automatisering", 
    "Norden Digital Studio",
    "PärlMat AB",
    "ArkNord Innovation",
    "VinterGrön Solutions",
    "HavsRörelse Media",
    "BergsVäg Infrastruktur",
    "SkogsGlöd Technologies",
    "Havsbris Design"
  ];

  return (
    <div className="w-full overflow-hidden bg-white/5 backdrop-blur-sm rounded-lg py-6">
      <div className="flex animate-scroll-fast whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-6 px-3">
            {logos.map((logo, index) => (
              <span 
                key={`${i}-${index}`} 
                className="text-gray-400 font-medium text-lg opacity-80 hover:opacity-100 transition-all duration-300 hover:text-gray-300 transform hover:scale-105 flex-shrink-0"
              >
                {logo}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

// Testimonial Card Component
const TestimonialCard = ({ name, role, content, rating = 5 }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 h-full flex flex-col">
    <div className="flex items-center mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-300 mb-4 italic flex-grow">"{content}"</p>
    <div className="mt-auto">
      <p className="font-semibold text-white">{name}</p>
      <p className="text-gray-400 text-sm">{role}</p>
    </div>
  </div>
);

// Dynamic spots calculation component
const DynamicSpotsLeft = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('sv-SE', { month: 'long' });
  const day = currentDate.getDate();
  
  // Calculate spots left based on day of month with specific ranges
  let spotsLeft;
  if (day <= 5) spotsLeft = 5;
  else if (day <= 10) spotsLeft = 4;
  else if (day <= 20) spotsLeft = 3;
  else spotsLeft = 2;
  
  return { spotsLeft, currentMonth };
};

// Get color class based on spots left with neon effects
const getColorFromSlots = (slotsLeft: number) => {
  switch (slotsLeft) {
    case 5:
      return "text-green-400";
    case 4:
      return "text-lime-400";
    case 3:
      return "text-yellow-400";
    case 2:
    default:
      return "text-orange-400";
  }
};

// Get neon glow class based on spots left
const getNeonGlow = (slotsLeft: number) => {
  switch (slotsLeft) {
    case 5:
      return "drop-shadow-[0_0_10px_#22c55e]";
    case 4:
      return "drop-shadow-[0_0_10px_#84cc16]";
    case 3:
      return "drop-shadow-[0_0_10px_#facc15]";
    case 2:
    default:
      return "drop-shadow-[0_0_10px_#f97316]";
  }
};

function App() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { spotsLeft, currentMonth } = DynamicSpotsLeft();
  const slotColor = getColorFromSlots(spotsLeft);
  const neonGlow = getNeonGlow(spotsLeft);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.5}
          borderColor="rgba(255, 255, 255, 0.03)"
          squareSize={60}
          hoverFillColor="rgba(255, 255, 255, 0.01)"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 w-48 flex-shrink-0">
            <Globe className="w-8 h-8 text-blue-500" />
            <StaticLogo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <a href="#tjanster" className="text-gray-300 hover:text-white transition-colors">Tjänster</a>
            <a href="#priser" className="text-gray-300 hover:text-white transition-colors">Priser</a>
            <Link to="/omoss" className="text-gray-300 hover:text-white transition-colors">Om oss</Link>
            <Link to="/kontakt" className="text-gray-300 hover:text-white transition-colors">Kontakt</Link>
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
            <a
              href="#tjanster"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-lg mx-2"
            >
              Tjänster
            </a>
            <a
              href="#priser"
              onClick={closeMobileMenu}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-lg mx-2"
            >
              Priser
            </a>
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
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-lg mx-2"
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

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Snabbare webbsidor.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Fler kunder.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Vi bygger professionella webbsidor som konverterar besökare till kunder. 
              Leverans inom 72 timmar. Byggt för svenska företag.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <RainbowButton className="text-lg px-8 py-4">
                <a href="https://cal.com/websives/30min" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Få Din Webbsida På 72h
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </RainbowButton>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Leverans inom 72h</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Hosting</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>100% nöjdhetsgaranti</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <AnimatedCounter end={150} suffix="+" />
              </div>
              <p className="text-gray-400">Nöjda Kunder</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                <AnimatedCounter end={72} />h
              </div>
              <p className="text-gray-400">Genomsnittlig Leveranstid</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <p className="text-gray-400">Kundnöjdhet</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="tjanster" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Våra Tjänster
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Från enkla landningssidor till avancerade företagswebbsidor. 
              Vi levererar kvalitet som konverterar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Zap className="w-12 h-12 text-yellow-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 break-words hyphens-auto max-w-full">Snabbleverans</h3>
              <p className="text-gray-300 mb-6">
                Få din professionella webbsida levererad inom 72 timmar. 
                Perfekt för företag som behöver komma igång snabbt.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Responsiv design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>SEO-optimerad</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Snabb laddningstid</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Target className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Optimering</h3>
              <p className="text-gray-300 mb-6">
                Vi bygger inte bara vackra webbsidor - vi bygger webbsidor som 
                förvandlar besökare till betalande kunder.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>A/B-testad design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Psykologiska triggers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Tydliga call-to-actions</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Award className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-bold mb-4 break-words hyphens-auto max-w-full">Premium Support</h3>
              <p className="text-gray-300 mb-6">
                Få personlig support från vårt expertteam. Vi finns här för att 
                säkerställa att din webbsida presterar optimalt.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Personlig rådgivning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>30 dagar fri support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Svar inom 24h</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="priser" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enkla Priser
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Lansera snabbare. Konvertera bättre. Byggt för svenska företag.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col h-full"
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-yellow-400 mr-2" />
                  <h3 className="text-2xl font-bold">Starter</h3>
                </div>
                <div className="text-4xl font-bold mb-2">
                  4 200 <span className="text-lg text-gray-400">kr</span>
                </div>
                <p className="text-gray-300">
                  För lokala företag som bara vill ha en enkel, ren webbsida — snabbt.
                </p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Enkel landningssida levererad inom 72 timmar</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Mobiloptimerad, blixtsnabb laddning</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Byggd för att få ditt erbjudande live direkt</span>
                  </li>
                </ul>

                <p className="text-gray-500 italic text-sm mb-6">
                  Perfekt för att testa en idé eller lansera snabbt utan att övertänka.
                </p>
              </div>

              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white mt-auto py-3 px-6 rounded-lg font-semibold transition-colors">
                <a href="https://cal.com/websives/starter" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  Kom Igång
                </a>
              </button>
            </motion.div>

            {/* Growth Plan - Most Popular */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border-2 border-blue-500/50 hover:border-blue-400/70 transition-all duration-300 transform scale-105 shadow-2xl flex flex-col h-full relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-1.5 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg border-2 border-white/20 backdrop-blur-sm whitespace-nowrap">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-pink-500/20 rounded-full blur-md -z-10"></div>
                  <span>🔥</span>
                  <span>Mest Populär</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Rocket className="w-8 h-8 text-blue-400 mr-2" />
                  <h3 className="text-2xl font-bold">Growth</h3>
                </div>
                <div className="text-4xl font-bold mb-2 text-blue-400">
                  5 800 <span className="text-lg text-gray-400">kr</span>
                </div>
                <p className="text-gray-300">
                  Vårt toppval för företag redo att öka bokningar och försäljning — snabbt.
                </p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Allt i Starter</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Fullständig webbsida (flera sektioner) levererad inom 72 timmar</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Copywriting anpassad för din målgrupp</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Byggd för förtroende, tydlighet och resultat</span>
                  </li>
                </ul>

                <p className="text-gray-500 italic text-sm mb-6">
                  Den perfekta balansen mellan kvalitet, hastighet och konverteringskraft.
                </p>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white mt-auto py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                <a href="https://cal.com/websives/growth" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  Välj Growth
                </a>
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col h-full"
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Gem className="w-8 h-8 text-purple-400 mr-2" />
                  <h3 className="text-2xl font-bold">Premium</h3>
                </div>
                <div className="text-4xl font-bold mb-2">
                  9 900 <span className="text-lg text-gray-400">kr</span>
                </div>
                <p className="text-gray-300">
                  För varumärken som vill dominera sin marknad och se professionella ut.
                </p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Allt i Growth</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Helt skräddarsydd, flersidiga webbsida</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Strategisk konsultation innan projektet börjar</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Prioriterad leverans + support efter lansering</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Ser premium ut. Känns premium. Konverterar bättre.</span>
                  </li>
                </ul>

                <p className="text-gray-500 italic text-sm mb-6">
                  Du satsar inte småskaligt — det gör inte heller din webbsida.
                </p>
              </div>

              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white mt-auto py-3 px-6 rounded-lg font-semibold transition-colors">
                <a href="https://cal.com/websives/premium" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  Välj Premium
                </a>
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 italic">
              Trygg betalning: 50% vid start, 50% när allt är klart och godkänt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Vad Våra Kunder Säger
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Över 150 nöjda kunder har förvandlat sina företag med våra webbsidor
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="h-full">
                <TestimonialCard
                  name="Lisa Bergström"
                  role="Ägare, L.B. Yoga & Hälsa"
                  content="Jag visste inte ens vad jag ville ha exakt – men Websives lyckades ändå få till en hemsida som verkligen känns som mig. Den är snygg, enkel och mina kunder hittar allt direkt. Det var aldrig något krångel, och de var snabba att svara varje gång jag behövde något."
                  rating={5}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="h-full">
                <TestimonialCard
                  name="Johan Falk"
                  role="VD, Falk Teknikpartner AB"
                  content="Fantastisk upplevelse rakt igenom. Från första mötet till lansering så kände jag att de hade koll. Det märks att de gjort detta många gånger. Vi har fått fler förfrågningar via hemsidan än tidigare, och den ser dessutom riktigt proffsig ut."
                  rating={5}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="h-full">
                <TestimonialCard
                  name="Mia Ekholm"
                  role="Marknadschef, North Creative"
                  content="Det bästa var nog hur lyhörda de var. Vi hade mycket egna idéer, och de lyckades kombinera det med sin expertis. Resultatet blev riktigt bra. Jag har redan tipsat två andra företag om Websives och kommer säkert göra det igen."
                  rating={5}
                />
              </div>
            </motion.div>
          </div>

          {/* Logo Scroller */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <LogoScroller />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <RainbowButton className="text-lg px-8 py-4">
              <a href="https://cal.com/websives/30min" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Bli Nästa Nöjda Kund
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </RainbowButton>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <div className="flex items-center justify-center space-x-3 text-center">
                <Clock className="w-8 h-8 md:w-10 md:h-10 text-orange-400" />
                <span className="whitespace-nowrap text-3xl md:text-5xl">Begränsade Platser</span>
              </div>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Vi kan endast hantera 5 nya projekt per månad
              för att garantera maximal kvalitet & snabbhet.
            </p>
            
            <div className="limited-spots-box mb-8">
              <div className="text-center space-y-4">
                <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed max-w-2xl mx-auto">
                  Antal platser kvar:
                </p>
                <p className={`text-2xl md:text-3xl font-bold ${slotColor} ${neonGlow}`}>
                  {spotsLeft}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 mt-8 sm:mt-0">
              <RainbowButton className="text-lg px-8 py-4 w-full sm:w-auto">
                <a href="https://cal.com/websives/30min" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Säkra din plats
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </RainbowButton>
              <div className="text-gray-400 text-sm text-center">
                30 min samtal • Ingen kostnad
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+46793010568" className="hover:text-white transition-colors">+46 79-301 05 68</a>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@websives.com" className="hover:text-white transition-colors">info@websives.com</a>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Piteå, Sverige</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
                <li><a href="#" className="hover:text-white transition-colors">Webbdesign</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Automatisering</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marknadsföring</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chatbotar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SEO</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Företag</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/omoss" className="hover:text-white transition-colors">Om Oss</Link></li>
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
            <p>&copy; 2025 Websives. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
