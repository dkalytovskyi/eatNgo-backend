const mongoose = require('mongoose');
const {Schema} = mongoose;

const DishesSchema = new Schema(
  {
    name: {
      type: String,
      required: 'name cannot be blank'
    },
    ingradients: {
        type: Array, 
        default: []
    },
    price: {
      type: Number,
      default: 10
    },
    isDeleted: {
        type: Boolean, 
        default: false
    },
    stars : {
      type: Number, 
      default: 0
    }, 
    image: {
      type: String, 
      required: 'image cannot be blank'
    }
  },
  { collection: 'dishes' }
);

module.exports = mongoose.model('Dish', DishesSchema);
