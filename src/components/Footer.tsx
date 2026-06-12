'use client';

import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';
import { HanumanLogo } from './Navbar';
import { useLanguage } from './ThemeWrapper';

function Instagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const { language } = useLanguage();

  const translations = {
    en: {
      brandMain: 'SRI ANJANEYA',
      brandSub: 'Tours & Travels',
      tagline: '"Travel With Comfort, Reach With Trust"',
      quickLinks: 'Quick Links',
      home: 'Home',
      fleet: 'Our Fleet',
      services: 'Services Offered',
      contactUs: 'Contact Us',
      ourServices: 'Our Services',
      contactInfo: 'Contact Info',
      addressTitle: 'Our Office Address',
      phoneTitle: 'Phone Numbers',
      emailTitle: 'Email Address',
      trustworthyTitle: '100% Trustworthy',
      trustworthyDesc: 'Verified documentation & safe cars',
      availabilityTitle: '24/7 Availability',
      availabilityDesc: 'Round the clock pickup & road support',
      pricingTitle: 'Affordable Pricing',
      pricingDesc: 'Best rates in Trichy & outstations',
      copyright: 'All Rights Reserved.',
      powered: 'Designed by Abinaya Yowan. Powered by Next.js.',
      serviceList: [
        'Self Driving Car Rental',
        'Taxi Booking Service',
        'Airport Pickup & Drop',
        'Local & Outstation Trips',
        'Corporate Travel Services',
        'Wedding Luxury Car Rental'
      ]
    },
    ta: {
      brandMain: 'ஸ்ரீ ஆஞ்சநேயா',
      brandSub: 'டூர்ஸ் & டிராவல்ஸ்',
      tagline: '"இனிமையான பயணம், நம்பிக்கையான சேவை"',
      quickLinks: 'விரைவு இணைப்புகள்',
      home: 'முகப்பு',
      fleet: 'எங்கள் வாகனங்கள்',
      services: 'நாங்கள் வழங்கும் சேவைகள்',
      contactUs: 'தொடர்பு கொள்ள',
      ourServices: 'எங்கள் சேவைகள்',
      contactInfo: 'தொடர்பு விவரங்கள்',
      addressTitle: 'அலுவலக முகவரி',
      phoneTitle: 'கைபேசி எண்கள்',
      emailTitle: 'மின்னஞ்சல் முகவரி',
      trustworthyTitle: '100% நம்பகமானது',
      trustworthyDesc: 'சரிபார்க்கப்பட்ட ஆவணங்கள் & பாதுகாப்பான கார்கள்',
      availabilityTitle: '24/7 சேவை',
      availabilityDesc: '24 மணி நேரமும் கார் மற்றும் சாலை ஆதரவு',
      pricingTitle: 'மலிவான கட்டணம்',
      pricingDesc: 'திருச்சி மற்றும் வெளியூர்களுக்கு மிகச் சிறந்த விலை',
      copyright: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      powered: 'வடிவமைப்பு: அபினயா யோவன் (Designed by Abinaya Yowan). Next.js மூலம் இயக்கப்படுகிறது.',
      serviceList: [
        'சுய ஓட்டுநர் கார் வாடகை',
        'டாக்ஸி முன்பதிவு சேவை',
        'விமான நிலைய சேவை',
        'உள்ளூர் & வெளியூர் பயணங்கள்',
        'கார்ப்பரேட் பயணச் சேவைகள்',
        'திருமண ஆடம்பர கார் வாடகை'
      ]
    }
  };

  const t = translations[language];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="inline-block bg-white p-2 rounded-xl shadow-md transition-transform hover:scale-105 duration-300">
              <img 
                src="/assets/logo.jpg" 
                alt="Sri Anjaneya Tours & Travels Logo" 
                className="h-12 w-auto object-contain" 
              />
            </div>
            
            <p className="text-sm text-slate-400 italic">
              {t.tagline}
            </p>
            
            <div className="pt-2 flex items-center space-x-2.5">
              <a 
                href="https://instagram.com/srianjaneya_travels" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 shrink-0"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/srianjaneya_travels" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-orange-500 transition-colors font-medium"
              >
                @srianjaneya_travels
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-4 tracking-wide uppercase">
              {t.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-white hover:underline transition-all">{t.home}</a>
              </li>
              <li>
                <a href="#cars" className="hover:text-white hover:underline transition-all">{t.fleet}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white hover:underline transition-all">{t.services}</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white hover:underline transition-all">{t.contactUs}</a>
              </li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-4 tracking-wide uppercase">
              {t.ourServices}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {t.serviceList.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact Details Col */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-base mb-4 tracking-wide uppercase">
              {t.contactInfo}
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  61-K, Kallar Street,<br />
                  Illupur Rd, Kallukuzhi,<br />
                  Trichy - 620020
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-orange-500 shrink-0" />
                <div className="flex flex-col text-slate-400">
                  <a href="tel:+919790876504" className="hover:text-white transition-colors">+91 9790876504</a>
                  <a href="tel:+919092876504" className="hover:text-white transition-colors">+91 9092876504</a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-orange-500 shrink-0" />
                <a href="mailto:srianjaneyatravels2026@gmail.com" className="text-slate-400 hover:text-white transition-colors break-all">
                  srianjaneyatravels2026@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="h-px bg-slate-900 my-8" />

        {/* trust highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left mb-8 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
            <ShieldCheck className="w-6 h-6 text-orange-500" />
            <div>
              <p className="font-semibold text-slate-400">{t.trustworthyTitle}</p>
              <p>{t.trustworthyDesc}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
            <Clock className="w-6 h-6 text-orange-500" />
            <div>
              <p className="font-semibold text-slate-400">{t.availabilityTitle}</p>
              <p>{t.availabilityDesc}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
            <Award className="w-6 h-6 text-orange-500" />
            <div>
              <p className="font-semibold text-slate-400">{t.pricingTitle}</p>
              <p>{t.pricingDesc}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-slate-600 border-t border-slate-900 pt-6">
          <p>© {new Date().getFullYear()} {t.brandMain} {t.brandSub}. {t.copyright}</p>
          <p className="mt-1">{t.powered}</p>
        </div>

      </div>
    </footer>
  );
}

