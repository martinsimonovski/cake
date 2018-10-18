import mongoose, { Schema } from 'mongoose';

const groupSchema = Schema({
    startDate: Date,
    endDate: Date,
    price: Number,
    personIds: Array,
    closed: Boolean
});

export default mongoose.model('group', groupSchema);