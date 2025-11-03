const Krathong = require('../models/krathong.model');
const { sequelize } = require('../config/database');

/**
 * Create a new Krathong entry
 * @route POST /api/v1/krathong
 */
const createKrathong = async (req, res) => {
  try {
    const { krathong_type, emp_name, emp_department, emp_wish } = req.body;

    // Validate required fields
    if (!krathong_type || !emp_name || !emp_department) {
      return res.status(400).json({
        response_code: '0001',
        response_message: 'Invalid JSON format - missing required fields'
      });
    }

    // Create new Krathong
    const krathong = await Krathong.create({
      krathong_type,
      emp_name,
      emp_department,
      emp_wish: emp_wish || null,
      created_at: new Date()
    });

    return res.status(201).json({
      response_code: '0000',
      response_message: 'Krathong created successfully',
      data: krathong
    });
  } catch (error) {
    console.error('Error creating Krathong:', error);
    return res.status(500).json({
      response_code: '0004',
      response_message: 'Failed to create Krathong'
    });
  }
};

/**
 * Get the latest 20 Krathong entries
 * @route GET /api/v1/krathong
 */
const getKrathongs = async (req, res) => {
  try {
    // Use raw SQL query to match the Go implementation
    const [krathongs] = await sequelize.query(
      'SELECT * FROM krathongs ORDER BY created_at DESC LIMIT 20'
    );

    return res.status(200).json({
      response_code: '0000',
      response_message: 'Krathongs retrieved successfully',
      data: krathongs
    });
  } catch (error) {
    console.error('Error retrieving Krathongs:', error);
    return res.status(500).json({
      response_code: '0004',
      response_message: 'Failed to retrieve Krathongs - Database query error'
    });
  }
};

module.exports = {
  createKrathong,
  getKrathongs
};
