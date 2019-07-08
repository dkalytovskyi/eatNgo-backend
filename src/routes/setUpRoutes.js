const routesDishes = require('./dishesRoutes');
const routesPlaces = require('./placesRoutes');

module.exports = app => {
    routesDishes(app);
    routesPlaces(app);
}