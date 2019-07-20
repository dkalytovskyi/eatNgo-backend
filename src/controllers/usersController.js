const mongoose = require('mongoose');
const User = mongoose.model('User');
const cryptor = require('../services/cryptor');
const dbService = require('../services/dBService');
const queryWrapper = require('../utils/queryWrapper');
const sendEmail = require('../services/sendEmail');
const getOriginUserEmail = require('../services/getOriginUserEmail');
const createConfirmCode = require('../services/createConfirmCode')
const confirmLetter = require('../services/letters/confirmation')


function errorHandler(err, res) {
  res.status(406).send(err.message);
};

async function registerNewUser(User, req) {
  const { email, firstName, lastName, password } = req.body
  const user = await dbService.getOneElementByField(User, { email });
  if (user) throw new Error('That user already exists!');
  req.body.password = cryptor.enCryptPassword(password, 'newSecret');

  const code = createConfirmCode(email);
  const host = req.get('host');
  const link = `http://${host}/verify/${code}`;
  sendEmail(email, confirmLetter(firstName, lastName, link));

  return dbService.createElement(User, req.body);
};

async function verificationEmail(req, res) {
  const email = getOriginUserEmail(req.params.code);
  const user = await dbService.getOneElementByField(User, { email });
  const confirmation = user ? await dbService.updateElement(User, email, { confirm: true }) : 'User does not exists'
  if (confirmation) return res.redirect('http://localhost:3000/login');
  return confirmation;
}

async function authUser(User, req) {
  const { email, password } = req.body
  const user = await dbService.getOneElementByField(User, { email });
  if (!user) throw new Error('Username or password is incorrect');
  if (!user.confirm) throw new Error('Email is not confirmed');
  const plainPassword = cryptor.deCryptPassword(user.password, 'newSecret');

  if (plainPassword !== password) throw new Error('Username or password is incorrect');

  return user;
};

exports.userRegistration = async (req, res) => {
  queryWrapper(req, res, () => registerNewUser(User, req), errorHandler);
};

exports.authenticate = async (req, res) => {
  queryWrapper(req, res, () => authUser(User, req), errorHandler);
};

exports.verification = async (req, res) => {
  queryWrapper(req, res, () => verificationEmail(req, res));
}