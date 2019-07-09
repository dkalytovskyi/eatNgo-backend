const mongoose = require('mongoose');
const Place = mongoose.model('Place');
const dbService = require('../services/dBService');
const queryWrapper = require('../utils/queryWrapper')

exports.listAllPlaces = async (req, res) => {  
  queryWrapper(req, res, () => dbService.getAllDataFromCollection(Place));
};

exports.createPlace = async (req, res) => {
  queryWrapper(req, res, () => dbService.createElement(Place, req.body))
};

exports.readPlace = async (req, res) => {
  queryWrapper(req, res, () => dbService.getOneElementById(Place, req.params.placeId))
};

exports.updatePlace = async (req, res) => {
  queryWrapper(req, res, () => dbService.updateOneElement(Place, req.params.placeId, req.body))
};

exports.deletePlace = async (req, res) => {
  queryWrapper(req, res, () => dbService.deleteOneElement(Place, req.params.placeId))
}
