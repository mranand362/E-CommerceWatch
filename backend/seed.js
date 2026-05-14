// backend/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import dns from 'dns';

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);
// All 80 products from your watchesData
const products = [
  // Rolex (8)
  { name: "Submariner Date 126610LN", brand: "Rolex", brandSlug: "rolex", price: 9500, desc: "Iconic diver, 41mm Oystersteel.", image: "/images/R1.png", inStock: true, quantity: 10 },
  { name: "Cosmograph Daytona 116500LN", brand: "Rolex", brandSlug: "rolex", price: 13000, desc: "Racing chronograph with Cerachrom bezel.", image: "/images/R2.png", inStock: true, quantity: 5 },
  { name: "Datejust 36", brand: "Rolex", brandSlug: "rolex", price: 7200, desc: "Classic everyday-luxe Datejust.", image: "/images/R3.png", inStock: true, quantity: 8 },
  { name: "GMT-Master II Pepsi 126710BLRO", brand: "Rolex", brandSlug: "rolex", price: 11500, desc: "Dual-time travel watch with Pepsi bezel.", image: "/images/R4.png", inStock: true, quantity: 3 },
  { name: "Explorer II 226570", brand: "Rolex", brandSlug: "rolex", price: 8100, desc: "Rugged explorer with 24-hour hand.", image: "/images/R5.png", inStock: true, quantity: 4 },
  { name: "Sea-Dweller 126600", brand: "Rolex", brandSlug: "rolex", price: 10500, desc: "Deep-sea professional diver.", image: "/images/R6.png", inStock: true, quantity: 2 },
  { name: "Yacht-Master 40 126621", brand: "Rolex", brandSlug: "rolex", price: 12000, desc: "Nautical luxury sports watch.", image: "/images/R7.png", inStock: true, quantity: 3 },
  { name: "Milgauss 116400GV", brand: "Rolex", brandSlug: "rolex", price: 8400, desc: "Antimagnetic scientific watch.", image: "/images/R8.png", inStock: true, quantity: 4 },
  
  // Omega (8)
  { name: "Seamaster Diver 300M", brand: "Omega", brandSlug: "omega", price: 5200, desc: "Professional dive watch, 42mm.", image: "/images/O1.png", inStock: true, quantity: 10 },
  { name: "Speedmaster Moonwatch Professional", brand: "Omega", brandSlug: "omega", price: 6800, desc: "Legendary Moonwatch, manual wind.", image: "/images/O2.png", inStock: true, quantity: 8 },
  { name: "Planet Ocean 600M", brand: "Omega", brandSlug: "omega", price: 7500, desc: "Robust professional diver with helium escape.", image: "/images/O3.png", inStock: true, quantity: 5 },
  { name: "Aqua Terra", brand: "Omega", brandSlug: "omega", price: 5000, desc: "Elegant all-rounder with anti-magnetic movement.", image: "/images/O4.png", inStock: true, quantity: 7 },
  { name: "De Ville Prestige", brand: "Omega", brandSlug: "omega", price: 4300, desc: "Dress watch with classic elegance.", image: "/images/O5.png", inStock: true, quantity: 6 },
  { name: "Speedmaster Dark Side of the Moon", brand: "Omega", brandSlug: "omega", price: 10000, desc: "Ceramic case modern Speedmaster.", image: "/images/O6.png", inStock: true, quantity: 3 },
  { name: "Seamaster 300", brand: "Omega", brandSlug: "omega", price: 10000, desc: "Vintage-inspired Seamaster 300", image: "/images/O7.png", inStock: true, quantity: 4 },
  { name: "Constellation Co-Axial", brand: "Omega", brandSlug: "omega", price: 5800, desc: "Refined sports-dress crossover.", image: "/images/O8.png", inStock: true, quantity: 5 },
  
  // Patek Philippe (8)
  { name: "Nautilus 5711", brand: "Patek Philippe", brandSlug: "patek-philippe", price: 120000, desc: "Iconic luxury sports watch.", image: "/images/P1.png", inStock: true, quantity: 2 },
  { name: "Aquanaut 5167", brand: "Patek Philippe", brandSlug: "patek-philippe", price: 30000, desc: "Sporty modern Patek piece.", image: "/images/P2.png", inStock: true, quantity: 3 },
  { name: "Complications Annual Calendar", brand: "Patek Philippe", brandSlug: "patek-philippe", price: 48000, desc: "Refined calendar complication.", image: "/images/P3.png", inStock: true, quantity: 2 },
  { name: "Calatrava 5227", brand: "Patek Philippe", brandSlug: "patek-philippe", price: 35000, desc: "Elegant dress watch with lacquer dial.", image: "/images/P4.png", inStock: true, quantity: 4 },
  { name: "Grand Complication Perpetual", brand: "Patek Philippe", brandSlug: "patek-philippe", price: 180000, desc: "High watchmaking masterpiece.", image: "/images/P5.png", inStock: true, quantity: 1 },
  { name: "Complications Chronograph", brand: "Patek Philippe", brandSlug: "patek-philippe", price: 90000, desc: "Patek chronograph with refined finishing.", image: "/images/P6.png", inStock: true, quantity: 2 },
  { name: "Golden Ellipse", brand: "Patek Philippe", brandSlug: "patek-philippe", price: 25000, desc: "Iconic elliptical case design.", image: "/images/P7.png", inStock: true, quantity: 3 },
  { name: "Complications Travel Time", brand: "Patek Philippe", brandSlug: "patek-philippe", price: 55000, desc: "Dual-time with elegant finish.", image: "/images/P8.png", inStock: true, quantity: 2 },
  
  // Audemars Piguet (8)
  { name: "Royal Oak Jumbo 15202", brand: "Audemars Piguet", brandSlug: "audemars-piguet", price: 85000, desc: "Slim Royal Oak with iconic dial.", image: "/images/AP1.png", inStock: true, quantity: 2 },
  { name: "Royal Oak Offshore Chronograph", brand: "Audemars Piguet", brandSlug: "audemars-piguet", price: 28000, desc: "Sporty bold Offshore chronograph.", image: "/images/AP2.png", inStock: true, quantity: 3 },
  { name: "Royal Oak Selfwinding 15400", brand: "Audemars Piguet", brandSlug: "audemars-piguet", price: 30000, desc: "Everyday luxury with iconic case.", image: "/images/AP3.png", inStock: true, quantity: 4 },
  { name: "Code 11.59 Chronograph", brand: "Audemars Piguet", brandSlug: "audemars-piguet", price: 40000, desc: "Modern haute horlogerie chronograph.", image: "/images/AP4.png", inStock: true, quantity: 2 },
  { name: "Royal Oak Tourbillon", brand: "Audemars Piguet", brandSlug: "audemars-piguet", price: 150000, desc: "High complication with openworked dial.", image: "/images/AP5.png", inStock: true, quantity: 1 },
  { name: "Millenary", brand: "Audemars Piguet", brandSlug: "audemars-piguet", price: 36000, desc: "Elliptical case and off-centre dial.", image: "/images/AP6.png", inStock: true, quantity: 3 },
  { name: "Royal Oak Concept", brand: "Audemars Piguet", brandSlug: "audemars-piguet", price: 220000, desc: "Avant-garde high-tech concept watch.", image: "/images/AP7.png", inStock: true, quantity: 1 },
  { name: "Jules Audemars Chronograph", brand: "Audemars Piguet", brandSlug: "audemars-piguet", price: 45000, desc: "Classic AP dress chronograph.", image: "/images/AP8.png", inStock: true, quantity: 2 },
  
  // Cartier (8)
  { name: "Santos de Cartier Large", brand: "Cartier", brandSlug: "cartier", price: 7500, desc: "Square-cased Santos with refined style.", image: "/images/C1.png", inStock: true, quantity: 5 },
  { name: "Tank Louis Cartier", brand: "Cartier", brandSlug: "cartier", price: 6200, desc: "Timeless rectangular dress watch.", image: "/images/C2.png", inStock: true, quantity: 6 },
  { name: "Ballon Bleu 42mm", brand: "Cartier", brandSlug: "cartier", price: 8200, desc: "Elegant rounded case with cabochon.", image: "/images/C3.png", inStock: true, quantity: 4 },
  { name: "Pasha de Cartier", brand: "Cartier", brandSlug: "cartier", price: 9000, desc: "Bold Cartier sports-luxury watch.", image: "/images/C4.png", inStock: true, quantity: 3 },
  { name: "Ronde Solo", brand: "Cartier", brandSlug: "cartier", price: 4800, desc: "Classic circular Cartier dress watch.", image: "/images/C5.png", inStock: true, quantity: 7 },
  { name: "Clé de Cartier", brand: "Cartier", brandSlug: "cartier", price: 7900, desc: "Smooth, contemporary round case.", image: "/images/C6.png", inStock: true, quantity: 4 },
  { name: "Drive de Cartier", brand: "Cartier", brandSlug: "cartier", price: 6700, desc: "Automotive-inspired cushion case.", image: "/images/C7.png", inStock: true, quantity: 5 },
  { name: "Panthère de Cartier", brand: "Cartier", brandSlug: "cartier", price: 14000, desc: "Fashion-forward iconic bracelet watch.", image: "/images/C8.png", inStock: true, quantity: 3 },
  
  // Breitling (8)
  { name: "Navitimer B01 Chronograph", brand: "Breitling", brandSlug: "breitling", price: 8500, desc: "Pilot's chronograph with slide rule.", image: "/images/B1.png", inStock: true, quantity: 5 },
  { name: "Superocean Heritage", brand: "Breitling", brandSlug: "breitling", price: 4400, desc: "Heritage diver with vintage looks.", image: "/images/B2.png", inStock: true, quantity: 6 },
  { name: "Avenger Automatic", brand: "Breitling", brandSlug: "breitling", price: 3700, desc: "Rugged military-inspired tool watch.", image: "/images/B3.png", inStock: true, quantity: 7 },
  { name: "Chronomat B01 42", brand: "Breitling", brandSlug: "breitling", price: 7800, desc: "Versatile chronograph for daily use.", image: "/images/B4.png", inStock: true, quantity: 4 },
  { name: "Emergency", brand: "Breitling", brandSlug: "breitling", price: 16000, desc: "Tool watch with emergency transmitter.", image: "/images/B5.png", inStock: true, quantity: 2 },
  { name: "Premier B01", brand: "Breitling", brandSlug: "breitling", price: 6200, desc: "Elegant chronograph with refined finish.", image: "/images/B6.png", inStock: true, quantity: 4 },
  { name: "Superocean Automatic 44", brand: "Breitling", brandSlug: "breitling", price: 4800, desc: "Large, capable diver for serious use.", image: "/images/B7.png", inStock: true, quantity: 5 },
  { name: "Avenger Chronograph 45", brand: "Breitling", brandSlug: "breitling", price: 5900, desc: "Bold chronograph built for action.", image: "/images/B8.png", inStock: true, quantity: 5 },
  
  // IWC (8)
  { name: "Big Pilot's Watch", brand: "IWC", brandSlug: "iwc", price: 12000, desc: "Large dial pilot's watch with power reserve.", image: "/images/IWC1.png", inStock: true, quantity: 4 },
  { name: "Pilot's Watch Chronograph", brand: "IWC", brandSlug: "iwc", price: 6200, desc: "Classic flieger chronograph.", image: "/images/IWC2.png", inStock: true, quantity: 6 },
  { name: "Portugieser Automatic", brand: "IWC", brandSlug: "iwc", price: 8900, desc: "Elegant large-dial complication.", image: "/images/IWC3.png", inStock: true, quantity: 4 },
  { name: "Ingenieur Automatic", brand: "IWC", brandSlug: "iwc", price: 5500, desc: "Robust engineering-inspired watch.", image: "/images/IWC4.png", inStock: true, quantity: 5 },
  { name: "Aquatimer", brand: "IWC", brandSlug: "iwc", price: 6800, desc: "Sporty dive watch from IWC.", image: "/images/IWC5.png", inStock: true, quantity: 4 },
  { name: "Da Vinci Automatic", brand: "IWC", brandSlug: "iwc", price: 3000, desc: "Circular case with modern style.", image: "/images/IWC6.png", inStock: true, quantity: 6 },
  { name: "Portofino Chronograph", brand: "IWC", brandSlug: "iwc", price: 6000, desc: "Classic Italian-inspired Portofino.", image: "/images/IWC7.png", inStock: true, quantity: 5 },
  { name: "Pilot's Watch Mark XVIII", brand: "IWC", brandSlug: "iwc", price: 4200, desc: "Clean, legible pilot's classic.", image: "/images/IWC8.png", inStock: true, quantity: 6 },
  
  // Hublot (8)
  { name: "Classic Fusion 42mm", brand: "Hublot", brandSlug: "hublot", price: 12000, desc: "Fusion of materials with sleek styling.", image: "/images/H1.png", inStock: true, quantity: 4 },
  { name: "Big Bang Unico", brand: "Hublot", brandSlug: "hublot", price: 18000, desc: "Bold skeletonized chronograph.", image: "/images/H2.png", inStock: true, quantity: 3 },
  { name: "Spirit of Big Bang", brand: "Hublot", brandSlug: "hublot", price: 20000, desc: "Tonneau-shaped high-impact design.", image: "/images/H3.png", inStock: true, quantity: 3 },
  { name: "Big Bang Sang Bleu", brand: "Hublot", brandSlug: "hublot", price: 22000, desc: "Artistic collaboration with geometric dial.", image: "/images/H4.png", inStock: true, quantity: 2 },
  { name: "Classic Fusion Chronograph", brand: "Hublot", brandSlug: "hublot", price: 11000, desc: "Slim chronograph with modern flair.", image: "/images/H5.png", inStock: true, quantity: 4 },
  { name: "MP Collection Tourbillon", brand: "Hublot", brandSlug: "hublot", price: 150000, desc: "Experimental haute-horlogerie tourbillon.", image: "/images/H6.png", inStock: true, quantity: 1 },
  { name: "Big Bang Ferrari", brand: "Hublot", brandSlug: "hublot", price: 25000, desc: "Motorsport collaboration with Ferrari.", image: "/images/H7.png", inStock: true, quantity: 2 },
  { name: "Classic Fusion Sapphire", brand: "Hublot", brandSlug: "hublot", price: 30000, desc: "Transparent sapphire case showcase.", image: "/images/H8.png", inStock: true, quantity: 2 },
  
  // Tag Heuer (8)
  { name: "Carrera Chronograph", brand: "Tag Heuer", brandSlug: "tag-heuer", price: 4200, desc: "Racing-inspired chronograph.", image: "/images/TH1.png", inStock: true, quantity: 8 },
  { name: "Monaco Calibre 11", brand: "Tag Heuer", brandSlug: "tag-heuer", price: 6500, desc: "Square chrono made famous by motorsport.", image: "/images/TH2.png", inStock: true, quantity: 5 },
  { name: "Aquaracer Professional 300", brand: "Tag Heuer", brandSlug: "tag-heuer", price: 3200, desc: "Reliable professional diver.", image: "/images/TH3.png", inStock: true, quantity: 7 },
  { name: "Autavia Isograph", brand: "Tag Heuer", brandSlug: "tag-heuer", price: 3800, desc: "Heritage-inspired pilot's watch.", image: "/images/TH4.png", inStock: true, quantity: 6 },
  { name: "Formula 1 Quartz", brand: "Tag Heuer", brandSlug: "tag-heuer", price: 1200, desc: "Sporty accessible quartz piece.", image: "/images/TH5.png", inStock: true, quantity: 10 },
  { name: "Connected Modular", brand: "Tag Heuer", brandSlug: "tag-heuer", price: 2000, desc: "Luxury smartwatch platform.", image: "/images/TH6.png", inStock: true, quantity: 8 },
  { name: "Carrera Heuer 02", brand: "Tag Heuer", brandSlug: "tag-heuer", price: 5100, desc: "In-house chronograph movement.", image: "/images/TH7.png", inStock: true, quantity: 5 },
  { name: "Monza Chronograph", brand: "Tag Heuer", brandSlug: "tag-heuer", price: 4800, desc: "Historic motorsport tribute.", image: "/images/TH8.png", inStock: true, quantity: 5 },
  
  // Jaeger-LeCoultre (8)
  { name: "Reverso Classic Large", brand: "Jaeger-LeCoultre", brandSlug: "jaeger-lecoultre", price: 6700, desc: "Iconic reversible case.", image: "/images/JL1.png", inStock: true, quantity: 5 },
  { name: "Master Control Date", brand: "Jaeger-LeCoultre", brandSlug: "jaeger-lecoultre", price: 7900, desc: "Refined classic with clean dial.", image: "/images/JL2.png", inStock: true, quantity: 4 },
  { name: "Polaris Memovox", brand: "Jaeger-LeCoultre", brandSlug: "jaeger-lecoultre", price: 12000, desc: "Sport-luxury alarm watch.", image: "/images/JL3.png", inStock: true, quantity: 3 },
  { name: "Master Ultra Thin Moon", brand: "Jaeger-LeCoultre", brandSlug: "jaeger-lecoultre", price: 10500, desc: "Slim moonphase elegance.", image: "/images/JL4.png", inStock: true, quantity: 4 },
  { name: "Geophysic True Second", brand: "Jaeger-LeCoultre", brandSlug: "jaeger-lecoultre", price: 11500, desc: "Precision timekeeping instrument.", image: "/images/JL5.png", inStock: true, quantity: 3 },
  { name: "Master Calendar", brand: "Jaeger-LeCoultre", brandSlug: "jaeger-lecoultre", price: 13000, desc: "Full calendar with moonphase.", image: "/images/JL6.png", inStock: true, quantity: 3 },
  { name: "Reverso Tribute Small Seconds", brand: "Jaeger-LeCoultre", brandSlug: "jaeger-lecoultre", price: 8500, desc: "Slim tribute to classic Reverso.", image: "/images/JL7.png", inStock: true, quantity: 4 },
  { name: "Duomètre Unique Travel Time", brand: "Jaeger-LeCoultre", brandSlug: "jaeger-lecoultre", price: 55000, desc: "Complex dual-wing mechanism.", image: "/images/JL8.png", inStock: true, quantity: 2 },
];

const users = [
  {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "9876543210",
    password: "123456",
    isAdmin: false,
  },
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@luxurytime.com",
    phone: "9999999999",
    password: "Admin@123",
    isAdmin: true,
  },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://mranand337_db_user:Anand%401234@cluster0.czqn6rf.mongodb.net/Auth-db');
    
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    console.log('✅ Existing data cleared');
    
    // Insert products
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products imported`);
    
    // Insert users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({ ...user, password: hashedPassword });
    }
    console.log(`✅ ${users.length} users imported`);
    
    console.log('\n📋 Login Credentials:');
    console.log('  Email: test@example.com | Password: 123456');
    console.log('  Email: admin@luxurytime.com | Password: Admin@123');
    console.log(`\n📦 Total Products in DB: ${products.length}`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

importData();