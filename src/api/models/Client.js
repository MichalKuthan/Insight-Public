const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    role: { 
        type: String,
        enum: ['admin', 'client'], 
        default: 'client'
    }
});

// Hash password before saving the client
clientSchema.pre('save', function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) return next(err);
        // Replace the plain password with the hashed one
        this.password = hash;
        next();
    });
});

// Method to compare the password for login
clientSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
