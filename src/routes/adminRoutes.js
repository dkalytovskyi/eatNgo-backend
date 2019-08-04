const adminController = require('../controllers/adminController');

module.exports = app => {
    app
        .route('/admin')
        .post(adminController.authenticateAdmin);
}