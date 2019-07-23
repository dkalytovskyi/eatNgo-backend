const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const dbService = require('./src/services/dBService');
global.Dish = require('./src/models/dishesModel');
global.Place = require('./src/models/placesModel');
global.User = require('./src/models/usersModel');
global.specialOffers = require('./src/models/specialOffersModel');
global.Order = require('./src/models/orderModel');
const routes = require('./src/routes/setUpRoutes');

const mongoose = dbService.connectToDB()
                .then(() => console.log("MongoDB successfully connected"))
                .catch(err => console.log(err));
mongoose.Promise = global.Promise;
const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

routes(app);

app.listen(port, () => console.log(`Server running at ${port}`));