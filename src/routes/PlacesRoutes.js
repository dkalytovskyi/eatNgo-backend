const placeBuilder = require('../controllers/placesController');

module.exports = app => {
  app
    .route('/places')
    .get(placeBuilder.listAllPlaces)
    .post(placeBuilder.createPlace);

  app
    .route('/places/:placeId')
    .get(placeBuilder.readPlace)
    .put(placeBuilder.updatePlace)
    .delete(placeBuilder.deletePlace);
};