const offersBuilder = require('../controllers/specialOffersController');

module.exports = app => {
  app
    .route('/offers')
    .get(offersBuilder.listAllSpecialOffers)
    .post(offersBuilder.createSpecialOffers);
  
  app
    .route('/offers/:specialOffersId')
    .get(offersBuilder.readSpecialOffers)
    .put(offersBuilder.updateSpecialOffers)
    .delete(offersBuilder.deleteSpecialOffers);
};