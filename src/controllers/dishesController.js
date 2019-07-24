const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
const dbService = require('../services/dBService');
const validator = require('../services/requestValidator');
const queryWrapper = require('../utils/queryWrapper');

const filters = {
  rating: (a, b) => b.stars - a.stars, 
  minPrice: (a, b) => a.price - b.price,
  maxPrice: (a, b) => b.price - a.price,
  nameASC: (a, b) => a.name > b.name,
  nameDESC: (a, b) => b.name > a.name,
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

function putInOrder({
  _id,
  name,
  price,
  stars, 
  image,
  category,
  ingradients,
  optionalIngredients
}) {
  const optional = optionalIngredients.reduce((acc, curr) => {
    return {...acc, 
      [curr]: {disabled: false, checked: true}
    };
  }, {});
  const required = ingradients.reduce((acc, curr) => {
    return {...acc, 
      [curr]: {disabled: true, checked: true}
    };
  }, {});
  return { _id, name, price, stars, image, category,
    ingredients: {
      ...required, ...optional
    }
  };
};

async function dishesList(req) {
  const filter = validateRequestFilter(req.params.filter);
  const allData = await dbService.getAllDataFromCollection(Dish);
  const count = validateRequestNumber(req.params.count, allData.length);
  const sortedData = allData.sort(filters[filter]);
  const requiredData = sortedData.slice(0, count);
  const dishes = requiredData.map(value => putInOrder(value));
  return dishes;
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
