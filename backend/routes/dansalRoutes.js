const express = require('express');
const router = express.Router();
const { getDansals, createDansal } = require('../controllers/dansalController');

router.route('/')
  .get(getDansals)
  .post(createDansal);

module.exports = router;
