const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
const dbService = require('../services/db-service');

exports.listAllDishes = async (req, res) => {
    try {
        const dishes = await dbService.getAllDataFromCollection(Dish);
        res.json(dishes);
    }
    catch(err) {
      res.status(400).send(err);
    }
};

exports.createDish = async (req, res) => {
    try {
      const newDish = await dbService.createElement(Dish, req.body);
      res.json(newDish);
    }
    catch(err) {
      res.status(400).send(err);
    }
};

exports.readDish = async (req, res) => {
  try {
    const dish = await dbService.getOneElementById(Dish, req.params.dishId);
    res.json(dish);
  }
  catch(err) {
    res.status(400).send(err);
  }
};

exports.updateDish = async (req, res) => {
  try {
    const updatedDish = await dbService.updateOneElement(Dish, req.params.dishId, req.body);
    res.json(updatedDish);
  }
  catch(err) {
    res.status(400).send(err);
  }
};
exports.deleteDish = async (req, res) => {
  try {
    const message = await dbService.deleteOneElement(Dish, req.params.dishId);
    res.json(message);
  }
  catch(err) {
    res.status(400).send(err);
  }
}
