const mongoose = require('mongoose');
const {Schema} = mongoose;

const OffersSchema = new Schema(
  {
    imgUrl: {
      type: String,
      required: 'image cannot be blank'
    },
    title: {
        type: String, 
        default: 'Discount!'
    },
    summary: {
      type: String,
      default: ''
    },
    details: {
        type: String, 
        default: ''
    }
  },
  { collection: 'specialOffers' }
);

module.exports = mongoose.model('specialOffers', OffersSchema);