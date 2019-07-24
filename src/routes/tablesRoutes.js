const tableBuilder = require('../controllers/tablesController');

module.exports = app => {
  app
    .route('/tables')
    .get(tableBuilder.listAllTables)

  app
    .route('/tables/:restId')
    .get(tableBuilder.readTables)
};
