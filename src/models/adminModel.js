const mongoose = require('mongoose');
const {Schema} = mongoose;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: 'field has to be filled'
    },
    password: {
        type: String,
        required: 'field has to be filled'
    }
}, {collection: 'admin'});

module.exports = mongoose.model('Admin', AdminSchema);