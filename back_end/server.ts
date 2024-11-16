// import express = require('express');
import express, { Request, Response } from 'express';
import {physiotherapist_col, patient_col, appointment_col, program_col, IPatient} from "./schema";

const app = express();
const PORT = 3000

/*  END POINT FUNCTION*/
app.get('/', async (req: Request, res: Response) => {
    res.json("Hello World!");
});



// Run the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
