'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, CheckCircle2, Search, MapPin, Phone, Mail, Calendar, Clock, X, MessageSquare, Car
} from 'lucide-react';
import { useLanguage } from '@/components/ThemeWrapper';

// Inline Instagram SVG component
function InstagramIcon({ className }: { className?: string }) {
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

// Static car configurations with 12-hour prices
const carsList = [
  {
    id: 'toyota-innova',
    name: 'Toyota Innova Crysta',
    image_url: '/assets/cars/innova_crysta.png',
    seating_capacity: 7,
    ac_non_ac: true,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 2500, // 12-hour price: ₹2500
  },
  {
    id: 'maruti-baleno',
    name: 'Maruti Baleno',
    image_url: '/assets/cars/baleno.png',
    seating_capacity: 5,
    ac_non_ac: true,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 2000, // 12-hour price: ₹2000
  },
  {
    id: 'swift-dzire',
    name: 'Maruti Swift Dzire',
    image_url: '/assets/cars/swift_dzire.png',
    seating_capacity: 5,
    ac_non_ac: true,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 2000, // 12-hour price: ₹2000
  },
  {
    id: 'hyundai-aura',
    name: 'Hyundai Aura',
    image_url: '/assets/cars/hyundai_aura.png',
    seating_capacity: 5,
    ac_non_ac: true,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 2000, // 12-hour price: ₹2000
  }
];

// Translation Dictionary
const translations = {
  en: {
    heroTitle: "Travel With Comfort,\nReach With Trust",
    heroSubtitle: "Rent premium self-driving cars or book professional taxi rides in Trichy. Quick verification, clean vehicles, and trustworthy service.",
    bookNow: "Book Now",
    inquireWhatsApp: "Inquire on WhatsApp",
    availableVehicles: "Available Vehicles",
    chooseRental: "Choose Your Rental Car",
    searchPlaceholder: "Search by name (e.g. Innova)...",
    allCars: "All Cars",
    selfDrive: "Self Drive",
    taxiService: "Taxi Service",
    perDay: "12 Hours",
    seatingCapacity: "Capacity",
    acStatus: "AC Status",
    acCar: "AC Car",
    nonAcCar: "Non AC",
    gearFuel: "Fuel & Gear",
    bookThisCar: "Book Now",
    whatWeOffer: "What We Offer",
    ourServices: "Our Services",
    getInTouch: "Get in Touch",
    contactUs: "Contact Us",
    officeAddress: "Our Office Address",
    phoneNumbers: "Phone Numbers",
    emailAddress: "Email Address",
    instagram: "Instagram",
    noCarsFound: "No cars match your search.",
    tryAnother: "Try another search term.",
    
    // Services Offered
    serviceList: [
      { title: 'Self Drive Rental', desc: 'Rent hatchback and sedan cars to drive yourself with absolute privacy.' },
      { title: 'Taxi Booking Service', desc: 'Reliable chauffeur-driven private taxis for outstations and temple visits.' },
      { title: 'Airport Pickup & Drop', desc: 'Punctual transfer services to and from Trichy International Airport.' },
      { title: 'Local & Outstation Trips', desc: 'Exciting tourism tour packages covering Ooty, Kodaikanal, and temple runs.' },
      { title: 'Corporate Travel Services', desc: 'Business-class luxury vehicles and contract pickups for executives.' },
      { title: 'Wedding Luxury Cars', desc: 'Decorated high-end luxury models for weddings and special events.' }
    ],

    // Booking Modal
    modalTitle: "Book Your Ride",
    modalSubtitle: "Please fill out this simple booking request. We will finalize your slot instantly on WhatsApp.",
    labelName: "Your Full Name",
    phName: "Enter your full name",
    labelMobile: "Mobile Number",
    phMobile: "Enter 10-digit mobile number",
    labelVehicle: "Select Vehicle",
    phVehicle: "Choose a vehicle",
    labelPickup: "Pickup Location",
    phPickup: "Where should we pick you up?",
    labelDrop: "Drop Location",
    phDrop: "Where is your destination?",
    labelDate: "Pickup Date",
    labelTime: "Pickup Time",
    labelPassengers: "Passenger Count",
    btnSubmit: "Book via WhatsApp",
    btnCancel: "Cancel",
    validationError: "Please fill in all details correctly."
  },
  ta: {
    heroTitle: "இனிமையான பயணம்,\nநம்பிக்கையான சேவை",
    heroSubtitle: "திருச்சியில் சுய ஓட்டுநர் பிரீமியம் கார்கள் அல்லது டாக்ஸி சேவைகளை வாடகைக்கு எடுக்கவும். விரைவான சரிபார்ப்பு மற்றும் தூய்மையான வாகனங்கள்.",
    bookNow: "முன்பதிவு செய்க",
    inquireWhatsApp: "வாட்ஸ்அப்பில் விசாரிக்க",
    availableVehicles: "எங்களிடம் உள்ள வாகனங்கள்",
    chooseRental: "உங்கள் வாடகை காரைத் தேர்ந்தெடுக்கவும்",
    searchPlaceholder: "காரின் பெயரைத் தேடுக (உதாரணம்: Innova)...",
    allCars: "அனைத்து கார்கள்",
    selfDrive: "சுய ஓட்டுநர்",
    taxiService: "டாக்ஸி சேவை",
    perDay: "12 மணி நேரத்திற்கு",
    seatingCapacity: "இருக்கைகள்",
    acStatus: "ஏசி வசதி",
    acCar: "ஏசி வசதி உள்ளது",
    nonAcCar: "ஏசி வசதி இல்லை",
    gearFuel: "எரிபொருள் & கியர்",
    bookThisCar: "முன்பதிவு செய்",
    whatWeOffer: "நாங்கள் வழங்குபவை",
    ourServices: "எங்கள் சேவைகள்",
    getInTouch: "தொடர்பு கொள்ள",
    contactUs: "எங்களை அணுகவும்",
    officeAddress: "அலுவலக முகவரி",
    phoneNumbers: "கைபேசி எண்கள்",
    emailAddress: "மின்னஞ்சல் முகவரி",
    instagram: "இன்ஸ்டாகிராம்",
    noCarsFound: "உங்கள் தேடலுக்கு கார்கள் எதுவும் கிடைக்கவில்லை.",
    tryAnother: "வேறு பெயரைத் தேடி முயலவும்.",
    
    // Services Offered
    serviceList: [
      { title: 'சுய ஓட்டுநர் வாடகை', desc: 'முழுமையான தனியுரிமையுடன் நீங்களே ஓட்டிச் செல்ல ஹேட்ச்பேக் மற்றும் செடான் கார்களை வாடகைக்கு எடுக்கலாம்.' },
      { title: 'டாக்ஸி முன்பதிவு சேவை', desc: 'வெளியூர்கள் மற்றும் கோயில் தரிசனங்களுக்கு நம்பகமான ஓட்டுநருடன் கூடிய தனியார் டாக்ஸிகள்.' },
      { title: 'விமான நிலைய சேவை', desc: 'திருச்சி சர்வதேச விமான நிலையத்திற்கு நேரத்திற்கு அழைத்துச் செல்லும் மற்றும் அழைத்து வரும் சேவைகள்.' },
      { title: 'உள்ளூர் & வெளியூர் பயணங்கள்', desc: 'ஊட்டி, கொடைக்கானல் மற்றும் கோயில் சுற்றுப்பயணங்களை உள்ளடக்கிய அற்புதமான சுற்றுலாத் தொகுப்புகள்.' },
      { title: 'கார்ப்பரேட் பயணச் சேவைகள்', desc: 'நிறுவன நிர்வாகிகளுக்கான சொகுசு வாகனங்கள் மற்றும் மாதாந்திர ஒப்பந்த சேவைகள்.' },
      { title: 'திருமண ஆடம்பர கார்கள்', desc: 'திருமணங்கள் மற்றும் சிறப்பு நிகழ்வுகளுக்கான அலங்கரிக்கப்பட்ட உயர் ரக ஆடம்பர கார்கள்.' }
    ],

    // Booking Modal
    modalTitle: "பயண முன்பதிவு",
    modalSubtitle: "கீழே உள்ள எளிய விவரங்களை நிரப்பவும். உங்கள் முன்பதிவை வாட்ஸ்அப் மூலம் உடனடியாக உறுதி செய்வோம்.",
    labelName: "உங்கள் முழு பெயர்",
    phName: "உங்கள் முழு பெயரை உள்ளிடவும்",
    labelMobile: "கைபேசி எண்",
    phMobile: "10 இலக்க கைபேசி எண்ணை உள்ளிடவும்",
    labelVehicle: "வாகனத்தைத் தேர்ந்தெடுக்கவும்",
    phVehicle: "வாகனத்தைத் தேர்ந்தெடுக்கவும்",
    labelPickup: "ஏறும் இடம் (Pickup)",
    phPickup: "உங்களை எங்கு வந்து ஏற்ற வேண்டும்?",
    labelDrop: "இறங்கும் இடம் (Drop)",
    phDrop: "நீங்கள் எங்கு செல்ல வேண்டும்?",
    labelDate: "பயணத் தேதி",
    labelTime: "பயண நேரம்",
    labelPassengers: "பயணிகள் எண்ணிக்கை",
    btnSubmit: "வாட்ஸ்அப் மூலம் முன்பதிவு செய்",
    btnCancel: "ரத்து செய்",
    validationError: "தயவுசெய்து அனைத்து விவரங்களையும் சரியாக நிரப்பவும்."
  }
};

export default function HomePage() {
  const { language } = useLanguage();
  const t = translations[language];

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // all, self, taxi

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    vehicleId: '',
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    pickupTime: '',
    passengerCount: '1',
  });

  // Listen to global open modal events from Navbar
  useEffect(() => {
    const handleOpenBooking = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.vehicleId) {
        setFormData(prev => ({ ...prev, vehicleId: customEvent.detail.vehicleId }));
      }
      setBookingModalOpen(true);
    };

    window.addEventListener('open-booking-modal', handleOpenBooking);
    return () => window.removeEventListener('open-booking-modal', handleOpenBooking);
  }, []);

  // Filter cars based on search and filters
  const filteredCars = carsList.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.fuel_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || 
                        (selectedType === 'self' && car.self_drive) ||
                        (selectedType === 'taxi' && car.taxi_service);

    return matchesSearch && matchesType;
  });

  // Open booking modal for a specific car
  const handleBookCar = (carId: string) => {
    setFormData(prev => ({ ...prev, vehicleId: carId }));
    setBookingModalOpen(true);
  };

  // Form submission directly triggers WhatsApp redirect
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check basic validation
    if (
      !formData.fullName || 
      !formData.mobileNumber || 
      !formData.vehicleId || 
      !formData.pickupLocation || 
      !formData.dropLocation || 
      !formData.pickupDate || 
      !formData.pickupTime
    ) {
      alert(t.validationError);
      return;
    }

    const selectedCar = carsList.find(c => c.id === formData.vehicleId);
    const carName = selectedCar ? selectedCar.name : formData.vehicleId;
    const carPrice = selectedCar ? `₹${selectedCar.price_per_day} / 12 Hours` : '';

    // Create formatted WhatsApp ticket
    const whatsappText = language === 'ta' 
      ? `வணக்கம் ஸ்ரீ ஆஞ்சநேயா டூர்ஸ் & டிராவல்ஸ்,\n\nநான் பின்வரும் விவரங்களுடன் பயணம் முன்பதிவு செய்ய விரும்புகிறேன்:\n\n*பெயர்:* ${formData.fullName}\n*கைபேசி எண்:* ${formData.mobileNumber}\n*வாகனம்:* ${carName} (${carPrice})\n*ஏறும் இடம்:* ${formData.pickupLocation}\n*இறங்கும் இடம்:* ${formData.dropLocation}\n*தேதி:* ${formData.pickupDate}\n*பயண நேரம்:* ${formData.pickupTime}\n*பயணிகள்:* ${formData.passengerCount}\n\nமுன்பதிவை உறுதிசெய்யவும். நன்றி!`
      : `Hello Sri Anjaneya Tours & Travels,\n\nI would like to book a ride with the following details:\n\n*Name:* ${formData.fullName}\n*Mobile Number:* ${formData.mobileNumber}\n*Vehicle:* ${carName} (${carPrice})\n*Pickup Location:* ${formData.pickupLocation}\n*Drop Location:* ${formData.dropLocation}\n*Pickup Date:* ${formData.pickupDate}\n*Pickup Time:* ${formData.pickupTime}\n*Passenger Count:* ${formData.passengerCount}\n\nPlease confirm my booking. Thank you!`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/919790876504?text=${encodedText}`;

    // Reset and close modal
    setBookingModalOpen(false);
    setFormData({
      fullName: '',
      mobileNumber: '',
      vehicleId: '',
      pickupLocation: '',
      dropLocation: '',
      pickupDate: '',
      pickupTime: '',
      passengerCount: '1',
    });

    // Open WhatsApp checkout link
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-[#fffdf4] via-[#fffbeb] to-[#ffedd5] space-y-12 pb-10 relative overflow-hidden" id="home">
      
      {/* Winding Road 1 - Hero Section Watermark */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none opacity-[0.15] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Road border shadow */}
          <path 
            d="M-50 450 C 350 450, 500 150, 900 150 C 1200 150, 1300 450, 1500 450" 
            stroke="#cbd5e1" 
            strokeWidth="52" 
            strokeLinecap="round" 
          />
          {/* Road main body (dark slate/charcoal) */}
          <path 
            d="M-50 450 C 350 450, 500 150, 900 150 C 1200 150, 1300 450, 1500 450" 
            stroke="#334155" 
            strokeWidth="40" 
            strokeLinecap="round" 
          />
          {/* Dashed center line (white) */}
          <path 
            d="M-50 450 C 350 450, 500 150, 900 150 C 1200 150, 1300 450, 1500 450" 
            stroke="#ffffff" 
            strokeWidth="2.5" 
            strokeDasharray="12,14" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      {/* Winding Road 2 - Middle (Cars Section) Watermark */}
      <div className="absolute top-[32%] left-0 w-full h-[650px] z-0 pointer-events-none opacity-[0.08] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Road border shadow */}
          <path 
            d="M1500 100 C 1100 100, 1000 500, 600 500 C 200 500, 300 100, -50 100" 
            stroke="#cbd5e1" 
            strokeWidth="52" 
            strokeLinecap="round" 
          />
          {/* Road main body */}
          <path 
            d="M1500 100 C 1100 100, 1000 500, 600 500 C 200 500, 300 100, -50 100" 
            stroke="#334155" 
            strokeWidth="40" 
            strokeLinecap="round" 
          />
          {/* Dashed center line */}
          <path 
            d="M1500 100 C 1100 100, 1000 500, 600 500 C 200 500, 300 100, -50 100" 
            stroke="#ffffff" 
            strokeWidth="2.5" 
            strokeDasharray="12,14" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      {/* Winding Road 3 - Lower (Services/Contact Section) Watermark */}
      <div className="absolute top-[64%] left-0 w-full h-[650px] z-0 pointer-events-none opacity-[0.08] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Road border shadow */}
          <path 
            d="M-50 200 C 350 200, 450 500, 850 500 C 1250 500, 1150 200, 1500 200" 
            stroke="#cbd5e1" 
            strokeWidth="52" 
            strokeLinecap="round" 
          />
          {/* Road main body */}
          <path 
            d="M-50 200 C 350 200, 450 500, 850 500 C 1250 500, 1150 200, 1500 200" 
            stroke="#334155" 
            strokeWidth="40" 
            strokeLinecap="round" 
          />
          {/* Dashed center line */}
          <path 
            d="M-50 200 C 350 200, 450 500, 850 500 C 1250 500, 1150 200, 1500 200" 
            stroke="#ffffff" 
            strokeWidth="2.5" 
            strokeDasharray="12,14" 
            strokeLinecap="round" 
          />
        </svg>
      </div>
      
      {/* 1. HERO BANNER */}
      <section className="relative z-10 min-h-[65vh] flex items-center justify-center bg-transparent overflow-hidden py-10 border-b border-orange-100/20">
        {/* Soft Glowing Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/40 rounded-full blur-[120px] pointer-events-none opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-center lg:text-left">
          {/* Left Column: Title, Tagline & CTAs */}
          <div className="lg:col-span-7 space-y-5 flex flex-col items-center lg:items-start">
            {/* Small Brand Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-100/80 border border-orange-200 rounded-full text-orange-800 text-xs font-bold shadow-sm"
            >
              <Car className="w-3.5 h-3.5 text-orange-600" />
              <span>{language === 'ta' ? 'ஸ்ரீ ஆஞ்சநேயா டூர்ஸ் & டிராவல்ஸ்' : 'Sri Anjaneya Tours & Travels'}</span>
            </motion.div>

            {/* Title - adjusted font sizes for Tamil to prevent viewport overflow */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`${
                language === 'ta' 
                  ? 'text-3xl sm:text-4xl lg:text-5xl' 
                  : 'text-4xl sm:text-5xl lg:text-6xl'
              } font-display font-black text-slate-900 leading-tight whitespace-pre-line`}
            >
              {t.heroTitle.split('\n')[0]} <br />
              <span className="text-orange-600">{t.heroTitle.split('\n')[1]}</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-slate-700 max-w-2xl leading-relaxed font-medium"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-1 w-full max-w-md"
            >
              <button 
                onClick={() => setBookingModalOpen(true)}
                className="w-full sm:w-auto text-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold shadow-md shadow-orange-600/10 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm cursor-pointer"
              >
                {t.bookNow}
              </button>
              
              <a 
                href="https://wa.me/919790876504?text=Hello%20Sri%20Anjaneya%20Tours%20%26%20Travels%2C%20I%20would%20like%20to%20inquire%20about%20a%20vehicle%20booking."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-sm shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                {t.inquireWhatsApp}
              </a>
            </motion.div>
          </div>

          {/* Right Column: Premium Landscape GIF Animation Card with Floating Logo Badge */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-md aspect-[16/9] rounded-2xl overflow-hidden border border-amber-200/60 shadow-[0_12px_45px_rgba(234,88,12,0.12)] bg-white p-1.5 group hover:shadow-2xl transition-all duration-300"
            >
              {/* The GIF Background */}
              <img 
                src="/assets/travel_animation.gif" 
                alt="Travel Animation" 
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Logo Floating Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-100 p-2 rounded-xl shadow-md z-10 h-14 w-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/assets/logo.jpg" 
                  alt="Sri Anjaneya Tours & Travels Logo" 
                  className="h-9 w-auto object-contain mix-blend-multiply" 
                />
              </div>

              {/* Dashed Road Outline Overlay */}
              <div className="absolute inset-2.5 border border-dashed border-white/40 rounded-xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. AVAILABLE CARS */}
      <section id="cars" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-transparent">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-xs font-bold tracking-widest text-orange-600 uppercase">{t.availableVehicles}</h2>
          <p className="font-display font-extrabold text-3xl text-slate-900">{t.chooseRental}</p>
          <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full" />
        </div>

        {/* Filter Toolbar */}
        <div className="glass-card p-3 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="premium-input pl-10 text-xs"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex rounded-lg p-1 bg-slate-100 border border-slate-200">
            {[
              { id: 'all', label: t.allCars },
              { id: 'self', label: t.selfDrive },
              { id: 'taxi', label: t.taxiService }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all ${
                  selectedType === tab.id 
                    ? 'bg-orange-600 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-orange-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Fleet Grid */}
        {filteredCars.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredCars.map((car) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  key={car.id} 
                  className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-100 shadow-md bg-white"
                >
                  {/* Image Section */}
                  <div className="p-4 bg-slate-50/50 relative">
                    <div className="h-[240px] w-full relative overflow-hidden rounded-xl flex items-center justify-center bg-slate-100/50">
                      <img 
                        src={car.image_url} 
                        alt={car.name} 
                        className="max-h-[220px] max-w-[95%] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6 space-y-4">
                    <div>
                      {/* Category Label */}
                      <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest block mb-1">
                        {car.self_drive && car.taxi_service ? `${t.selfDrive} / ${t.taxiService}` : car.self_drive ? t.selfDrive : t.taxiService}
                      </span>
                      
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-extrabold text-xl text-slate-800">{car.name}</h3>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.perDay}</p>
                          <p className="text-lg font-black text-orange-600">₹{car.price_per_day}</p>
                        </div>
                      </div>
                    </div>

                    {/* Attributes Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">{t.seatingCapacity}</span>
                        <span className="font-bold flex items-center justify-center gap-1 mt-0.5 text-slate-700">
                          <Users className="w-3.5 h-3.5 text-orange-600" />
                          {car.seating_capacity} Seater
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">{t.acStatus}</span>
                        <span className="font-bold text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.acCar}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">{t.gearFuel}</span>
                        <span className="font-bold block text-slate-700 mt-0.5">
                          {car.fuel_type} · {car.transmission.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <button 
                      onClick={() => handleBookCar(car.id)}
                      className="w-full text-center block bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold transition-all text-sm shadow-sm"
                    >
                      {t.bookThisCar}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl max-w-md mx-auto p-6 border border-slate-100">
            <p className="font-semibold text-slate-600 text-sm">{t.noCarsFound}</p>
            <p className="text-slate-400 text-xs mt-1">{t.tryAnother}</p>
          </div>
        )}
      </section>

      {/* 3. SERVICES OFFERED */}
      <section id="services" className="relative z-10 py-10 border-y border-orange-100/20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-xs font-bold tracking-widest text-orange-600 uppercase">{t.whatWeOffer}</h2>
            <p className="font-display font-extrabold text-3xl text-slate-900">{t.ourServices}</p>
            <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.serviceList.map((service, index) => (
              <div key={index} className="glass-card p-6 rounded-xl border border-slate-100 bg-white">
                <h3 className="font-display font-bold text-slate-800 text-base mb-2">{service.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTACT US */}
      <section id="contact" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-transparent">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-xs font-bold tracking-widest text-orange-600 uppercase">{t.getInTouch}</h2>
          <p className="font-display font-extrabold text-3xl text-slate-900">{t.contactUs}</p>
          <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-4 rounded-xl space-y-4 border border-slate-100 bg-white">
              
              <div className="flex items-start">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mr-4 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-slate-800 mb-1">{t.officeAddress}</h4>
                  <p className="text-slate-500 leading-relaxed">
                    61-K, Kallar Street,<br />
                    Illupur Rd, Kallukuzhi,<br />
                    Trichy - 620020
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-4 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-slate-800 mb-1">{t.phoneNumbers}</h4>
                  <div className="flex flex-col text-slate-500 space-y-1 mt-0.5">
                    <a href="tel:+919790876504" className="hover:text-orange-600 transition-colors font-semibold">+91 9790876504</a>
                    <a href="tel:+919092876504" className="hover:text-orange-600 transition-colors font-semibold">+91 9092876504</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mr-4 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-slate-800 mb-1">{t.emailAddress}</h4>
                  <a href="mailto:srianjaneyatravels2026@gmail.com" className="text-slate-500 hover:text-orange-600 transition-colors break-all">
                    srianjaneyatravels2026@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mr-4 shadow-sm">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-slate-800 mb-1">{t.instagram}</h4>
                  <a 
                    href="https://instagram.com/srianjaneya_travels" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-500 hover:text-orange-600 transition-colors"
                  >
                    @srianjaneya_travels
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-7 h-[320px] rounded-xl overflow-hidden shadow-md border border-slate-100 bg-slate-50">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1234857468165!2d78.68333333333334!3d10.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ4JzAwLjAiTiA3OMKwNDEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy"
              title="Sri Anjaneya Tours & Travels Location Map"
            />
          </div>
        </div>
      </section>

      {/* 5. BOOKING MODAL POPUP */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-800">{t.modalTitle}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.modalSubtitle}</p>
                </div>
                <button 
                  onClick={() => setBookingModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4 overflow-y-auto">
                
                {/* 1. Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.labelName}</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={t.phName}
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="premium-input text-xs"
                  />
                </div>

                {/* 2. Mobile */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.labelMobile}</label>
                  <input 
                    type="tel" 
                    required 
                    pattern="[0-9]{10}"
                    placeholder={t.phMobile}
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                    className="premium-input text-xs"
                  />
                </div>

                {/* 3. Vehicle Select */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.labelVehicle}</label>
                  <select 
                    required
                    value={formData.vehicleId}
                    onChange={(e) => setFormData(prev => ({ ...prev, vehicleId: e.target.value }))}
                    className="premium-input text-xs bg-white py-2.5"
                  >
                    <option value="" disabled>{t.phVehicle}</option>
                    {carsList.map(car => (
                      <option key={car.id} value={car.id}>
                        {car.name} (₹{car.price_per_day} / 12h)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grid for locations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 4. Pickup Location */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.labelPickup}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={t.phPickup}
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                      className="premium-input text-xs"
                    />
                  </div>

                  {/* 5. Drop Location */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.labelDrop}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={t.phDrop}
                      value={formData.dropLocation}
                      onChange={(e) => setFormData(prev => ({ ...prev, dropLocation: e.target.value }))}
                      className="premium-input text-xs"
                    />
                  </div>
                </div>

                {/* Grid for datetime and passengers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 6. Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.labelDate}</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.pickupDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, pickupDate: e.target.value }))}
                      onClick={(e) => {
                        try {
                          e.currentTarget.showPicker();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="premium-input text-xs py-2.5 cursor-pointer"
                    />
                  </div>

                  {/* 7. Time */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.labelTime}</label>
                    <input 
                      type="time" 
                      required 
                      value={formData.pickupTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, pickupTime: e.target.value }))}
                      onClick={(e) => {
                        try {
                          e.currentTarget.showPicker();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="premium-input text-xs py-2.5 cursor-pointer"
                    />
                  </div>

                  {/* 8. Passengers */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.labelPassengers}</label>
                    <select 
                      value={formData.passengerCount}
                      onChange={(e) => setFormData(prev => ({ ...prev, passengerCount: e.target.value }))}
                      className="premium-input text-xs bg-white py-2.5"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n.toString()}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 shrink-0">
                  <button 
                    type="button" 
                    onClick={() => setBookingModalOpen(false)}
                    className="flex-1 py-3 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
                  >
                    {t.btnCancel}
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors shadow-sm"
                  >
                    {t.btnSubmit}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

