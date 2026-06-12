'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Calendar, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from './ThemeWrapper';
import { isSupabaseConfigured } from '@/lib/supabase';


export function HanumanLogo() {
  return (
    <svg viewBox="0 0 200 200" className="w-10 h-10 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Glow */}
      <circle cx="100" cy="100" r="80" fill="url(#orangeGlow)" opacity="0.15" />
      
      {/* Silhouette Face (inspired by Lord Hanuman style) */}
      <path d="M125 60C120 40 100 30 85 45C75 55 70 70 70 85C70 105 85 120 95 125C98 127 100 135 95 145C90 155 85 160 85 165C85 170 100 170 115 160C130 150 145 130 145 110C145 90 130 80 125 60Z" fill="currentColor" />
      
      {/* Hair Details */}
      <path d="M80 40C65 30 50 35 40 50C30 65 35 85 45 95C40 95 35 90 35 80C35 70 45 60 55 55" fill="currentColor" opacity="0.7" />
      <path d="M125 60C140 50 155 55 165 70C175 85 170 105 160 115" fill="currentColor" opacity="0.7" />
      
      {/* Dynamic Tilak (Orange/Red) */}
      <path d="M98 60C98 52 102 52 102 60C102 75 104 80 104 88C104 92 96 92 96 88C96 80 98 75 98 60Z" fill="#ea580c" />
      <circle cx="100" cy="95" r="3.5" fill="#ef4444" />

      <defs>
        <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const translations = {
    en: {
      home: 'Home',
      cars: 'Cars',
      services: 'Services',
      bookNow: 'Book Now',
      contact: 'Contact Us',
    },
    ta: {
      home: 'முகப்பு',
      cars: 'வாகனங்கள்',
      services: 'சேவைகள்',
      bookNow: 'முன்பதிவு',
      contact: 'தொடர்புக்கு',
    }
  };

  const t = translations[language];

  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.cars, href: '#cars' },
    { name: t.services, href: '#services' },
    { name: t.contact, href: '#contact' },
  ];

  return (
    <>
      {!isSupabaseConfigured && !bannerDismissed && (
        <div className="fixed top-0 left-0 w-full h-9 z-[60] bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[11px] px-4 shadow-sm flex items-center justify-between transition-all duration-300">
          <div className="flex items-center gap-2 mx-auto pl-6">
            <span className="animate-pulse font-bold text-amber-100">⚠️</span>
            <span className="font-semibold text-center leading-tight">
              {language === 'ta'
                ? 'சுபாபேஸ் இணைக்கப்படவில்லை: தளம் உள்ளூர் டெமோ பயன்முறையில் இயங்குகிறது. .env.local கோப்பை சரிபார்க்கவும்.'
                : 'Supabase is not configured: Running in Local Demo Mode. Create a .env.local file to connect a database.'}
            </span>
          </div>
          <button 
            onClick={() => setBannerDismissed(true)} 
            className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <nav className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        !isSupabaseConfigured && !bannerDismissed ? 'top-9' : 'top-0'
      } ${
        scrolled 
          ? 'glass-navbar py-3 shadow-sm' 
          : 'bg-white/80 backdrop-blur-md py-4 border-b border-slate-100'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center flex-shrink-0 group relative">
            <img 
              src="/assets/logo.jpg" 
              alt="Sri Anjaneya Tours & Travels Logo" 
              className="h-14 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" 
            />
            {/* Animated mini car next to the logo */}
            <motion.div
              initial={{ x: -15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ x: 5 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
              className="ml-2 bg-orange-50 border border-orange-100 text-orange-600 p-1 rounded-full shadow-sm hidden sm:flex items-center justify-center"
            >
              <Car className="w-3.5 h-3.5 animate-bounce" style={{ animationDuration: '2.5s' }} />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Bilingual Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  language === 'ta'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* CTA Button */}
            <button
              onClick={triggerBooking}
              className="flex items-center bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-orange-600/10 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t.bookNow}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Language switch on mobile header directly for easy reach */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-full border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                  language === 'ta'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                தமிழ்
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md absolute top-full left-0 w-full shadow-lg border-t border-slate-100 py-4 px-6 space-y-4">
          <div className="flex flex-col space-y-3.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-orange-600 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={triggerBooking}
              className="w-full text-center font-bold text-white bg-orange-600 py-3 rounded-full shadow-md shadow-orange-600/10 transition-all active:scale-95"
            >
              {t.bookNow}
            </button>
          </div>
        </div>
      )}
    </nav>
  </>
  );
}

