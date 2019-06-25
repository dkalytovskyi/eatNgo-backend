const dishBuilder = require('../controllers/DishesController');

module.exports = app => {
  app
    .route('/dishes')
    .get(dishBuilder.listAllDishes)
    .post(dishBuilder.createDish);

  app
    .route('/dishes/:dishId')
    .get(dishBuilder.readDish)
    .put(dishBuilder.updateDish)
    .delete(dishBuilder.deleteDish);
};