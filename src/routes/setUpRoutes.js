const routesDishes = require('./DishesRoutes');
const routesPlaces = require('./PlacesRoutes');

module.exports = app => {
    routesDishes(app);
    routesPlaces(app);
}