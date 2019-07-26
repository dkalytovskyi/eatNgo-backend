const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const dbService = require('../services/dBService');
const queryWrapper = require('../utils/queryWrapper');

const constructOrderObject = order => {
    //We get _id of restaurants from frontend, but in order to keep it real id of restaurant, we are going to
    //change it to mongoose ObjectId
    order.restaurants._id = mongoose.Types.ObjectId(order.restaurants._id);
    order.dishes.map(dish => {
        dish.id = mongoose.Types.ObjectId(dish.id);
        return dish;
    })
    order.tables.date = new Date(order.tables.date);

    return order;
}

exports.listAllOrders = (req, res) => {
    queryWrapper(req, res, () => dbService.getAllDataFromCollection(Order));
}

exports.readOrder = (req, res) => {
    queryWrapper(req, res, () => dbService.getOneElementById(Order, req.params.orderId))
}

exports.createOrder = (req, res) => {
    queryWrapper(req, res, () => dbService.createElement(Order, constructOrderObject(req.body)));
}

exports.updateOrder = (req, res) => {
    queryWrapper(req, res, () => dbService.updateElement(Order, req.body._id, req.body));
}
