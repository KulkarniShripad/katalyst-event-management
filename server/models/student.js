const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * User Model Definition
 *
 * This model defines the schema for the 'users' table in the database.
 * It includes fields for user details, credentials, and the newly added
 * virtualId and interests fields.
 */
const Student = sequelize.define('Student', {
  // Standard UUID for the primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  college: {
    type: DataTypes.STRING,
  },
  field: {
    type: DataTypes.STRING,
  },
  income: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.ENUM("M", "F"),
    defaultValue : "F",
  }
}, {
  tableName: 'students',
  timestamps: false, 
});

module.exports = Student;
