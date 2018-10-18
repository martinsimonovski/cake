import mongoose, { Schema } from 'mongoose';

const groupSchema = Schema({
    startDate: Date,
    endDate: Date,
    price: Number,
    birthdayIds: Array,
    closed: Boolean,
    payedIds: Array,
    createdAt: { type: Date, required: true, default: Date.now }
});

export default mongoose.model('group', groupSchema);