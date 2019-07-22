const mongoose = require('mongoose');
const User = mongoose.model('User');
const dbService = require('../services/dBService');
const cryptor = require('../services/cryptor');
const queryWrapper = require('../utils/queryWrapper');

const sendEmail = require('../services/sendEmail');
const getOriginUserEmail = require('../services/getOriginUserEmail');
const createConfirmCode = require('../services/createConfirmCode');
const confirmLetter = require('../services/letters/confirmation');
const changeEmailLetter = require('../services/letters/changeEmail');

function errorHandler(err, res) {
  res.status(406).send(err.message);
}

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
}

async function verificationEmail(req, res) {
  const email = getOriginUserEmail(req.params.code);
  const user = await dbService.getOneElementByField(User, { email });
  const confirmation = user ? await dbService.updateElement(User, {email}, { confirm: true }) : 'User does not exists'
  if (confirmation) return res.redirect('http://localhost:3000/login');
  return confirmation;
}

async function authUser(User, req) {
  const { email, password } = req.body;
  const user = await dbService.getOneElementByField(User, { email });
  if (!user) throw new Error('Username or password is incorrect');
  if (!user.confirm) throw new Error('Email is not confirmed');
  const plainPassword = cryptor.deCryptPassword(user.password, 'newSecret');

  if (plainPassword !== password) throw new Error('Username or password is incorrect');

  return user;
}

const errMessages = {
  unloggined: 'Unloggined',
  incorrectPassword: 'Password is incorrect'
};

const errors = {
  [errMessages.unloggined]: 401, 
  [errMessages.incorrectPassword]: 400
};

function errHandler(err, res) {
  const { message } = err;
  return res.status(errors[message]).send(message);
}

function confirmAuth(req) {
  const authHeader = req.headers.authorization;
  if(!authHeader) throw new Error (errMessages.unloggined);
  return authHeader;
}

function getUserEmail(authHeader) {
  const { email } = JSON.parse(authHeader);
  return email;
}

async function getUserInfo(req) {
  const authHeader = confirmAuth(req);
  const email = getUserEmail(authHeader);
  const user = await dbService.getOneElementByField(User, {email});
  return user;        
}

const updateUser = {
  email: updateEmail, 
  password: updatePassword, 
  default: updateInfo
}

async function updateEmail(host, newEmail, email) {
  const code = createConfirmCode(newEmail);
  const link = `http://${host}/verify/${code}`;
  const info = await sendEmail(newEmail, changeEmailLetter(link));
  return dbService.updateElement(User, {email}, {email: newEmail, confirm: false});
}

async function updatePassword(password, prevPassword, email) {
  const user = await dbService.getOneElementByField(User, {email});
  const plainPassword = cryptor.deCryptPassword(user.password);
  if(plainPassword !== prevPassword) throw new Error (errMessages.incorrectPassword);
  const cryptPassword = cryptor.enCryptPassword(password).toString();
  return dbService.updateElement(User, {email}, {password: cryptPassword});
}

async function updateInfo (obj, email) {
  return dbService.updateElement(User, {email}, obj);
}

async function updateUserInfo(req) {
  const authHeader = confirmAuth(req);
  const email = getUserEmail(authHeader);
  const host = req.get('host');

  const { data } = req.body;
  const { email: newEmail, password, prevPassword } = data;
  const updatedUser = newEmail ? await updateUser.email(host, newEmail, email) : 
                      password ? await updateUser.password(password, prevPassword, email) :
                      await updateUser.default(data, email);
  return updatedUser;
}

exports.getUserInfo = async (req, res) => {
  queryWrapper(req, res, getUserInfo, errHandler);
};

exports.updateUserInfo = async (req, res) => {
  queryWrapper(req, res, updateUserInfo, errHandler);
};

exports.userRegistration = async (req, res) => {
  queryWrapper(req, res, () => registerNewUser(User, req), errorHandler);
};

exports.authenticate = async (req, res) => {
  queryWrapper(req, res, () => authUser(User, req), errorHandler);
};

exports.verification = async (req, res) => {
  queryWrapper(req, res, () => verificationEmail(req, res));
};