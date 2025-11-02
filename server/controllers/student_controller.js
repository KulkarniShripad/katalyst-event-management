
const Student = require("../models/student");
const Registered = require("../models/registered");
const { Events, Leads } = require("../models");
const { sendRegistrationEmailAndQR } = require("../utils/util");
// const sendEmail = require("../helpers/sendEmail"); // your helper

const registerStudent = async (req, res) => {
    // {
    //     "eventId": "uuid-of-event",
    //     "studentData": {
    //       "name": "John Doe",
    //       "email": "john@example.com",
    //       "phone": "9876543210",
    //       "college": "COEP",
    //       "field": "CS",
    //       "income": "Medium",
    //       "year": 3,
    //       "gender": "M"
    //     }
    //   }
  try {
    const { studentData, eventId } = req.body;

    if (!studentData || !studentData.email || !eventId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1. Check if student already exists
    let student = await Student.findOne({ where: { email: studentData.email } });

    if (!student) {
      student = await Student.create(studentData);
    }

    // 2. Create Registered record
    const registered = await Registered.create({
      eventId,
      studentId: student.id,
      status: "Registered",
    });


    await sendRegistrationEmailAndQR(registered.id);
    // 3. Generate QR from registered.id
    // const qrData = registered.id; // 🔐 optional: encrypt
    // const qrImage = await QRCode.toDataURL(qrData);

    // // 4. Use your helper function to send email
    // await sendEmail(student.email, {
    //   subject: "Registration Confirmation - Katalyst Event",
    //   name: student.name,
    //   registeredId: registered.id,
    //   qrImage,
    // });

    return res.status(201).json({
      success: true,
      message: "Student registered successfully and email sent",
      registeredId: registered.id,
    });
  } catch (err) {
    console.error("Error in registerStudent:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getUpcomingEvents = async (req,res) =>{
    try {
       const events = await Events.findAll({
           where: { status: 'Upcoming' },
           order: [['startDate', 'ASC'], ['startTime', 'ASC']]
       });
       res.status(200).json(events);
   } catch (error) {
       res.status(500).json({ message: 'Error fetching upcoming events', error: error.message });
   }
};

const getEventDetails = async(req,res) =>{
    try {
       const { registrationId } = req.params;
       console.log(registrationId)
       const registration = await Registered.findByPk( registrationId, {
           include: [Events]
       });

       if (!registration) {
           return res.status(404).json({ message: "Registration not found" });
       }

       res.status(201).json(registration);
   } catch (error) {
       res.status(500).json({ message: "Error fetching event details", error: error.message });
   }
};

const addLeads = async (req,res) =>{
    try {
         const leadData = req.body;
         //console.log(leadData)
         const lead = await Leads.create(leadData);
         res.status(201).json({ message: "Lead added successfully", lead });
     } catch (error) {
         res.status(500).json({ message: "Error adding the lead", error: error.message });
     }
}

module.exports = { 
    registerStudent,
    getUpcomingEvents,
    getEventDetails,
    addLeads
};
