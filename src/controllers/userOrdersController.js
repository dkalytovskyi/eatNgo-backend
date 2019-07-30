const mongoose = require('mongoose');
const User = mongoose.model('User');
const Order = mongoose.model('Order');
const Dish = mongoose.model('Dish');
const dbService = require('../services/dBService');
const queryWrapper = require('../utils/queryWrapper');

async function usersRatingDish(req) {
    let { id, name, rating, idOrder } = req.body;
    let _id = mongoose.Types.ObjectId(id)

    //FOR DISH
    const updateEl = await dbService.getOneElementById(Dish, id)

    if (!updateEl) {
        throw new Error('Cant get dish object by id');
    }

    const prewEstimPeople = updateEl.estimationPeople;
    const estimationPeople = updateEl.estimationPeople + 1;
    const stars = updateEl.stars;
    const averegeRatig = ((prewEstimPeople * stars + rating) / estimationPeople).toFixed(1);
    const newObj = {
        estimationPeople,
        stars: averegeRatig
    }

    const updateRatingDish = await dbService.findByIdAndUpdate(Dish, _id, newObj)

    if (!updateRatingDish) {
        throw new Error('Cani update rating dishes by id');
    }

    //FOR ORDER
    const usersOrders = await dbService.getOneElementById(Order, idOrder);

    if (!usersOrders) {
        throw new Error('Cant find order by id');
    }

    const updateUserRating = usersOrders.dishes.map(el => {
        if (el.name == name) { el.ratingUser = rating; }
        return el;
    })

    const updateRatingDishInOrder = await dbService.findByIdAndUpdate(Order, { _id: idOrder }, { 'dishes': updateUserRating });

    if (!updateRatingDishInOrder) {
        throw new Error('Cant update rating dish in user orders by id');
    }

    return
}

async function usersListRestaurant(req, res) {

    const userMail = req.body;
    const user = await dbService.getAllElementByField(Order, userMail);
    return user;
}

exports.ratingDish = async (req, res) => {
    queryWrapper(req, res, usersRatingDish);
}
exports.usersRestaurant = async (req, res) => {
    queryWrapper(req, res, usersListRestaurant);
}