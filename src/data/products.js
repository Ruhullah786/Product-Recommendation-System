/**
 * Mock Product Database
 * 
 * This dataset contains 12 high-quality premium products with rich specs and descriptions,
 * optimized for semantic search and filter matching by the Gemini AI model.
 * Each product contains a unique ID, categoric tags, and details about target usage.
 */
export const products = [
  {
    id: 1,
    name: "AeroPro Wireless Noise-Cancelling Headphones",
    price: 299.99,
    category: "Audio",
    rating: 4.8,
    description: "Premium over-ear headphones featuring hybrid active noise cancellation, high-resolution audio drivers, and an ultra-comfortable memory foam headband. Ideal for travel, deep work, or audiophiles.",
    specs: {
      battery: "45 Hours with ANC",
      connection: "Bluetooth 5.3 & AUX",
      weight: "250g",
      features: "Spatial Audio, Multipoint Pairing"
    },
    iconName: "Headphones"
  },
  {
    id: 2,
    name: "AeroGlide Mechanical Keyboard",
    price: 189.99,
    category: "Productivity",
    rating: 4.7,
    description: "Ultra-responsive low-profile wireless mechanical keyboard with quiet linear switches, customizable white LED backlighting, and a sleek brushed aluminum top plate. Great for developers and writers.",
    specs: {
      switches: "Custom Linear Silent Red",
      layout: "75% Compact Layout",
      connectivity: "Bluetooth / 2.4Ghz / USB-C",
      compatibility: "macOS, Windows, Linux, iOS"
    },
    iconName: "Keyboard"
  },
  {
    id: 3,
    name: "LuminaSmart LED Desk Lamp",
    price: 64.99,
    category: "Smart Home",
    rating: 4.5,
    description: "Intelligent desk lamp featuring auto-brightness adjustment based on ambient lighting, adjustable color temperature (2700K - 6500K), an integrated Qi wireless charging pad, and Apple HomeKit/Alexa support.",
    specs: {
      brightness: "1000 Lumens Max",
      powerSource: "12V AC Adapter",
      wirelessCharging: "15W Fast Charge",
      lifespan: "50,000 Hours"
    },
    iconName: "Lamp"
  },
  {
    id: 4,
    name: "ThermaStream Stainless Smart Tumbler",
    price: 49.99,
    category: "Wellness",
    rating: 4.4,
    description: "Double-walled vacuum insulated smart water bottle that keeps drinks hot for 12 hours or ice cold for 24 hours. Includes a LED touch lid that displays current temperature and hydration reminders.",
    specs: {
      capacity: "600ml / 20oz",
      material: "316 Medical-Grade Stainless Steel",
      batteryLife: "Up to 30 days on a single charge",
      charging: "Magnetic USB Charger"
    },
    iconName: "Cup"
  },
  {
    id: 5,
    name: "VeloCharge Magnetic Power Bank",
    price: 39.99,
    category: "Electronics",
    rating: 4.6,
    description: "Super slim 10,000mAh magnetic power bank with MagSafe compatibility. Features a foldable kickstand, a premium soft-touch fabric finish, and a high-speed USB-C Power Delivery port.",
    specs: {
      capacity: "10,000 mAh",
      wirelessOutput: "7.5W / 15W Max",
      wiredOutput: "20W Power Delivery",
      thickness: "11mm"
    },
    iconName: "BatteryCharging"
  },
  {
    id: 6,
    name: "FlexiFit Ergonomic Office Chair",
    price: 449.99,
    category: "Furniture",
    rating: 4.9,
    description: "High-performance ergonomic workspace chair featuring 3D adjustable armrests, adaptive lumbar support, breathable polymer mesh backrest, and smooth-glide caster wheels for long working hours.",
    specs: {
      material: "Reinforced Nylon Frame, Recyclable Mesh",
      weightCapacity: "150kg / 330lbs",
      adjustability: "Seat Height, Tilt Tension, Lumbar, Armrests",
      warranty: "5-Year Manufacturer Warranty"
    },
    iconName: "Chair"
  },
  {
    id: 7,
    name: "FitTrack Pulse Smart Fitness Watch",
    price: 129.99,
    category: "Fitness",
    rating: 4.3,
    description: "Sleek and lightweight fitness tracker watch featuring 24/7 heart rate monitoring, blood oxygen SpO2 sensor, sleep quality tracker, connected GPS tracking, and a bright AMOLED touchscreen. Rated 5ATM waterproof.",
    specs: {
      battery: "7-10 Days Active Use",
      screen: "1.43-inch AMOLED Glass",
      waterproofRating: "5ATM (Up to 50m)",
      sportsModes: "35+ Active Tracking Profiles"
    },
    iconName: "Watch"
  },
  {
    id: 8,
    name: "NomadGuard Water-Resistant Tech Backpack",
    price: 119.99,
    category: "Productivity",
    rating: 4.7,
    description: "Durable, travel-ready backpack made from recycled water-resistant ballistic nylon. Features a dedicated TSA-friendly 16-inch laptop compartment, hidden anti-theft pocket, and passport pocket sleeve.",
    specs: {
      capacity: "24 Liters",
      laptopPocket: "Fits up to 16-inch MacBook Pro",
      dimensions: "46 x 30 x 15 cm",
      material: "900D Ballistic Cordura Nylon"
    },
    iconName: "Backpack"
  },
  {
    id: 9,
    name: "PureAir Mini HEPA Air Purifier",
    price: 79.99,
    category: "Smart Home",
    rating: 4.5,
    description: "Compact desktop air purifier equipped with a 3-stage H13 True HEPA filter, capturing 99.97% of airborne allergens, pet dander, dust, and smoke. Super-quiet sleep mode operating at only 22dB.",
    specs: {
      coverage: "Up to 150 sq. ft.",
      filterLife: "6 to 8 Months",
      noiseLevel: "22dB to 48dB",
      dimensions: "18 x 18 x 25 cm"
    },
    iconName: "Wind"
  },
  {
    id: 10,
    name: "HyperCharge 120W Multi-Port USB-C GaN Charger",
    price: 59.99,
    category: "Electronics",
    rating: 4.8,
    description: "Fast-charging gallium nitride (GaN) charger equipped with 3x USB-C ports and 1x USB-A port. Capable of charging two laptops and a phone simultaneously. Foldable plugs for convenient travel.",
    specs: {
      totalOutput: "120W Max",
      ports: "3x USB-C, 1x USB-A",
      technology: "GaN Fast Charge 3.0",
      compatibility: "Laptops, Tablets, Smartphones, Switch"
    },
    iconName: "Plug"
  },
  {
    id: 11,
    name: "ApexGrip Resistance Band Training Set",
    price: 29.99,
    category: "Fitness",
    rating: 4.6,
    description: "Premium heavy-duty latex resistance bands set including 5 different stackable resistance tubes (10lbs to 50lbs), comfortable foam handles, soft ankle straps, a door anchor, and a waterproof carrying pouch.",
    specs: {
      resistanceRange: "Total stackable load up to 150 lbs",
      material: "100% Eco-Friendly Natural Latex",
      accessories: "2x Handles, 2x Ankle Straps, 1x Door Anchor, 1x Carry Bag",
      exerciseGuide: "Digital workout guide included"
    },
    iconName: "Dumbbell"
  },
  {
    id: 12,
    name: "ZenDiffuser Ultrasonic Essential Oil Diffuser",
    price: 34.99,
    category: "Wellness",
    rating: 4.5,
    description: "Minimalist ceramic ultrasonic aromatherapy mist diffuser with 7-color soothing ambient LED lighting, auto-shutoff protection when empty, and silent operation. Enhances any workspace or bedroom.",
    specs: {
      waterCapacity: "200 ml",
      mistModes: "Continuous / Intermittent",
      runtime: "Up to 8 Hours",
      noiseLevel: "<19dB (Ultra-Quiet)"
    },
    iconName: "Flower"
  },


{
  id: 13,
  name: "Google Pixel 8a",
  price: 499,
  category: "Phone",
  rating: 4.7,
  description: "Google smartphone with AI features, 120Hz OLED display and excellent camera.",
  specs: {
    storage: "128GB",
    ram: "8GB",
    display: "6.1-inch OLED",
    battery: "4492mAh"
  },
  iconName: "Smartphone"
},
{
  id: 14,
  name: "Samsung Galaxy A55",
  price: 449,
  category: "Phone",
  rating: 4.6,
  description: "Mid-range Samsung phone with AMOLED display and long battery life.",
  specs: {
    storage: "256GB",
    ram: "8GB",
    display: "6.6-inch AMOLED",
    battery: "5000mAh"
  },
  iconName: "Smartphone"
},
{
  id: 15,
  name: "Nothing Phone (2a)",
  price: 349,
  category: "Phone",
  rating: 4.5,
  description: "Stylish Android smartphone with Glyph interface and OLED display.",
  specs: {
    storage: "128GB",
    ram: "8GB",
    display: "6.7-inch AMOLED",
    battery: "5000mAh"
  },
  iconName: "Smartphone"
},
];
