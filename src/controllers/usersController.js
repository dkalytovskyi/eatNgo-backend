const mongoose = require('mongoose');
const User = mongoose.model('User');
const cryptor = require('../services/cryptor');
const dbService = require('../services/dBService');
const queryWrapper = require('../utils/queryWrapper');

function registrErrorHandler (err, res) {
  res.status(406).send(err.message);
};

function authErrorHandler (err, res) {
  res.status(401).send(err.message);
};

async function registerNewUser(newUser, req) {
  const user = await dbService.getUserByEmail(newUser, req.body);
  if(user) throw new Error ('That user already exists!');
  
  const cipherPassword = cryptor.enCryptPassword(req.body.password, 'newSecret');
  req.body.password = cipherPassword;

  return dbService.createElement(User, req.body);
};

async function authUser(User, req) {
  const user = await dbService.getUserByEmail(User, req.body);
  if(!user) throw new Error ('Username or password is incorrect');
  const plainPassword = cryptor.deCryptPassword(user.password, 'newSecret');
  
  if(plainPassword !== req.body.password) throw new Error ('Username or password is incorrect');
  
  return user;
};

exports.userRegistration = async (req, res) => {
  queryWrapper(req, res, () => registerNewUser(User, req), registrErrorHandler);
};

exports.authenticate = async (req, res) => {
  queryWrapper(req, res, () => authUser(User, req), authErrorHandler);
};
