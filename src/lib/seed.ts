export type City = { id: number; name: string; image: string };
export type Amenity = { id: number; name: string; type: string; icon: string };
export type Property = {
  id: number; city_id: number; name: string; address: string;
  description: string; gender: "male" | "female" | "unisex";
  rent: number; rating_clean: number; rating_food: number; rating_safety: number;
  images: string[];
  is_verified?: boolean;
  is_popular?: boolean;
};
export type Testimonial = { id: number; property_id: number; user_name: string; content: string };

// Reliable local assets
const cityImgs: Record<string, string> = {
  "Delhi": "/images/delhi.png",
  "Mumbai": "/images/mumbai.png",
  "Bengaluru": "/images/bengaluru.png",
  "Hyderabad": "/images/hyderabad.png"
};

const roomImgs: Record<string, string> = {
  "male": "/images/pg_male.png",
  "female": "/images/pg_female.png",
  "unisex": "/images/pg_unisex.png"
};

export const cities: City[] = [
  { id: 1, name: "Delhi", image: cityImgs["Delhi"] },
  { id: 2, name: "Mumbai", image: cityImgs["Mumbai"] },
  { id: 3, name: "Bengaluru", image: cityImgs["Bengaluru"] },
  { id: 4, name: "Hyderabad", image: cityImgs["Hyderabad"] },
];

export const amenities: Amenity[] = [
  { id: 1, name: "Wifi", type: "Common Area", icon: "wifi" },
  { id: 2, name: "Power Backup", type: "Building", icon: "powerbackup" },
  { id: 3, name: "Fire Extinguisher", type: "Building", icon: "fireext" },
  { id: 4, name: "TV", type: "Common Area", icon: "tv" },
  { id: 5, name: "Bed with Mattress", type: "Bedroom", icon: "bed" },
  { id: 6, name: "Parking", type: "Building", icon: "parking" },
  { id: 7, name: "Water Purifier", type: "Common Area", icon: "rowater" },
  { id: 8, name: "Dining", type: "Common Area", icon: "dining" },
  { id: 9, name: "Air Conditioner", type: "Bedroom", icon: "ac" },
  { id: 10, name: "Washing Machine", type: "Common Area", icon: "washingmachine" },
  { id: 11, name: "Lift", type: "Building", icon: "lift" },
  { id: 12, name: "CCTV", type: "Building", icon: "cctv" },
  { id: 13, name: "Geyser", type: "Washroom", icon: "geyser" },
];

export const properties: Property[] = [
  // Delhi
  { id: 1, city_id: 1, name: "The Orchid Residency", address: "H.No. 3958 Kaseru Walan, Pahar Ganj, New Delhi 110055", description: "High-spec living space in the heart of Delhi. Features premium woodwork and high-speed connectivity.", gender: "male", rent: 5500, rating_clean: 4.3, rating_food: 3.4, rating_safety: 4.8, images: [roomImgs["male"]], is_verified: true },
  { id: 2, city_id: 1, name: "Skyline Suites", address: "644-C, Mohalla Baoli 6 Tooti Chowk, Paharganj, New Delhi 110055", description: "Modern unisex accommodation with a communal rooftop and 24/7 security.", gender: "unisex", rent: 6200, rating_clean: 3.5, rating_food: 3.4, rating_safety: 3.8, images: [roomImgs["unisex"]], is_popular: true },
  { id: 3, city_id: 1, name: "Amber Heights", address: "12/4, Karol Bagh, New Delhi 110005", description: "Bespoke female-only PG with refined interiors and a focus on wellness.", gender: "female", rent: 7500, rating_clean: 4.8, rating_food: 4.2, rating_safety: 4.9, images: [roomImgs["female"]], is_verified: true },
  { id: 4, city_id: 1, name: "Heritage Haven", address: "Plot 88, Civil Lines, North Delhi 110054", description: "Spacious rooms with traditional North Indian heritage architecture and modern amenities.", gender: "male", rent: 8000, rating_clean: 4.1, rating_food: 4.5, rating_safety: 4.3, images: [roomImgs["male"]] },
  { id: 5, city_id: 1, name: "Vibrant Vista", address: "B-5, GK-1, New Delhi 110048", description: "Trendy unisex PG located in a prime residential area. Close to markets and metro.", gender: "unisex", rent: 9500, rating_clean: 4.6, rating_food: 4.0, rating_safety: 4.2, images: [roomImgs["unisex"]], is_popular: true },
  { id: 6, city_id: 1, name: "Serene Square", address: "M-4, Dwarka Sector 12, New Delhi 110075", description: "Quiet and peaceful accommodation for focused students and professionals.", gender: "female", rent: 6800, rating_clean: 4.4, rating_food: 3.8, rating_safety: 4.6, images: [roomImgs["female"]], is_verified: true },
  { id: 7, city_id: 1, name: "The Link PG", address: "N-12, Laxmi Nagar, New Delhi 110092", description: "Excellent connectivity and a community-driven atmosphere.", gender: "unisex", rent: 5800, rating_clean: 3.9, rating_food: 3.5, rating_safety: 4.1, images: [roomImgs["unisex"]] },
  { id: 8, city_id: 1, name: "Metropolitan Suites", address: "Near Saket Metro, South Delhi 110017", description: "Luxury living with individual power backups and high-end security.", gender: "unisex", rent: 11000, rating_clean: 4.9, rating_food: 4.3, rating_safety: 4.9, images: [roomImgs["unisex"]], is_verified: true },

  // Mumbai
  { id: 9, city_id: 2, name: "Navkar Emerald", address: "44, Juhu Scheme, Juhu, Mumbai 400058", description: "Premium sea-facing apartment converted into high-end student living.", gender: "female", rent: 15500, rating_clean: 3.9, rating_food: 3.8, rating_safety: 4.9, images: [roomImgs["female"]], is_verified: true },
  { id: 10, city_id: 2, name: "West Gate Living", address: "Plot no.258, Borivali West, Mumbai 400092", description: "Quiet residency in a leafy suburb. Features a library and home-cooked meals.", gender: "female", rent: 12000, rating_clean: 4.2, rating_food: 4.1, rating_safety: 4.5, images: [roomImgs["female"]], is_popular: true },
  { id: 11, city_id: 2, name: "Ganpati Palace", address: "Sainath Complex, Borivali East, Mumbai 400066", description: "Excellent connectivity to the Western Express Highway.", gender: "male", rent: 9500, rating_clean: 4.2, rating_food: 3.9, rating_safety: 4.6, images: [roomImgs["male"]] },
  { id: 12, city_id: 2, name: "Andheri Lofts", address: "Andheri West, Mumbai 400053", description: "Contemporary loft-style accommodation for creative professionals.", gender: "unisex", rent: 18000, rating_clean: 4.7, rating_food: 4.0, rating_safety: 4.8, images: [roomImgs["unisex"]], is_verified: true },
  { id: 13, city_id: 2, name: "Bandra Breeze", address: "Hill Road, Bandra West, Mumbai 400050", description: "Live where the action is. Stylish studio sharing with modular kitchen.", gender: "unisex", rent: 22000, rating_clean: 4.5, rating_food: 4.5, rating_safety: 4.7, images: [roomImgs["unisex"]], is_popular: true },
  { id: 14, city_id: 2, name: "Marine View PG", address: "Marine Lines, Mumbai 400002", description: "Heritage building with large windows and amazing sunset views.", gender: "male", rent: 14000, rating_clean: 4.0, rating_food: 3.5, rating_safety: 4.4, images: [roomImgs["male"]] },
  { id: 15, city_id: 2, name: "Powai Hive", address: "Hiranandani, Powai, Mumbai 400076", description: "Smart hub for techies. Proximity to IIT Bombay and corporate offices.", gender: "unisex", rent: 16500, rating_clean: 4.6, rating_food: 4.1, rating_safety: 4.5, images: [roomImgs["unisex"]], is_verified: true },
  { id: 16, city_id: 2, name: "Dadar Central", address: "Portuguese Church, Dadar, Mumbai 400028", description: "Centrally located with the best rail and road connectivity.", gender: "unisex", rent: 11000, rating_clean: 4.1, rating_food: 4.2, rating_safety: 4.0, images: [roomImgs["unisex"]] },

  // Bengaluru
  { id: 17, city_id: 3, name: "Cyber Residency", address: "HSR Layout, Bengaluru 560102", description: "Modern living for the tech elite. High-speed fiber and zero power interruption.", gender: "unisex", rent: 12500, rating_clean: 4.8, rating_food: 4.0, rating_safety: 4.9, images: [roomImgs["unisex"]], is_verified: true },
  { id: 18, city_id: 3, name: "The Koramangala Nest", address: "5th Block, Koramangala, Bengaluru 560034", description: "Stylish rooms with a vibrant atmosphere. Close to top cafes and pubs.", gender: "unisex", rent: 14000, rating_clean: 4.5, rating_food: 4.2, rating_safety: 4.7, images: [roomImgs["unisex"]], is_popular: true },
  { id: 19, city_id: 3, name: "Indiranagar Suites", address: "Double Road, Indiranagar, Bengaluru 560038", description: "Elegance meets comfort. Quiet residential block in a premium neighborhood.", gender: "female", rent: 16000, rating_clean: 4.9, rating_food: 4.1, rating_safety: 4.9, images: [roomImgs["female"]], is_verified: true },
  { id: 20, city_id: 3, name: "Whitefield Hub", address: "Near ITPL, Whitefield, Bengaluru 560066", description: "Simplify your commute. Professional PG with gym and laundry services.", gender: "male", rent: 11000, rating_clean: 4.2, rating_food: 4.5, rating_safety: 4.3, images: [roomImgs["male"]] },
  { id: 21, city_id: 3, name: "Electronic City Stay", address: "Phase 1, Electronic City, Bengaluru 560100", description: "Budget-friendly with no compromise on security and cleanliness.", gender: "unisex", rent: 8500, rating_clean: 4.0, rating_food: 3.8, rating_safety: 4.4, images: [roomImgs["unisex"]] },
  { id: 22, city_id: 3, name: "JP Nagar Heritage", address: "3rd Phase, JP Nagar, Bengaluru 560078", description: "Spacious bungalow converted into a peaceful PG for long-term stays.", gender: "male", rent: 10500, rating_clean: 4.3, rating_food: 4.0, rating_safety: 4.5, images: [roomImgs["male"]], is_popular: true },
  { id: 23, city_id: 3, name: "Malleshwaram Manor", address: "10th Cross, Malleshwaram, Bengaluru 560003", description: "Experience Old Bengaluru. Quiet, clean, and well-maintained rooms.", gender: "female", rent: 9000, rating_clean: 4.6, rating_food: 3.9, rating_safety: 4.8, images: [roomImgs["female"]], is_verified: true },
  { id: 24, city_id: 3, name: "Bannerghatta Woods", address: "Arekere, Bengaluru 560076", description: "Green surroundings with high-end furniture and dedicated workspaces.", gender: "unisex", rent: 11500, rating_clean: 4.4, rating_food: 4.3, rating_safety: 4.5, images: [roomImgs["unisex"]] },

  // Hyderabad
  { id: 25, city_id: 4, name: "Hitech Residency", address: "Madhapur, Hyderabad 500081", description: "Premium PG with a view of the Cyber Towers. High-end food and weekly events.", gender: "unisex", rent: 12000, rating_clean: 4.7, rating_food: 4.5, rating_safety: 4.8, images: [roomImgs["unisex"]], is_verified: true },
  { id: 26, city_id: 4, name: "Gachibowli Heights", address: "Financial District, Hyderabad 500032", description: "Modern hub for finance professionals. Features a clubhouse and private theater.", gender: "unisex", rent: 14500, rating_clean: 4.9, rating_food: 4.1, rating_safety: 4.9, images: [roomImgs["unisex"]], is_popular: true },
  { id: 27, city_id: 4, name: "Banjara Hills Stay", address: "Road No. 12, Banjara Hills, Hyderabad 500034", description: "Live luxuriously. High-end interiors with private balconies.", gender: "female", rent: 18000, rating_clean: 4.9, rating_food: 4.4, rating_safety: 4.9, images: [roomImgs["female"]], is_verified: true },
  { id: 28, city_id: 4, name: "Jubilee Living", address: "Road No. 36, Jubilee Hills, Hyderabad 500033", description: "Elite accommodation with biometric access and organic meal options.", gender: "male", rent: 16500, rating_clean: 4.8, rating_food: 4.6, rating_safety: 4.7, images: [roomImgs["male"]], is_popular: true },
  { id: 29, city_id: 4, name: "Kukatpally Suites", address: "KPHB Phase 1, Hyderabad 500072", description: "Best for shopping enthusiasts. Excellent metro connectivity and security.", gender: "unisex", rent: 8500, rating_clean: 4.2, rating_food: 4.0, rating_safety: 4.3, images: [roomImgs["unisex"]] },
  { id: 30, city_id: 4, name: "Ameerpet Hub", address: "SR Nagar, Hyderabad 500038", description: "Focused environment for GATE/IES aspirants. Strict discipline and great food.", gender: "male", rent: 7500, rating_clean: 4.4, rating_food: 4.3, rating_safety: 4.1, images: [roomImgs["male"]] },
  { id: 31, city_id: 4, name: "Secunderabad Stay", address: "Marredpally, Hyderabad 500026", description: "Peaceful atmosphere with traditional Hyderabadi hospitality.", gender: "female", rent: 9000, rating_clean: 4.5, rating_food: 3.9, rating_safety: 4.6, images: [roomImgs["female"]] },
  { id: 32, city_id: 4, name: "Himayatnagar Home", address: "Street No. 4, Hyderabad 500029", description: "Renovated property with split ACs and ultra-fast internet.", gender: "unisex", rent: 10500, rating_clean: 4.6, rating_food: 4.2, rating_safety: 4.7, images: [roomImgs["unisex"]], is_verified: true },
];

export const testimonials: Testimonial[] = [
  { id: 1, property_id: 1, user_name: "Ashutosh G.", content: "Fully furnished and stocked with all basic amenities. Friends are welcome too!" },
  { id: 2, property_id: 1, user_name: "Karan J.", content: "Just arrive and settle in. Everything is taken care of. Amazing neighborhood." },
  { id: 3, property_id: 2, user_name: "Zoya A.", content: "Great place to stay. The common area is spacious and the food is decent." },
  { id: 4, property_id: 9, user_name: "Mira N.", content: "Beautiful location in Juhu. Rooms are well-maintained and food is great." },
  { id: 5, property_id: 17, user_name: "Rohan S.", content: "Best place for software developers. The internet is crazy fast and stable." },
  { id: 6, property_id: 25, user_name: "Priya V.", content: "The view from the balcony is stunning. Safe for working women and the food is like home." },
  { id: 7, property_id: 12, user_name: "Kabir M.", content: "Modern vibe and great crowd. The weekend meetups are fun!" },
  { id: 8, property_id: 19, user_name: "Sneha R.", content: "Very secure and close to everything. Highly recommended for newcomers to Bengaluru." },
];

// Mapping for amenities logic (simplified for expandability)
const PA: Record<number, number[]> = {};
for (let i = 1; i <= 32; i++) {
  PA[i] = [1, 2, 3, i % 2 === 0 ? 4 : 5, 6, 7, 8, 9, 10, i % 3 === 0 ? 11 : 12, 13].filter(id => id <= 13);
}

export function getPropertyAmenities(propertyId: number): Amenity[] {
  const ids = PA[propertyId] ?? [1, 2, 5, 7, 9, 13];
  return amenities.filter(a => ids.includes(a.id));
}

export function getPropertiesByCity(cityName: string): Property[] {
  if (!cityName) return properties;
  const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  if (!city) return [];
  return properties.filter(p => p.city_id === city.id);
}


export function getPropertyById(id: number) { return properties.find(p => p.id === id); }
export function getCityById(id: number) { return cities.find(c => c.id === id); }
export function calcRating(p: Pick<Property, "rating_clean"|"rating_food"|"rating_safety">) {
  return Math.round(((p.rating_clean + p.rating_food + p.rating_safety) / 3) * 10) / 10;
}
