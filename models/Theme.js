const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ThemeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    song: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = Theme = mongoose.model('theme', ThemeSchema);