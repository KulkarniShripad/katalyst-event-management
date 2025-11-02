const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');

router.get("/download-csv/:eventId", adminController.generateCsv);
router.get('/displayAllLeads', adminController.displayAllLeads);
router.post('/createEvent', adminController.createEvent);
router.post('/markAttendance/:registrationId', adminController.markAttendance);
router.get('/getAllEvents', adminController.getAllEvents);
router.get('/getCompletedEvents', adminController.getCompletedEvents);

module.exports = router;