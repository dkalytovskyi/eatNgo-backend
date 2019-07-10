const user = require('../controllers/usersController')

module.exports = app => {
    app
      .route('/registration')
      .post(user.userRegistration);
    app
      .route('/authenticate')
      .post(user.authenticate);
  };