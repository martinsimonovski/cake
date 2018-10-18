import mongoose, { Schema } from 'mongoose';

const personSchema = Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    createdAt: { type: Date, required: true, default: Date.now }
});

export default mongoose.model('persons', personSchema);