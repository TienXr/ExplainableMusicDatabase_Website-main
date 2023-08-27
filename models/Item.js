const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Array,
        required: true,
        default: []
    },
    location: {
        type: String,
        default: ""
    },
    location2: {
        type: String,
        default: ""
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);