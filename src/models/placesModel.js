const mongoose = require('mongoose');
const {Schema} = mongoose;

const PlaceSchema = new Schema(
    {
        name: {
            type: String,
            required: 'location must be'
        },
        location: {
            type: String,
            required: 'location must be'
        },
        workingHours: {
            type: String,
            required: 'have to type working hours for example 8am-10pm'
        },
        imageSrc: {
            type: String,
            required: 'image cannot be blank'
        }
    },
    { collection: 'places' }
);

module.exports = mongoose.model('Place', PlaceSchema);