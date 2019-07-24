const mongoose = require('mongoose');
const {Schema} = mongoose;

const TablesSchema = new Schema(
  {
    idRestaurant: {
      type: Object,
      required: {}
    },
    tables: {
        type: Array, 
        default: []
    }
  },
  { collection: 'Tables' }
);

module.exports = mongoose.model('Tables', TablesSchema);
