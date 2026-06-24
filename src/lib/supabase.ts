import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if we have valid Supabase credentials
const initialCheck = !!(
  supabaseUrl && 
  supabaseUrl !== 'your-supabase-url' && 
  supabaseUrl !== 'NEXT_PUBLIC_SUPABASE_URL=<Read from existing Supabase project>' && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your-supabase-anon-key' &&
  supabaseAnonKey !== 'NEXT_PUBLIC_SUPABASE_ANON_KEY=<Read from existing Supabase project>'
);

// Define structures for mock database
interface Car {
  id: string;
  name: string;
  image_url: string;
  seating_capacity: number;
  ac_non_ac: boolean;
  fuel_type: string;
  transmission: string;
  self_drive: boolean;
  taxi_service: boolean;
  price_per_day: number;
  is_available: boolean;
}

interface Booking {
  id: string;
  booking_id: string;
  user_id: string | null;
  full_name: string;
  mobile_number: string;
  email: string;
  pickup_location: string;
  drop_location: string;
  trip_type: string;
  vehicle_id: string;
  pickup_date: string;
  pickup_time: string;
  return_date: string;
  passenger_count: number;
  special_instructions: string;
  id_proof_url: string;
  payment_option: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

interface Review {
  id: string;
  user_id: string | null;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
}

interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  category: string;
  created_at: string;
}

// Initial Mock Seed Data
const initialCars: Car[] = [
  {
    id: 'c1-suzuki-ritz',
    name: 'Suzuki Ritz',
    image_url: '/assets/cars/suzuki_ritz.png',
    seating_capacity: 5,
    ac_non_ac: true,
    fuel_type: 'Petrol/Diesel',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 1800,
    is_available: true
  },
  {
    id: 'c2-toyota-innova',
    name: 'Toyota Innova Crysta',
    image_url: '/assets/cars/innova_crysta.png',
    seating_capacity: 7,
    ac_non_ac: true,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 2500,
    is_available: true
  },
  {
    id: 'c3-honda-amaze',
    name: 'Honda Amaze',
    image_url: '/assets/cars/honda_amaze.png',
    seating_capacity: 5,
    ac_non_ac: true,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 2000,
    is_available: true
  },
  {
    id: 'c4-hyundai-aura',
    name: 'Hyundai Aura',
    image_url: '/assets/cars/hyundai_aura.png',
    seating_capacity: 5,
    ac_non_ac: true,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 2000,
    is_available: true
  },
  {
    id: 'c5-etios-liva',
    name: 'Toyota Etios Liva',
    image_url: '/assets/cars/etios_liva.png',
    seating_capacity: 5,
    ac_non_ac: true,
    fuel_type: 'Diesel/Petrol',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 1800,
    is_available: true
  },
  {
    id: 'c6-tata-punch',
    name: 'Tata Punch',
    image_url: '/assets/cars/tata_punch.png',
    seating_capacity: 5,
    ac_non_ac: true,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 2000,
    is_available: true
  },
  {
    id: 'c7-suzuki-ertiga',
    name: 'Suzuki Ertiga',
    image_url: '/assets/cars/suzuki_ertiga.png',
    seating_capacity: 7,
    ac_non_ac: true,
    fuel_type: 'Petrol/CNG',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 2500,
    is_available: true
  },
  {
    id: 'c8-tata-indica',
    name: 'Tata Indica',
    image_url: '/assets/cars/tata_indica.png',
    seating_capacity: 5,
    ac_non_ac: true,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    self_drive: true,
    taxi_service: true,
    price_per_day: 1600,
    is_available: true
  }
];

const initialReviews: Review[] = [
  {
    id: 'r1',
    user_id: 'u1',
    name: 'Ramesh Kumar',
    rating: 5,
    comment: 'Highly recommend Sri Anjaneya travels! The Toyota Innova was in pristine condition, clean and drove smoothly. Very professional customer service.',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'r2',
    user_id: null,
    name: 'Suresh Raina',
    rating: 4,
    comment: 'Booked Suzuki Ertiga for outstation trip. The driver was polite and punctual. Clean vehicle and reasonable prices. Will use again.',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'r3',
    user_id: 'u2',
    name: 'Meera Krishnan',
    rating: 5,
    comment: 'Great experience with self-driving Suzuki Ritz rental. Simple booking process and quick document verification. Extremely trustworthy.',
    approved: true,
    created_at: new Date().toISOString()
  }
];

const initialGallery: GalleryItem[] = [
  {
    id: 'g1',
    image_url: '/assets/flyer_1.jpg',
    title: 'Business Class Fleet Banner',
    category: 'Events',
    created_at: new Date().toISOString()
  },
  {
    id: 'g2',
    image_url: '/assets/flyer_2.jpg',
    title: 'Self Driving Car Services',
    category: 'Events',
    created_at: new Date().toISOString()
  },
  {
    id: 'g3',
    image_url: '/assets/cars/innova_crysta.png',
    title: 'Toyota Innova Crysta ready for highway rental',
    category: 'Vehicles',
    created_at: new Date().toISOString()
  },
  {
    id: 'g4',
    image_url: '/assets/cars/suzuki_ritz.png',
    title: 'Premium Hatchback Fleet',
    category: 'Vehicles',
    created_at: new Date().toISOString()
  }
];

// LocalStorage helpers for mock DB
const getLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

// Mock Auth logic
const getMockUser = () => {
  if (typeof window === 'undefined') return null;
  const user = getLocalStorage('sat_mock_user', null);
  return user;
};

// Mock Query implementation
class MockQueryBuilder {
  private table: string;
  private data: any[];

  constructor(table: string) {
    this.table = table;
    // Load fresh data from localStorage
    if (table === 'cars') {
      this.data = getLocalStorage('sat_mock_cars', initialCars);
    } else if (table === 'bookings') {
      this.data = getLocalStorage('sat_mock_bookings', []);
    } else if (table === 'reviews') {
      this.data = getLocalStorage('sat_mock_reviews', initialReviews);
    } else if (table === 'gallery') {
      this.data = getLocalStorage('sat_mock_gallery', initialGallery);
    } else if (table === 'profiles') {
      this.data = getLocalStorage('sat_mock_profiles', []);
    } else {
      this.data = [];
    }
  }

  select(columns: string = '*') {
    return this;
  }

  insert(values: any | any[]) {
    const list = Array.isArray(values) ? values : [values];
    const newItems = list.map(item => {
      const id = item.id || Math.random().toString(36).substring(2, 11);
      const created_at = new Date().toISOString();
      return { id, created_at, ...item };
    });

    this.data.push(...newItems);
    this.save();
    return Promise.resolve({ data: Array.isArray(values) ? newItems : newItems[0], error: null });
  }

  update(values: any) {
    return {
      eq: (column: string, value: any) => {
        this.data = this.data.map(item => {
          if (item[column] === value) {
            return { ...item, ...values };
          }
          return item;
        });
        this.save();
        return Promise.resolve({ data: this.data.filter(item => item[column] === value), error: null });
      }
    };
  }

  delete() {
    return {
      eq: (column: string, value: any) => {
        const deleted = this.data.filter(item => item[column] === value);
        this.data = this.data.filter(item => item[column] !== value);
        this.save();
        return Promise.resolve({ data: deleted, error: null });
      }
    };
  }

  // Filter mock
  eq(column: string, value: any) {
    const filtered = this.data.filter(item => {
      if (item[column] === value) return true;
      // Handle nested or foreign key mock lookups
      return false;
    });
    return {
      single: () => Promise.resolve({ data: filtered[0] || null, error: filtered.length ? null : { message: 'Not found' } }),
      order: (col: string, { ascending } = { ascending: false }) => {
        const sorted = [...filtered].sort((a, b) => {
          if (a[col] < b[col]) return ascending ? -1 : 1;
          if (a[col] > b[col]) return ascending ? 1 : -1;
          return 0;
        });
        return Promise.resolve({ data: sorted, error: null });
      },
      then: (onfulfilled: any) => Promise.resolve({ data: filtered, error: null }).then(onfulfilled)
    };
  }

  order(column: string, { ascending } = { ascending: false }) {
    const sorted = [...this.data].sort((a, b) => {
      if (a[column] < b[column]) return ascending ? -1 : 1;
      if (a[column] > b[column]) return ascending ? 1 : -1;
      return 0;
    });
    return Promise.resolve({ data: sorted, error: null });
  }

  // Promise-like then method so we can await direct select query calls
  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any): Promise<any> {
    return Promise.resolve({ data: this.data, error: null }).then(onfulfilled, onrejected);
  }

  private save() {
    if (this.table === 'cars') setLocalStorage('sat_mock_cars', this.data);
    else if (this.table === 'bookings') setLocalStorage('sat_mock_bookings', this.data);
    else if (this.table === 'reviews') setLocalStorage('sat_mock_reviews', this.data);
    else if (this.table === 'gallery') setLocalStorage('sat_mock_gallery', this.data);
    else if (this.table === 'profiles') setLocalStorage('sat_mock_profiles', this.data);
  }
}

// Mock Supabase Auth class
class MockAuth {
  async signUp({ email, password, options }: any) {
    const users = getLocalStorage('sat_mock_users_db', []);
    if (users.find((u: any) => u.email === email)) {
      return { data: { user: null }, error: { message: 'User already exists' } };
    }

    const userId = 'u-' + Math.random().toString(36).substring(2, 11);
    const fullName = options?.data?.full_name || 'Customer';
    const phone = options?.data?.phone_number || '';
    
    // Check if first user or contains 'admin' in email to make them admin
    const is_admin = email.toLowerCase().includes('admin') || users.length === 0;

    const newUser = {
      id: userId,
      email,
      full_name: fullName,
      phone_number: phone,
      is_admin,
      created_at: new Date().toISOString()
    };

    users.push({ ...newUser, password }); // Store in plain text for simple mock auth
    setLocalStorage('sat_mock_users_db', users);

    // Save profile
    const profiles = getLocalStorage('sat_mock_profiles', []);
    profiles.push({
      id: userId,
      full_name: fullName,
      phone_number: phone,
      is_admin,
      created_at: newUser.created_at
    });
    setLocalStorage('sat_mock_profiles', profiles);

    // Auto login
    setLocalStorage('sat_mock_user', newUser);

    return { data: { user: newUser, session: { access_token: 'mock-jwt-token' } }, error: null };
  }

  async signInWithPassword({ email, password }: any) {
    const users = getLocalStorage('sat_mock_users_db', []);
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { data: { user: null }, error: { message: 'Invalid login credentials' } };
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setLocalStorage('sat_mock_user', userWithoutPassword);

    return { data: { user: userWithoutPassword, session: { access_token: 'mock-jwt-token' } }, error: null };
  }

  async signOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sat_mock_user');
    }
    return { error: null };
  }

  async getUser() {
    const user = getMockUser();
    return { data: { user }, error: null };
  }

  async getSession() {
    const user = getMockUser();
    return { data: { session: user ? { user, access_token: 'mock-jwt-token' } : null }, error: null };
  }

  onAuthStateChange(callback: any) {
    // In local mock mode, we trigger once
    const user = getMockUser();
    callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', user ? { user, access_token: 'mock-jwt-token' } : null);
    
    // Return unsubscribe mock
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    };
  }
}

// Mock Supabase Storage class
class MockStorage {
  from(bucket: string) {
    return {
      async upload(path: string, file: File) {
        // Return a local base64/object URL mock
        const fileUrl = URL.createObjectURL(file);
        return { data: { path, fullPath: `${bucket}/${path}`, url: fileUrl }, error: null };
      },
      getPublicUrl(path: string) {
        // In local storage, just return a mock URL
        return { data: { publicUrl: `https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400` } };
      }
    };
  }
}

// Mock Supabase Client Object
const mockSupabase = {
  from(table: string) {
    return new MockQueryBuilder(table);
  },
  auth: new MockAuth(),
  storage: new MockStorage()
};

// Export the active client
let activeSupabaseClient: any;
let actuallyConfigured = false;

if (initialCheck) {
  try {
    // Basic URL validation to prevent crashes from malformed values
    if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
      throw new Error('Supabase URL must start with http:// or https://');
    }
    activeSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    actuallyConfigured = true;
  } catch (error) {
    console.error('Graceful Fallback: Failed to initialize Supabase client:', error);
    activeSupabaseClient = mockSupabase;
    actuallyConfigured = false;
  }
} else {
  activeSupabaseClient = mockSupabase;
  actuallyConfigured = false;
}

export const isSupabaseConfigured = actuallyConfigured;
export const supabase = activeSupabaseClient;
