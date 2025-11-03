const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Krathong = sequelize.define(
  "Krathong",
  {
    krathong_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "krathong_id",
    },
    krathong_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "krathong_type",
    },
    emp_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "emp_name",
    },
    emp_department: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "emp_department",
    },
    emp_wish: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "emp_wish",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "krathongs",
    timestamps: false,
  }
);

module.exports = Krathong;
