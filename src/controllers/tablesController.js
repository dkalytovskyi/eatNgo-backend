const mongoose = require('mongoose');
const Tables = mongoose.model('Tables');
const dbService = require('../services/dBService');
const queryWrapper = require('../utils/queryWrapper')

async function getTables(req) {
  const restId = req.params.restId;
  const restaran = await dbService.getOneElementByField(Tables, {idRestaurant: mongoose.Types.ObjectId(restId)});
  return restaran.tables;
}

exports.listAllTables = async (req, res) => {  
  queryWrapper(req, res, () => dbService.getAllDataFromCollection(Tables));
};

exports.readTables = async (req, res) => {
  queryWrapper(req, res, getTables)
};