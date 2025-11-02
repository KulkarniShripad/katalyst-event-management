const sgMail = require("@sendgrid/mail");
const path = require('path');
const fsa = require('fs');
const QRCode = require("qrcode");
const qrImage = require("qr-image");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { Registered, Student, Events, Leads } = require("../models");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendRegistrationEmailAndQR(registrationId) {
    try {
      // 1. Fetch registration with Student and Event
      const registration = await Registered.findOne({
        where: { id: registrationId },
        include: [
          { model: Student, attributes: ["id", "name", "email"] },
          { model: Events, attributes: ["id", "title", "description"] },
        ],
      });
  
      if (!registration) {
        throw new Error(`Registration with id=${registrationId} not found`);
      }
  
      const student = registration.Student;
      const event = registration.Event;
  
      // 2. Build QR payload
      const payload = {
        registration_id: registration.id,
      };
  
      // 3. Generate QR PNG buffer
      const dataUrl = await QRCode.toDataURL(JSON.stringify(payload));
      const qrPng = qrImage.imageSync(dataUrl, { type: "png" });
  
      // 4. Compose email
      const subject = `Your QR Code for ${event.title}`;
      const message = `Hello ${student.name},\n\nHere is your QR code for ${event.title}.\n\n${event.description}\n\n`;
  
      const msg = {
        to: student.email,
        from: "shrikulkarni2205@gmail.com", // must be verified with SendGrid
        subject,
        text: message,
        html: `<h2>${subject}</h2><p>${event.description}</p>`,
        attachments: [
          {
            content: qrPng.toString("base64"),
            filename: `${event.title}_QR.png`,
            type: "image/png",
            disposition: "attachment",
          },
        ],
      };
  
      // 5. Send email
      const response = await sgMail.send(msg);
      console.log(`Email sent to ${student.email}`);
      console.log("Status:", response[0].statusCode);
    } catch (error) {
      console.error("Error sending registration email & QR:", error);
    }
  }
  

const generateCSV = async (eventId) => {
    const leads = await Leads.findAll({
        where: { eventId: eventId }
    });
    if (!leads || leads.length === 0) {
        throw new Error("No leads found for this event");
    }
    
    // Format records for CSV
    const records = leads.map((lead) => ({
        lead_id: lead.id,
        student_name: lead.name,
        student_email: lead.email,
        event_id: lead.event_id,
    }));
    
    // Set file path dynamically
    const filePath = path.join(__dirname, `../public/event_${eventId}.csv`);
    
    // Ensure exports folder exists
    if (!fsa.existsSync(path.join(__dirname, "../exports"))) {
        fsa.mkdirSync(path.join(__dirname, "../exports"));
    }
    
    // CSV writer
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            { id: "lead_id", title: "Lead ID" },
            { id: "student_name", title: "Student Name" },
            { id: "student_email", title: "Student Email" },
            { id: "event_id", title: "Event ID" },
        ],
    });
    
    await csvWriter.writeRecords(records);
    return filePath;
};


module.exports = {
    generateCSV,
    sendRegistrationEmailAndQR
}