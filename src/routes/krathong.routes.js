const express = require('express');
const router = express.Router();
const { createKrathong, getKrathongs } = require('../controllers/krathong.controller');

// POST /api/v1/krathong - Create a new Krathong
router.post('/krathong', createKrathong);

// GET /api/v1/krathong - Get latest 20 Krathongs
router.get('/krathong', getKrathongs);

module.exports = router;
