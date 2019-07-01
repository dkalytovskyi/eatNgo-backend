const mongoose = require('mongoose');
const Place = mongoose.model('Place');
const dbService = require('../services/db-service');

exports.listAllPlaces = async (req, res) => {
    try {
        const places = await dbService.getAllDataFromCollection(Place);
        res.json(places);
    }
    catch(err) {
      res.status(400).send(err);
    }
};

exports.createPlace = async (req, res) => {
    try {
      const newPlace = await dbService.createElement(Place, req.body);
      res.json(newPlace);
    }
    catch(err) {
      res.status(400).send(err);
    }
};

exports.readPlace = async (req, res) => {
  try {
    const place = await dbService.getOneElementById(Place, req.params.placeId);
    res.json(place);
  }
  catch(err) {
    res.status(400).send(err);
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const updatedPlace = await dbService.updateOneElement(Place, req.params.placeId, req.body);
    res.json(updatedPlace);
  }
  catch(err) {
    res.status(400).send(err);
  }
};
exports.deletePlace = async (req, res) => {
  try {
    const message = await dbService.deleteOneElement(Place, req.params.placeId);
    res.json(message);
  }
  catch(err) {
    res.status(400).send(err);
  }
}
