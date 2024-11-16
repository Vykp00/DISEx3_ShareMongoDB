// import express = require('express');
import express, {Request, Response, NextFunction} from 'express';
import mongoose, {Schema, Document, Model} from 'mongoose';
import {physiotherapist_col, patient_col, appointment_col, program_col, IPatient} from "./schema";
import cors from 'cors';

const app = express();
const PORT = 3000

const corsOptions = {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"],
};

// Enable CORS
app.use(cors(corsOptions));

// MongoDB connection URIs for each database in the Atlas cluster
const dbURIs: Record<string, string> = {
    karjaani: process.env.NODE_KARJAANI_MONGO_URI || '',
    london: process.env.NODE_LONDON_MONGO_URI || '',
    munich: process.env.NODE_MUNICH_MONGO_URI || '',
};

//Function to dynamically connect to the correct database
async function connectToDB(database: string) {
    try {
        // @ts-ignore
        if (!dbURIs[database] || dbURIs[database].trim() === '') {
            throw new Error(`Unknown database: ${database}`);
        }
        // @ts-ignore
        const currentDBName: string = mongoose.connection.name
        console.log(`Currently connected to MongoDB: ${currentDBName}`);
        if (mongoose.connection.readyState === 1 && currentDBName == database) {
            // Already connected to the same database
            return currentDBName;
        }
        await mongoose.disconnect(); // Disconnect from any existing connection
        console.log(`Disconnected from ${currentDBName} databases`);
        // @ts-ignore
        await mongoose.connect(dbURIs[database], {dbName: database});
        console.log(`Connected to ${database} database!`);

        return currentDBName;
    } catch (error) {
        console.error(`Error connecting to ${database} database:`, error);
        return null;
    }
}


// Middleware to handle errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({error: err.message});
});

/*  END POINT FUNCTION*/
app.get('/', async (req: Request, res: Response) => {
    res.json("Hello World!");
});


// Route to fetch patients by location
// @ts-ignore
app.get('/patients', async (req: Request, res: Response) => {
    const location = req.query.location as string;

    if (!location) {
        return res.status(400).send({error: 'Location query parameter is required.'});
    }

    try {
        // Determine which database to use based on location
        const database = location.toLowerCase();

        if (!dbURIs[database]) {
            return res.status(400).send({error: `Invalid location: ${location}`});
        }

        await connectToDB(database);
        // Do not send back unique object id
        const projection = {
            '_id': 0,
            '__v': 0,
        }
        // Fetch patients from the correct database
        const patients = await patient_col.find({}, projection).exec();

        res.json(patients);
    } catch (error) {
        res.status(500).send({error: `Error fetching patients ${error}`});
    }
});


// @ts-ignore
app.get('/physiotherapists', async (req: Request, res: Response) => {
    const location = req.query.location as string;

    if (!location) {
        return res.status(400).send({error: 'Location query parameter is required.'});
    }
    try {
        // Determine which database to use based on location
        const database = location.toLowerCase();

        if (!dbURIs[database]) {
            return res.status(400).send({error: `Invalid location: ${location}`});
        }

        await connectToDB(database);
        // Do not send back unique object id
        const projection = {
            '_id': 0,
            '__v': 0,
        }

        const physiotherapists = await physiotherapist_col.find({}, projection).exec();

        res.json(physiotherapists);
    } catch (error) {
        res.status(500).send({error: `Error fetching physiotherapists ${error}`});
    }
});


// @ts-ignore
app.get('/appointments', async (req: Request, res: Response) => {
    const location = req.query.location as string;

    if (!location) {
        return res.status(400).send({error: 'Location query parameter is required.'});
    }
    try {
        // Determine which database to use based on location
        const database = location.toLowerCase();

        if (!dbURIs[database]) {
            return res.status(400).send({error: `Invalid location: ${location}`});
        }

        await connectToDB(database);
        // Do not send back unique object id
        const projection = {
            '_id': 0,
            '__v': 0,
        }

        const appointments = await appointment_col.find({}, projection).exec();

        res.json(appointments);
    } catch (error) {
        res.status(500).send({error: `Error fetching physiotherapists ${error}`});
    }
});

// @ts-ignore
app.get('/programs', async (req: Request, res: Response) => {
    // Because program collection is replicated across db so we can connect to any db
    // At this moment, we used a priority order,
    // In production, we use a traffic monitoring tool to find the least busy database to connect
     const dbOrder : string[] =  ['karjaani', 'london', 'munich'];

     let connectedDB : string | null = null;
    // Attempt to connect to each database in order of the least traffic
    for (const dbName of dbOrder) {
        connectedDB = await connectToDB(dbName);
        if (connectedDB) {
            console.log(`Successfully connected to database: ${connectedDB}`);
            break;
        }
    }
    // if all database failed, then return error
    if (!connectedDB) {
        return res.status(500).send({ error: 'Internal Server Error. Failed to connect to any database.' });
    }

    try {
        // now fetch program
        // Do not send back unique object id
        const projection = {
            '_id': 0,
            '__v': 0,
        }
        const programs = await program_col.find({}, projection).exec();
        res.json(programs);
    } catch (error) {
        res.status(500).send({error: `Error fetching programs ${error}`});
    }
});


// Run the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
