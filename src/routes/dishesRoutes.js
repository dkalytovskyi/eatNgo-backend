const dishBuilder = require('../controllers/dishesController');

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
  
  app
    .route('/dishes/:filter/:count')
    .get(dishBuilder.listFilteredDishes)
};
