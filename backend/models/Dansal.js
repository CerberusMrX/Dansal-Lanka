const mongoose = require('mongoose');

const dansalSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a name'] },
  nameEn: { type: String, default: '' },
  loc: { type: String, required: [true, 'Please add a location'] },
  type: { 
    type: String, 
    required: [true, 'Please select a type'],
    enum: ['food', 'thoran', 'pansal', 'kalapa', 'bakthi_geetha']
  },
  icon: { type: String },
  specials: [{ type: String }],
  specialsEn: [{ type: String }],
  date: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  rating: { type: Number, default: 5 },
  open: { type: Boolean, default: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dansal', dansalSchema);
