const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller')

router.post('/register', studentController.registerStudent);
router.get('/getAllEvents', studentController.getUpcomingEvents);
router.get('/getSpecificEvent/:registrationId', studentController.getEventDetails)
router.post('/addLead', studentController.addLeads);


module.exports = router;