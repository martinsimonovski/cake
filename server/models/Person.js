import mongoose, { Schema } from 'mongoose';

const personSchema = Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date
});

export default mongoose.model('person', personSchema);