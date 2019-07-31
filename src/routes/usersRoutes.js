const user = require('../controllers/usersController')

module.exports = app => {
  app
    .route('/registration')
    .post(user.userRegistration);
  app
    .route('/authenticate')
    .post(user.authenticate);
  app
    .route('/users') 
    .get(user.getUserInfo)
    .put(user.updateUserInfo)
  app
    .route('/verify/:code')
    .get(user.verification)
  app
    .route('/forgotPassword')
    .post(user.sendEmailToResetPassw)
  app
    .route('/reset')
    .post(user.resetPassword)
};