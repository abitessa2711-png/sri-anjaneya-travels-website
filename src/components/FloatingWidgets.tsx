'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from './ThemeWrapper';

export default function FloatingWidgets() {
  const { language } = useLanguage();
  const phoneNumber = '+919790876504';
  const whatsappNumber = '919790876504';
  
  const translations = {
    en: {
      call: 'Call +91 9790876504',
      whatsapp: 'Chat on WhatsApp',
      whatsappMsg: "Hello Sri Anjaneya Tours & Travels,\n\nI would like to inquire about booking a vehicle. Please share the details.\n\nThank you!"
    },
    ta: {
      call: 'அழைக்க: +91 9790876504',
      whatsapp: 'வாட்ஸ்அப்பில் தொடர்புகொள்ள',
      whatsappMsg: "வணக்கம் ஸ்ரீ ஆஞ்சநேயா டூர்ஸ் & டிராவல்ஸ்,\n\nநான் ஒரு வாகனத்தை முன்பதிவு செய்ய விரும்புகிறேன். விவரங்களைப் பகிரவும்.\n\nநன்றி!"
    }
  };

  const t = translations[language];
  const generalMsg = encodeURIComponent(t.whatsappMsg);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3.5 z-40">
      
      {/* Floating Call Widget */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all duration-300"
        title={t.call}
      >
        <span className="absolute right-16 px-3 py-1.5 text-xs font-bold text-white bg-slate-900/90 backdrop-blur-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
          {t.call}
        </span>
        <Phone className="w-6 h-6 animate-pulse" />
      </a>

      {/* Floating WhatsApp Widget */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${generalMsg}`}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-xl hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300"
        title={t.whatsapp}
      >
        <span className="absolute right-16 px-3 py-1.5 text-xs font-bold text-white bg-slate-900/90 backdrop-blur-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
          {t.whatsapp}
        </span>
        <MessageCircle className="w-6 h-6" />
      </a>
      
    </div>
  );
}

