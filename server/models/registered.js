const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Registered = sequelize.define('Registered', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("Registered", "Attending", "Attended", "Withdraw", "Cancelled", "Not Attending"),
    defaultValue: "Registered"
  },
}, {
  tableName: 'registered',
  timestamps: true, 
});

module.exports = Registered;
