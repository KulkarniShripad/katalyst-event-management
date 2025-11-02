const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Leads = sequelize.define('Leads', {
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
  eventId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'leads',
  timestamps: true, 
});

module.exports = Leads;
