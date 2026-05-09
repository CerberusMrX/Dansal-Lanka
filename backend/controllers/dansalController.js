const Dansal = require('../models/Dansal');

// @desc    Get all dansals
// @route   GET /api/dansals
// @access  Public
const getDansals = async (req, res) => {
  try {
    const dansals = await Dansal.find().sort({ createdAt: -1 });
    res.status(200).json(dansals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dansals', message: err.message });
  }
};

// @desc    Create a new dansal
// @route   POST /api/dansals
// @access  Public
const createDansal = async (req, res) => {
  try {
    const { name, loc, type, specials, date, startTime, endTime, lat, lng } = req.body;
    
    // Assign icon based on type
    let icon = '🏮';
    if (type === 'food') icon = '🍚';
    else if (type === 'thoran') icon = '🏯';
    else if (type === 'pansal') icon = '🎆';
    else if (type === 'kalapa') icon = '🏮';
    else if (type === 'bakthi_geetha') icon = '🎶';

    // Parse specials from comma separated string if provided
    let parsedSpecials = [];
    if (specials) {
        parsedSpecials = specials.split(',').map(s => s.trim()).filter(s => s);
    }

    const dansal = await Dansal.create({
      name,
      loc,
      type,
      icon,
      specials: parsedSpecials,
      date,
      startTime,
      endTime,
      lat,
      lng
    });

    res.status(201).json(dansal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create dansal', message: err.message });
  }
};

module.exports = {
  getDansals,
  createDansal
};
