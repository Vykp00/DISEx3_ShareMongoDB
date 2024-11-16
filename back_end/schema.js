"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.program_col = exports.appointment_col = exports.patient_col = exports.physiotherapist_col = void 0;
/* Declare Data schema */
const mongoose_1 = require("mongoose");
// Define Mongoose schemas
const PhysiotherapistSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    timezone: { type: String, required: true },
    specialization: { type: String, required: true },
});
const PatientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    birth_date: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    timezone: { type: String, required: true },
    physiotherapist: { type: String, required: true },
    program_id: { type: String, required: true },
});
const AppointmentSchema = new mongoose_1.Schema({
    patient_id: { type: String, required: true },
    physio_id: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    note: { type: String, required: true },
});
const ProgramSchema = new mongoose_1.Schema({
    program_name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    repetitions: { type: Number, required: true },
    exercises: { type: [String], required: true },
});
// Create and export models
exports.physiotherapist_col = (0, mongoose_1.model)('physiotherapist', PhysiotherapistSchema);
exports.patient_col = (0, mongoose_1.model)('patient', PatientSchema);
exports.appointment_col = (0, mongoose_1.model)('appointment', AppointmentSchema);
exports.program_col = (0, mongoose_1.model)('program', ProgramSchema);
