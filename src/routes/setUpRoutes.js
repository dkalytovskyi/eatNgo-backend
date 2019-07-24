const routesDishes = require('./dishesRoutes');
const routesPlaces = require('./placesRoutes');
const routesTables = require('./tablesRoutes');
const routesUsers = require('./usersRoutes');
const routeSpecialOffers = require('./specialOffersRouters');
const routesOrder = require('./orderRoutes');

module.exports = app => {
    routesDishes(app);
    routesPlaces(app);
    routesUsers(app);
    routeSpecialOffers(app);
    routesOrder(app);
    routesTables(app);
}