/*
I am creating a poject for an organisation called katalyst where there is an admin pannel and the main feature is the admins creates, modifies an event from admin panel and students can register for an event but student dont have any login they just land on the home page they see list of events that are created by admins and they can either be interested in an event then that creates a lead for  that event if they click on interested they have to provide an email and name which can be used for follow ups like sending email or they have an option for registering for an event where they will fill out all the details of them and then backend will check if their record is already in the student table if yeas they will just added to the registered table and if not the student record will be created and then registered record will be created and then email will be sent to him with his tracking id that is just id of the table registered with a qr code that is created with that id
here there are 4 tables student for students record, events for events details, leads for all the leads and registered for registered student for a perticular event 
now in admin admin will be able to see and modify all the events, create new events 
when a user registeres for an event he is his status is registered and when he goes to attend the event he will show the qr sent to him and then we will decrypt it back and use it to mark the status as attended from admin panel
admin will also be able to generte report for each event
he can also get the leads data in csv format for each event

this is the whole system 

now i want a function which will register a student with all his details to a registered table and but first check if he is alredy there in the student table with him email or create a record there and then here and after that generate a qr after from the id of that record in the registered and send and email 
*/

const { Events, Leads, Registered } = require('../models');
const {generateCSV} = require('../utils/util')


const getCompletedEvents = async(req,res) =>{
    try {
        const events = await Events.findAll({
            where: { status: 'Completed' },
            order: [['startDate', 'ASC'], ['startTime', 'ASC']]
        });
        res.status(200).json(events);
    }
    catch(error) {
        res.status(500).json({message:"Error in getting completed events", error:error.message});
    }
};


const getAllEvents = async (req,res) =>{
    try {
        const events = await Events.findAll({
            order: [['startDate', 'ASC'], ['startTime', 'ASC']]
        });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching all events", error: error.message });
    }
};


// const generateCsv = async (req, res) => {
//     try {
//       const { eventId } = req.params;
//       const filePath = await generateCSV(eventId);
  
//       // Send file for download
//       res.download(filePath, `event_${eventId}.csv`, (err) => {
//         if (err) {
//           console.error("Error downloading CSV:", err);
//           res.status(500).send("Error downloading file");
//         }
//       });
//     } catch (err) {
//       console.error("Error generating CSV:", err);
//       res.status(500).json({ error: err.message });
//     }
// }


const generateCsv = async (req, res) => {
    try {
        const { eventId } = req.params;
        console.log("Event ID:", eventId);

        const filePath = await generateCSV(eventId);
        console.log("Generated CSV file path:", filePath);

        // Ensure the file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at path: ${filePath}`);
        }

        // Send file for download
        const absoluteFilePath = path.resolve(filePath);
        res.download(absoluteFilePath, `event_${eventId}.csv`, (err) => {
            if (err) {
                console.error("Error downloading CSV:", err.message);
                return res.status(500).json({ error: "Error downloading file" });
            }
        });
    } catch (err) {
        console.error("Error generating CSV:", err.message);
        res.status(500).json({ error: err.message });
    }
};


const displayAllLeads = async (req,res) =>{
    try {
        const leads = await Leads.findAll();
        res.status(201).json(leads);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leads", error: error.message });
    }
};

const createEvent = async(req,res) =>{
    try {
        const {eventData} = req.body;
        const event = await Events.create(eventData);
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error: error.message });
    }
};

const markAttendance = async (req,res) =>{
    try {
       const { registrationId } = req.params;
       console.log(registrationId);
       const registration = await Registered.findByPk(registrationId);

       if (!registration) {
           return res.status(404).json({ message: "Registration not found" });
       }

       registration.status = "Attended";
       await registration.save();

       res.status(201).json({ message: "Attendance marked successfully", registration });
   } catch (error) {
       res.status(500).json({ message: "Error marking attendance", error: error.message });
   }
}


const updateEventDetails = async (req, res) => {
    try {
        const { registrationId } = req.params;
        const { startDate, endDate, startTime, endTime, status } = req.body;

        // Find the registration by ID
        const registration = await Registered.findByPk(registrationId);
        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        // Find the event using eventId from registration
        const event = await Events.findByPk(registration.eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Update only the provided fields
        if (startDate !== undefined) event.startDate = startDate;
        if (endDate !== undefined) event.endDate = endDate;
        if (startTime !== undefined) event.startTime = startTime;
        if (endTime !== undefined) event.endTime = endTime;
        if (status !== undefined) event.status = status;

        await event.save();

        res.status(200).json({ message: "Event updated successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error: error.message });
    }
};

module.exports = {
    generateCsv,
    createEvent,
    displayAllLeads,
    markAttendance,
    getCompletedEvents,
    getAllEvents,
    updateEventDetails
}