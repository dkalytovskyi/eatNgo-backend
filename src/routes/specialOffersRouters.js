const offersBuilder = require('../controllers/specialOffersController');

module.exports = app => {
  app
    .route('/offers')
    .get(offersBuilder.listAllSpecialOffers)
    .post(offersBuilder.createSpecialOffers);
};