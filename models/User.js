const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 
const validator = require('validator');

// Create Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// static signup method
UserSchema.statics.signup = async function(email, password) {
    // validation 
    if (!email || !password) {
        throw Error('All feilds must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ email }) // "this" can only be used in regular function but not arrow function

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    return user;
}

// static login method
UserSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All Field must be filled')
    }

    const user = await this.findOne({ email }) // "this" can only be used in regular function but not arrow function

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user;
}

module.exports = User = mongoose.model('user', UserSchema);