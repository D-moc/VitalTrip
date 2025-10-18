const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password

}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }  

    const captain = captainModel({
        fullname: { firstname, lastname },
        email,
        password
    })          
    await captain.save();
    return captain;
}