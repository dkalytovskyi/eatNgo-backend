const routesDishes = require('./dishesRoutes');
const routesPlaces = require('./placesRoutes');
const routesUsers = require('./usersRoutes');

module.exports = app => {
    routesDishes(app);
    routesPlaces(app);
    routesUsers(app);
}