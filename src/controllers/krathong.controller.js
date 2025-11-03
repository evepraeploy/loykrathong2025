const { getSequelize } = require("../config/database");
let Krathong;

const ensureModelLoaded = () => {
  if (!Krathong) {
    const sequelize = getSequelize();
    if (!sequelize) throw new Error("Sequelize instance not initialized");
    Krathong = require("../models/krathong.model");
  }
};

/**
 * Create a new Krathong entry
 * @route POST /api/v1/krathong
 */
const createKrathong = async (req, res) => {
  try {
    ensureModelLoaded();

    const { krathong_type, emp_name, emp_department, emp_wish } = req.body;

    if (!krathong_type || !emp_name || !emp_department) {
      return res.status(400).json({
        response_code: "0001",
        response_message: "Invalid JSON format - missing required fields",
      });
    }

    const krathong = await Krathong.create({
      krathong_type,
      emp_name,
      emp_department,
      emp_wish: emp_wish || null,
      created_at: new Date(),
    });

    return res.status(201).json({
      response_code: "0000",
      response_message: "Krathong created successfully",
      data: krathong,
    });
  } catch (error) {
    console.error("Error creating Krathong:", error);
    return res.status(500).json({
      response_code: "0004",
      response_message: "Failed to create Krathong",
    });
  }
};

/**
 * Get the latest 20 Krathong entries
 * @route GET /api/v1/krathong
 */
const getKrathongs = async (req, res) => {
  try {
    const sequelize = getSequelize();
    const [krathongs] = await sequelize.query(
      "SELECT * FROM krathongs ORDER BY created_at DESC LIMIT 20"
    );

    return res.status(200).json({
      response_code: "0000",
      response_message: "Krathongs retrieved successfully",
      data: krathongs,
    });
  } catch (error) {
    console.error("Error retrieving Krathongs:", error);
    return res.status(500).json({
      response_code: "0004",
      response_message: "Failed to retrieve Krathongs - Database query error",
    });
  }
};

module.exports = {
  createKrathong,
  getKrathongs,
};
