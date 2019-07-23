const orderBuilder = require('../controllers/orderController');

module.exports = app => {
    app
        .route('/order')
        .post(orderBuilder.createOrder);

    app
        .route('/order/:orderId')
        .get(orderBuilder.listAllOrders)
        .put(orderBuilder.updateOrder);
}