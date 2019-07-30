const userOrders = require('../controllers/userOrdersController');

module.exports = app => {
    app
        .route('/myorders')
        .post(userOrders.usersRestaurant)
    app
        .route('/rating')
        .post(userOrders.ratingDish)


}