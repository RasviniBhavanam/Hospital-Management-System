const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital')
  .then(() => {
    console.log('MongoDB database connection established successfully');
    seedDatabase();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const seedDatabase = async () => {
  try {
    // Clear existing data (optional)
    console.log('Clearing existing data...');
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    console.log('Existing data cleared.');

    // Insert Doctors
    console.log('Inserting doctors...');
    const doctors = await Doctor.insertMany([
      { name: "Dr. Sarah Johnson", specialty: "Cardiology" },
      { name: "Dr. Michael Chen", specialty: "Neurology" },
      { name: "Dr. Emily Williams", specialty: "Pediatrics" },
      { name: "Dr. James Anderson", specialty: "Orthopedics" },
      { name: "Dr. Lisa Martinez", specialty: "Dermatology" },
      { name: "Dr. Robert Taylor", specialty: "Oncology" },
      { name: "Dr. Amanda Brown", specialty: "Psychiatry" },
      { name: "Dr. David Lee", specialty: "General Surgery" },
      { name: "Dr. Jennifer Wilson", specialty: "Ophthalmology" },
      { name: "Dr. Christopher Moore", specialty: "ENT" }
    ]);
    console.log(`${doctors.length} doctors inserted.`);

    // Insert Patients
    console.log('Inserting patients...');
    const patients = await Patient.insertMany([
      { name: "John Smith", age: 45, gender: "Male" },
      { name: "Emma Davis", age: 32, gender: "Female" },
      { name: "Michael Wilson", age: 58, gender: "Male" },
      { name: "Sophia Garcia", age: 27, gender: "Female" },
      { name: "William Martinez", age: 41, gender: "Male" },
      { name: "Olivia Rodriguez", age: 35, gender: "Female" },
      { name: "James Thompson", age: 52, gender: "Male" },
      { name: "Isabella White", age: 29, gender: "Female" },
      { name: "Benjamin Harris", age: 48, gender: "Male" },
      { name: "Mia Clark", age: 38, gender: "Female" },
      { name: "Alexander Lewis", age: 55, gender: "Male" },
      { name: "Charlotte Walker", age: 33, gender: "Female" }
    ]);
    console.log(`${patients.length} patients inserted.`);

    // Insert Appointments
    console.log('Inserting appointments...');
    const appointments = await Appointment.insertMany([
      { patientName: "John Smith", doctorName: "Dr. Sarah Johnson", date: new Date("2025-11-05") },
      { patientName: "Emma Davis", doctorName: "Dr. Michael Chen", date: new Date("2025-11-06") },
      { patientName: "Michael Wilson", doctorName: "Dr. Emily Williams", date: new Date("2025-11-07") },
      { patientName: "Sophia Garcia", doctorName: "Dr. James Anderson", date: new Date("2025-11-08") },
      { patientName: "William Martinez", doctorName: "Dr. Lisa Martinez", date: new Date("2025-11-09") },
      { patientName: "Olivia Rodriguez", doctorName: "Dr. Robert Taylor", date: new Date("2025-11-10") },
      { patientName: "James Thompson", doctorName: "Dr. Amanda Brown", date: new Date("2025-11-11") },
      { patientName: "Isabella White", doctorName: "Dr. David Lee", date: new Date("2025-11-12") },
      { patientName: "Benjamin Harris", doctorName: "Dr. Sarah Johnson", date: new Date("2025-11-13") },
      { patientName: "Mia Clark", doctorName: "Dr. Michael Chen", date: new Date("2025-11-14") },
      { patientName: "Alexander Lewis", doctorName: "Dr. Jennifer Wilson", date: new Date("2025-11-15") },
      { patientName: "Charlotte Walker", doctorName: "Dr. Christopher Moore", date: new Date("2025-11-16") },
      { patientName: "John Smith", doctorName: "Dr. Emily Williams", date: new Date("2025-11-18") },
      { patientName: "Emma Davis", doctorName: "Dr. James Anderson", date: new Date("2025-11-19") }
    ]);
    console.log(`${appointments.length} appointments inserted.`);

    console.log('\n✅ Database seeded successfully!');
    console.log(`\nSummary:`);
    console.log(`- Doctors: ${doctors.length}`);
    console.log(`- Patients: ${patients.length}`);
    console.log(`- Appointments: ${appointments.length}`);
    
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};