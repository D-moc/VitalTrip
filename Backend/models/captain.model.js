const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {   
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match : [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    password: {
        type: String,
        required: true,
        select : false
    }  
});

captainSchema.methods.generateAuthToken = function() {
    const token =   jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}   

captainSchema.methods.comparePassword = async function(Password) {
    return await bcrypt.compare(Password, this.password);
}
captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;