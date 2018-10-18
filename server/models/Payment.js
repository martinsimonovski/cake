import mongoose, { Schema } from 'mongoose';

const paymentSchema = Schema({
    groupId: String,
    personIds: Array
});

export default mongoose.model('person', paymentSchema);