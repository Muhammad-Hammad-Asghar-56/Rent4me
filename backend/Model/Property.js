const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    buyDate: { type: String }, // Consider changing to Date type
    lastServiceDate: { type: Date, default: null },
    upcomingServiceDate: { type: Date,  default: null }
});

const propertySchema = new mongoose.Schema({
    propertyName: { type: String, required: true },
    address: { type: String, required: true },
    objects: [objectSchema]
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;