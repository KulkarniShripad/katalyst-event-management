const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { syncDB } = require('./models'); // Sync Sequelize models

const studentRoutes = require('./routes/student_routes')
const adminRoutes = require('./routes/admin_routes')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);

syncDB(); // Syncs all models with DB

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
