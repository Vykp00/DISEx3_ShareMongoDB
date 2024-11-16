// import express = require('express');
import express, {Request, Response, NextFunction} from 'express';
import mongoose, {Schema, Document, Model} from 'mongoose';
import {physiotherapist_col, patient_col, appointment_col, program_col, IPatient} from "./schema";

const app = express();
const PORT = 3000


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
            return;
        }
        await mongoose.disconnect(); // Disconnect from any existing connection
        console.log(`Disconnected from ${currentDBName} databases`);
        // @ts-ignore
        await mongoose.connect(dbURIs[database], {dbName: database});
        console.log(`Connected to ${database} database!`);
    } catch (error) {
        console.error(`Error connecting to ${database} database:`, error);
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
// Run the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
