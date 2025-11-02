const sequelize = require('../config/db');
const Student = require('./student');
const Events = require('./event');
const Registered = require('./registered');
const Leads = require('./leads');

// Define associations if needed (example):
// User.hasMany(Event); // if user creates events
// Event.belongsTo(User);

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // or { force: true } for dev reset
    console.log("✅ All models synced successfully.");
  } catch (error) {
    console.error("❌ Error syncing models:", error);
  }
};

//associate users and events registered and completed by them
Student.hasMany(Registered, { foreignKey: 'studentId' });
Registered.belongsTo(Student, { foreignKey: 'studentId' });

//associate events with users that are registered to it
Events.hasMany(Registered, { foreignKey: 'eventId' });
Registered.belongsTo(Events, { foreignKey: 'eventId' });

// for help section to associate users and help created by them 
Events.hasMany(Leads, { foreignKey: 'eventId' });
Leads.belongsTo(Events, { foreignKey: 'eventId' });


module.exports = {
  sequelize,
  Student,
  Events,
  Registered,
  Leads,
  syncDB,
};
