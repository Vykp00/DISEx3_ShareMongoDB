/*  Seed  script that sets up the four collections with sample data in TypeScript */
import mongoose from "mongoose";
import {physiotherapist_col, patient_col, appointment_col, program_col, IPatient} from "./schema";


// MongoDB connection URI
const uri = process.env.NODE_MONGO_URI;
const k_uri = process.env.NODE_KARJAANI_MONGO_URI;
const m_uri = process.env.NODE_MUNICH_MONGO_URI;
const l_uri = process.env.NODE_LONDON_MONGO_URI;

interface PhysioObject {
    name: string;
    email: string;
    location: string;
    timezone: string;
    specialization: string;
}

interface PatientObject {
    name: string;
    birth_date: string;
    email: string;
    location: string;
    timezone: string;
    physiotherapist: string;
    program_id: string;
}

interface AppointmentObject {
    patient_id: string;
    physio_id: string;
    date: Date;
    time: string;
    note: string;
}

interface ProgramObject {
    _id?: mongoose.Types.ObjectId;
    program_name: string;
    category: string;
    description: string;
    repetitions: number;
    exercises: string[];
}

// Dummy Data
/*
=========================================================
                        KARJAANI
=========================================================
*/
const k_physiotherapists: PhysioObject[] = [
    {
        "name": "Emma Berg",
        "email": "emma.berg@example.se",
        "location": "Stockholm, Sweden",
        "timezone": "Europe/Stockholm",
        "specialization": "Sports Rehabilitation",
    },
    {
        "name": "Hans Olofsson",
        "email": "hans.olofsson@example.se",
        "location": "Gothenburg, Sweden",
        "timezone": "Europe/Stockholm",
        "specialization": "Orthopedic Therapy",
    },
    {
        "name": "Sanna Nielsen",
        "email": "sanna.nielsen@example.fi",
        "location": "Helsinki, Finland",
        "timezone": "Europe/Helsinki",
        "specialization": "Post-Surgery Recovery",
    },
    {
        "name": "Kari Järvinen",
        "email": "kari.jarvinen@example.fi",
        "location": "Tampere, Finland",
        "timezone": "Europe/Helsinki",
        "specialization": "Chronic Pain Management",
    },
    {
        "name": "Elias Andersson",
        "email": "elias.andersson@example.se",
        "location": "Malmo, Sweden",
        "timezone": "Europe/Stockholm",
        "specialization": "Geriatric Therapy",
    }
]

// Occupy physiotherapist and program_id in script
const k_patients: PatientObject[] = [
    {
        "name": "Lars Eriksson",
        "birth_date": "1990-05-15",
        "email": "lars.eriksson@example.se",
        "location": "Stockholm, Sweden",
        "timezone": "Europe/Stockholm",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Karin Svensson",
        "birth_date": "1985-09-21",
        "email": "karin.svensson@example.se",
        "location": "Stockholm, Sweden",
        "timezone": "Europe/Stockholm",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Markku Laine",
        "birth_date": "1982-03-12",
        "email": "markku.laine@example.fi",
        "location": "Helsinki, Finland",
        "timezone": "Europe/Helsinki",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Sofia Virtanen",
        "birth_date": "1995-06-07",
        "email": "sofia.virtanen@example.fi",
        "location": "Tampere, Finland",
        "timezone": "Europe/Helsinki",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Erik Johansson",
        "birth_date": "1988-04-22",
        "email": "erik.johansson@example.se",
        "location": "Malmo, Sweden",
        "timezone": "Europe/Stockholm",
        "physiotherapist": "",
        "program_id": ""
    }
]

const k_appointments: AppointmentObject[] = [
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-20T08:00:00Z"),
        "time": "08:00",
        "note": "Initial consultation for knee injury."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-21T10:00:00Z"),
        "time": "10:00",
        "note": "Follow-up session for shoulder rehabilitation."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-22T12:00:00Z"),
        "time": "12:00",
        "note": "Evaluation for post-surgery recovery."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-23T09:30:00Z"),
        "time": "09:30",
        "note": "Session for improving mobility after accident."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-24T15:00:00Z"),
        "time": "15:00",
        "note": "Routine check-up and therapy plan adjustment."
    }
]

/*
=========================================================
                        MUNICH
=========================================================
*/

const m_physiotherapists: PhysioObject[] = [
    {
        "name": "Hans Müller",
        "email": "hans.mueller@physio.de",
        "location": "Berlin, Germany",
        "timezone": "Europe/Berlin",
        "specialization": "Sports Therapy"
    },
    {
        "name": "Clara Schneider",
        "email": "clara.schneider@physio.de",
        "location": "Munich, Germany",
        "timezone": "Europe/Berlin",
        "specialization": "Orthopedic Therapy"
    },
    {
        "name": "Lukas Novak",
        "email": "lukas.novak@physio.cz",
        "location": "Prague, Czech Republic",
        "timezone": "Europe/Prague",
        "specialization": "Rehabilitation Therapy"
    },
    {
        "name": "Marta Kowalska",
        "email": "marta.kowalska@physio.pl",
        "location": "Warsaw, Poland",
        "timezone": "Europe/Warsaw",
        "specialization": "Neurological Therapy"
    },
    {
        "name": "Jakub Horváth",
        "email": "jakub.horvath@physio.sk",
        "location": "Bratislava, Slovakia",
        "timezone": "Europe/Bratislava",
        "specialization": "Pediatric Therapy"
    }
]

const m_patients: PatientObject[] = [
    {
        "name": "Greta Schmidt",
        "birth_date": "1988-05-10",
        "email": "greta.schmidt@example.com",
        "location": "Berlin, Germany",
        "timezone": "Europe/Berlin",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Markus Braun",
        "birth_date": "1975-12-15",
        "email": "markus.braun@example.com",
        "location": "Munich, Germany",
        "timezone": "Europe/Berlin",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Ivana Hlaváčová",
        "birth_date": "1990-03-25",
        "email": "ivana.hlavacova@example.com",
        "location": "Prague, Czech Republic",
        "timezone": "Europe/Prague",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Piotr Zielinski",
        "birth_date": "1982-08-19",
        "email": "piotr.zielinski@example.com",
        "location": "Warsaw, Poland",
        "timezone": "Europe/Warsaw",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Katarina Kovac",
        "birth_date": "1995-09-08",
        "email": "katarina.kovac@example.com",
        "location": "Bratislava, Slovakia",
        "timezone": "Europe/Bratislava",
        "physiotherapist": "",
        "program_id": ""
    }
]

const m_appointments: AppointmentObject[] = [
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-20T08:30:00Z"),
        "time": "08:30",
        "note": "Session to address post-run knee strain."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-21T14:00:00Z"),
        "time": "14:00",
        "note": "Check-up for lower back pain recovery."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-22T10:30:00Z"),
        "time": "10:30",
        "note": "Post-surgery progress review."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-23T13:00:00Z"),
        "time": "13:00",
        "note": "Mobility session after hip replacement."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-24T16:00:00Z"),
        "time": "16:00",
        "note": "Evaluation for chronic shoulder discomfort."
    }
]

/*
=========================================================
                        LONDON
=========================================================
*/
const l_physiotherapist: PhysioObject[] = [
    {
        "name": "Emily Taylor",
        "email": "emily.taylor@physio.uk",
        "location": "London, United Kingdom",
        "timezone": "Europe/London",
        "specialization": "Orthopedic Therapy"
    },
    {
        "name": "James O'Connor",
        "email": "james.oconnor@physio.ie",
        "location": "Dublin, Ireland",
        "timezone": "Europe/Dublin",
        "specialization": "Rehabilitation Therapy"
    },
    {
        "name": "Charlotte Wilson",
        "email": "charlotte.wilson@physio.uk",
        "location": "Manchester, United Kingdom",
        "timezone": "Europe/London",
        "specialization": "Sports Therapy"
    },
    {
        "name": "Liam Edwards",
        "email": "liam.edwards@physio.uk",
        "location": "Birmingham, United Kingdom",
        "timezone": "Europe/London",
        "specialization": "Neurological Therapy"
    },
    {
        "name": "Sophia Evans",
        "email": "sophia.evans@physio.uk",
        "location": "Edinburgh, Scotland",
        "timezone": "Europe/London",
        "specialization": "Pediatric Therapy"
    }
]

const l_patients: PatientObject[] = [
    {
        "name": "Oliver Johnson",
        "birth_date": "1990-01-12",
        "email": "oliver.johnson@example.com",
        "location": "London, United Kingdom",
        "timezone": "Europe/London",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Aoife Murphy",
        "birth_date": "1985-04-28",
        "email": "aoife.murphy@example.com",
        "location": "Dublin, Ireland",
        "timezone": "Europe/Dublin",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Harry Clarke",
        "birth_date": "1993-07-15",
        "email": "harry.clarke@example.com",
        "location": "Manchester, United Kingdom",
        "timezone": "Europe/London",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Amelia Brown",
        "birth_date": "1988-11-03",
        "email": "amelia.brown@example.com",
        "location": "Birmingham, United Kingdom",
        "timezone": "Europe/London",
        "physiotherapist": "",
        "program_id": ""
    },
    {
        "name": "Isla Campbell",
        "birth_date": "1995-05-21",
        "email": "isla.campbell@example.com",
        "location": "Edinburgh, Scotland",
        "timezone": "Europe/London",
        "physiotherapist": "",
        "program_id": ""
    }
]

const l_appointments: AppointmentObject[] = [
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-20T09:00:00Z"),
        "time": "09:00",
        "note": "Session to manage shoulder pain."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-21T15:30:00Z"),
        "time": "15:30",
        "note": "Review post-accident recovery progress."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-22T11:00:00Z"),
        "time": "11:00",
        "note": "Knee rehabilitation session."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-23T14:00:00Z"),
        "time": "14:00",
        "note": "Therapy for recurring migraines."
    },
    {
        "patient_id": "",
        "physio_id": "",
        "date": new Date("2024-11-24T10:30:00Z"),
        "time": "10:30",
        "note": "Initial consultation for child mobility issues."
    }
]


// Program data is replicated across databases
const rep_programs: ProgramObject[] = [
    {   "_id": new mongoose.Types.ObjectId('67389a22afac655db35cd05b'),
        "program_name": "Knee Rehabilitation",
        "category": "Rehabilitation",
        "description": "Exercises to improve knee mobility and strength.",
        "repetitions": 3,
        "exercises": ["Squats", "Lunges", "Leg Press"]
    },
    {
        "_id": new mongoose.Types.ObjectId('67389a22afac655db35cd05c'),
        "program_name": "Shoulder Recovery",
        "category": "Orthopedic",
        "description": "Therapy for regaining shoulder movement.",
        "repetitions": 2,
        "exercises": ["Shoulder Rolls", "Pendulum Swings", "Arm Raises"]
    },
    {
        "_id": new mongoose.Types.ObjectId('67389a22afac655db35cd05d'),
        "program_name": "Post-Surgery Therapy",
        "category": "Rehabilitation",
        "description": "Customized plan for surgery recovery.",
        "repetitions": 4,
        "exercises": ["Stretching", "Walking", "Balance Training"]
    },
    {
        "_id": new mongoose.Types.ObjectId('67389a22afac655db35cd05e'),
        "program_name": "Mobility Restoration",
        "category": "Neurological",
        "description": "Sessions to enhance coordination and movement.",
        "repetitions": 5,
        "exercises": ["Step Training", "Balance Board", "Core Strength"]
    },
    {
        "_id": new mongoose.Types.ObjectId('67389a22afac655db35cd05f'),
        "program_name": "General Therapy",
        "category": "Pediatrics",
        "description": "Basic exercises for improving body alignment.",
        "repetitions": 3,
        "exercises": ["Basic Yoga", "Jumping Jacks", "Skipping"]
    }
]


// Occupy database
async function seedDatabase(uri: string | undefined, database: string,
                            physio_data: PhysioObject[], program_data: ProgramObject[],
                            patient_data: PatientObject[], appointment_data: AppointmentObject[]) {
    try {
        // Check if the URI is defined and not empty
        if (!uri || uri.trim() === '') {
            console.error("MongoDB URI is not defined or is empty. Please check your environment variables.");
            process.exit(1); // Exit the process with error code
        } else {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            await mongoose.connect(uri, {dbName: database});
            // @ts-ignore
            await mongoose.connection.db.admin().command({ping: 1});
            console.log("Pinged your deployment. You successfully connected to MongoDB!");

            // Clear existing collections
            await physiotherapist_col.deleteMany({});
            await program_col.deleteMany({});
            await patient_col.deleteMany({});
            await appointment_col.deleteMany({});

            // Insert physiotherapists and programs
            const insertedPhysiotherapists = await physiotherapist_col.insertMany(physio_data);
            console.log('Inserted physiotherapists:', insertedPhysiotherapists);

            const insertedPrograms = await program_col.insertMany(program_data);
            console.log('Inserted programs:', insertedPrograms);

            patient_data.forEach((patient: PatientObject, index: number) => {
                // @ts-ignore
                patient.physiotherapist = insertedPhysiotherapists[index % insertedPhysiotherapists.length]._id.toString();
                // @ts-ignore
                patient.program_id = insertedPrograms[index % insertedPrograms.length]._id.toString();
            });

            const insertedPatients = await patient_col.insertMany(patient_data);
            console.log('Inserted patient:', insertedPatients);

            // Assign patient and physiotherapist IDs to appointments
            appointment_data.forEach((appointment: AppointmentObject, index: number) => {
                // @ts-ignore
                appointment.patient_id = insertedPatients[index % insertedPatients.length]._id.toString();
                // @ts-ignore
                appointment.physio_id = insertedPhysiotherapists[index % insertedPhysiotherapists.length]._id.toString();
            });

            const insertedAppointments = await appointment_col.insertMany(appointment_data);
            console.log('Inserted appointments:', insertedAppointments);
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Ensure the connection is closed even if there's an error
        await mongoose.disconnect();
        console.log('Database connection closed.');
    }
}

// Run the seeding function
// seedDatabase(k_uri, 'karjaani', k_physiotherapists, rep_programs, k_patients, k_appointments);
// seedDatabase(m_uri, 'munich', m_physiotherapists, rep_programs, m_patients, m_appointments);
// seedDatabase(l_uri, 'london', l_physiotherapist, rep_programs, l_patients, l_appointments);
