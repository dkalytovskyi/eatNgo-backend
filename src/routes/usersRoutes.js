const user = require('../controllers/usersController')

module.exports = app => {
  app
    .route('/registration')
    .post(user.userRegistration);
  app
    .route('/authenticate')
    .post(user.authenticate);
  app
    .route('/verify/:code')
    .get(user.verification)
};
