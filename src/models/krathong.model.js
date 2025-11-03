const { DataTypes } = require("sequelize");
const { getSequelize } = require("../config/database");

const sequelize = getSequelize();

if (!sequelize) {
  throw new Error(
    "Sequelize instance is not initialized. Make sure connectDatabase() is called before importing models."
  );
}

const Krathong = sequelize.define(
  "Krathong",
  {
    krathong_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emp_wish: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "krathongs",
    timestamps: false,
  }
);

module.exports = Krathong;
