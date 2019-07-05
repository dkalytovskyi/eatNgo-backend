const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
const dbService = require('../services/dBService');
const validator = require('../services/requestValidator');
const queryWrapper = require('../utils/queryWrapper');

const filters = {
  rating: (a, b) => b.stars - a.stars, 
  minPrice: (a, b) => a.price - b.price,
  maxPrice: (a, b) => b.price - a.price,
  unfiltered: () => {}
};

function validateRequestFilter(filter) {
  if(!validator.isSortFilterExists(filter, filters)) {
    throw new Error(`sorting filter ${filter} not exist for dishes`);
  }
  return filter;
}

function validateRequestNumber(number, maxNumber) {
  const all = 'all';
  if(number === all) number = maxNumber;
  if(!validator.isElementsNumberValid(number, maxNumber)) {
    throw new Error(`requested number of dishes ${number} incorrect`);
  }
  return number;
}

async function dishesList(req) {
  const filter = validateRequestFilter(req.params.filter);
  const allData = await dbService.getAllDataFromCollection(Dish);
  const count = validateRequestNumber(req.params.count, allData.length);
  const sortedData = allData.sort(filters[filter]);
  return sortedData.slice(0, count);
}

exports.listAllDishes = (req, res) => {
  queryWrapper(req, res, () => dbService.getAllDataFromCollection(Dish));
};

exports.createDish = (req, res) => {
  queryWrapper(req, res, () => dbService.createElement(Dish, req.body));
};

exports.readDish = async (req, res) => {
  queryWrapper(req, res, () => dbService.getOneElementById(Dish, req.params.dishId));
};

exports.updateDish = async (req, res) => {
  queryWrapper(req, res, () => dbService.updateOneElement(Dish, req.params.dishId, req.body));
};

exports.deleteDish = async (req, res) => {
  queryWrapper(req, res, () => dbService.deleteOneElement(Dish, req.params.dishId));
};

exports.listFilteredDishes = async (req, res) => {        
  queryWrapper(req, res, dishesList);
};