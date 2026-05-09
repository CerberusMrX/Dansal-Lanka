const mongoose = require('mongoose');
require('dotenv').config();
const Dansal = require('./models/Dansal');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

const seedData = [
  { 
    name: "මහනුවර කිරිබත් දන්සල", 
    nameEn: "Kandy Kiribath Dansal", 
    loc: "මහනුවර", 
    type: "food", 
    icon: "🍚", 
    specials: ["කිරිබත්", "ලුණු මිරිස්"], 
    date: "2024-05-24", 
    startTime: "18:00", 
    endTime: "02:00", 
    lat: 7.2906, 
    lng: 80.6337 
  },
  { 
    name: "බොරැල්ල තේ දන්සල", 
    nameEn: "Borella Tea Dansal", 
    loc: "බොරැල්ල, කොළඹ 8", 
    type: "food", 
    icon: "🍵", 
    specials: ["තේ", "බිස්කට්"], 
    date: "2024-05-24", 
    startTime: "17:00", 
    endTime: "00:00", 
    lat: 6.9147, 
    lng: 79.8778 
  },
  { 
    name: "ගංගාරාමය තොරණ", 
    nameEn: "Gangaramaya Thoran", 
    loc: "කොළඹ 2", 
    type: "thoran", 
    icon: "🏯", 
    specials: [], 
    date: "2024-05-24", 
    startTime: "18:00", 
    endTime: "06:00", 
    lat: 6.9160, 
    lng: 79.8569 
  },
  { 
    name: "බේරේ වැව පන්සල", 
    nameEn: "Beira Lake Pansal", 
    loc: "කොළඹ 2", 
    type: "pansal", 
    icon: "🎆", 
    specials: [], 
    date: "2024-05-24", 
    startTime: "19:00", 
    endTime: "00:00", 
    lat: 6.9248, 
    lng: 79.8550 
  },
  { 
    name: "බම්බලපිටිය වෙසක් කලාපය", 
    nameEn: "Bambalapitiya Kalapa", 
    loc: "බම්බලපිටිය", 
    type: "kalapa", 
    icon: "🏮", 
    specials: [], 
    date: "2024-05-24", 
    startTime: "18:00", 
    endTime: "02:00", 
    lat: 6.8927, 
    lng: 79.8562 
  }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Clearing existing data...');
    await Dansal.deleteMany({});
    
    console.log('Inserting seed data...');
    await Dansal.insertMany(seedData);
    
    console.log('Seed completed successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
