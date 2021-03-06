import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
    username: { type: String, unique: true, lowercase: true },
    password: String,
    createdAt: { type: Date, required: true, default: Date.now }
});

userSchema.pre('save', function (next) {
    // get access to the user model
    const user = this;

    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err); }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }

            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        })
    });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
};

export default mongoose.model('user', userSchema);