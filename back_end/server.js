"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express = require('express');
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
const corsOptions = {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"],
};
// Enable CORS
app.use((0, cors_1.default)(corsOptions));
// MongoDB connection URIs for each database in the Atlas cluster
const dbURIs = {
    karjaani: process.env.NODE_KARJAANI_MONGO_URI || '',
    london: process.env.NODE_LONDON_MONGO_URI || '',
    munich: process.env.NODE_MUNICH_MONGO_URI || '',
};
//Function to dynamically connect to the correct database
function connectToDB(database) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // @ts-ignore
            if (!dbURIs[database] || dbURIs[database].trim() === '') {
                throw new Error(`Unknown database: ${database}`);
            }
            // @ts-ignore
            const currentDBName = mongoose_1.default.connection.name;
            console.log(`Currently connected to MongoDB: ${currentDBName}`);
            if (mongoose_1.default.connection.readyState === 1 && currentDBName == database) {
                // Already connected to the same database
                return currentDBName;
            }
            yield mongoose_1.default.disconnect(); // Disconnect from any existing connection
            console.log(`Disconnected from ${currentDBName} databases`);
            // @ts-ignore
            yield mongoose_1.default.connect(dbURIs[database], { dbName: database });
            console.log(`Connected to ${database} database!`);
            return currentDBName;
        }
        catch (error) {
            console.error(`Error connecting to ${database} database:`, error);
            return null;
        }
    });
}
// Middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
});
/*  END POINT FUNCTION*/
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("Hello World!");
}));
// Route to fetch patients by location
// @ts-ignore
app.get('/patients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.query.location;
    if (!location) {
        return res.status(400).send({ error: 'Location query parameter is required.' });
    }
    try {
        // Determine which database to use based on location
        const database = location.toLowerCase();
        if (!dbURIs[database]) {
            return res.status(400).send({ error: `Invalid location: ${location}` });
        }
        yield connectToDB(database);
        // Do not send back unique object id
        const projection = {
            '_id': 0,
            '__v': 0,
        };
        // Fetch patients from the correct database
        const patients = yield schema_1.patient_col.find({}, projection).exec();
        res.json(patients);
    }
    catch (error) {
        res.status(500).send({ error: `Error fetching patients ${error}` });
    }
}));
// @ts-ignore
app.get('/physiotherapists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.query.location;
    if (!location) {
        return res.status(400).send({ error: 'Location query parameter is required.' });
    }
    try {
        // Determine which database to use based on location
        const database = location.toLowerCase();
        if (!dbURIs[database]) {
            return res.status(400).send({ error: `Invalid location: ${location}` });
        }
        yield connectToDB(database);
        // Do not send back unique object id
        const projection = {
            '_id': 0,
            '__v': 0,
        };
        const physiotherapists = yield schema_1.physiotherapist_col.find({}, projection).exec();
        res.json(physiotherapists);
    }
    catch (error) {
        res.status(500).send({ error: `Error fetching physiotherapists ${error}` });
    }
}));
// @ts-ignore
app.get('/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.query.location;
    if (!location) {
        return res.status(400).send({ error: 'Location query parameter is required.' });
    }
    try {
        // Determine which database to use based on location
        const database = location.toLowerCase();
        if (!dbURIs[database]) {
            return res.status(400).send({ error: `Invalid location: ${location}` });
        }
        yield connectToDB(database);
        // Do not send back unique object id
        const projection = {
            '_id': 0,
            '__v': 0,
        };
        const appointments = yield schema_1.appointment_col.find({}, projection).exec();
        res.json(appointments);
    }
    catch (error) {
        res.status(500).send({ error: `Error fetching physiotherapists ${error}` });
    }
}));
// @ts-ignore
app.get('/programs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Because program collection is replicated across db so we can connect to any db
    // At this moment, we used a priority order,
    // In production, we use a traffic monitoring tool to find the least busy database to connect
    const dbOrder = ['karjaani', 'london', 'munich'];
    let connectedDB = null;
    // Attempt to connect to each database in order of the least traffic
    for (const dbName of dbOrder) {
        connectedDB = yield connectToDB(dbName);
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
        };
        const programs = yield schema_1.program_col.find({}, projection).exec();
        res.json(programs);
    }
    catch (error) {
        res.status(500).send({ error: `Error fetching programs ${error}` });
    }
}));
// Run the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
