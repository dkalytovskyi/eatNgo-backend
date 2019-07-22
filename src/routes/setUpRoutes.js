const routesDishes = require('./dishesRoutes');
const routesPlaces = require('./placesRoutes');
const routesUsers = require('./usersRoutes');
const routeSpecialOffers = require('./specialOffersRouters');

module.exports = app => {
    routesDishes(app);
    routesPlaces(app);
    routesUsers(app);
    routeSpecialOffers(app);
}