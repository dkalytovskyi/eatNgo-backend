const mongoose = require('mongoose');
const specialOffers = mongoose.model('specialOffers');
const dbService = require('../services/dBService');
const queryWrapper = require('../utils/queryWrapper');

exports.listAllSpecialOffers = (req, res) => {
  queryWrapper(req, res, () => dbService.getAllDataFromCollection(specialOffers));
};

exports.createSpecialOffers = (req, res) => {
  queryWrapper(req, res, () => dbService.createElement(specialOffers, req.body));
};

exports.readSpecialOffers = async (req, res) => {
  queryWrapper(req, res, () => dbService.getOneElementById(specialOffers, req.params.specialOffersId));
};

exports.updateSpecialOffers = async (req, res) => {
  queryWrapper(req, res, () => dbService.updateOneElement(specialOffers, req.params.specialOffersId, req.body));
};

exports.deleteSpecialOffers = async (req, res) => {
  queryWrapper(req, res, () => dbService.deleteOneElement(specialOffers, req.params.specialOffersId));
};