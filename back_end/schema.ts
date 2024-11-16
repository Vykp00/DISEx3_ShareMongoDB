/* Declare Data schema */
import {Schema, Document, model, Model } from 'mongoose';

// Define interfaces for each schema
export interface IPhysiotherapist extends Document {
    name: string;
    email: string;
    location: string;
    timezone: string;
    specialization: string;
}

export interface IPatient extends Document {
    name: string;
    birth_date: string;
    email: string;
    location: string;
    timezone: string;
    physiotherapist: string;
    program_id: string;
}

export interface IAppointment extends Document {
    patient_id: string;
    physio_id: string;
    date: Date;
    time: string;
    note: string;
}

export interface IProgram extends Document {
    program_name: string;
    category: string;
    description: string;
    repetitions: number;
    exercises: string[];
}

// Define Mongoose schemas
const PhysiotherapistSchema = new Schema<IPhysiotherapist>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    location: {type: String, required: true},
    timezone: {type: String, required: true},
    specialization: {type: String, required: true},
});

const PatientSchema = new Schema<IPatient>({
    name: {type: String, required: true},
    birth_date: {type: String, required: true},
    email: {type: String, required: true},
    location: {type: String, required: true},
    timezone: {type: String, required: true},
    physiotherapist: {type: String, required: true},
    program_id: {type: String, required: true},
});

const AppointmentSchema = new Schema<IAppointment>({
    patient_id: {type: String, required: true},
    physio_id: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    note: {type: String, required: true},
});

const ProgramSchema = new Schema<IProgram>({
    program_name: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    repetitions: {type: Number, required: true},
    exercises: {type: [String], required: true},
});


// Create and export models
export const physiotherapist_col: Model<IPhysiotherapist> = model<IPhysiotherapist>(
    'physiotherapist',
    PhysiotherapistSchema
);
export const patient_col: Model<IPatient> = model<IPatient>(
    'patient',
    PatientSchema
);
export const appointment_col: Model<IAppointment> = model<IAppointment>(
    'appointment',
    AppointmentSchema
);
export const program_col: Model<IProgram> = model<IProgram>(
    'program',
    ProgramSchema
);
