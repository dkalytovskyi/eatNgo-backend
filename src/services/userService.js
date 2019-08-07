const mongoose = require('mongoose');
const User = mongoose.model('User');

const dbService = require('./dBService');
const cryptor = require('./cryptor');
const sendEmail = require('./sendEmail');
const getOriginUserEmail = require('./getOriginUserEmail');
const createConfirmCode = require('./createConfirmCode');
const confirmLetter = require('./letters/confirmation');
const changeEmailLetter = require('./letters/changeEmail');
const resetPasswordLetter = require('./letters/resetPassword');

const frontHost = 'https://eatngo-fbbeb.firebaseapp.com/';

const errMessages = {
  unloggined: 'Unloggined',
  incorrectPassword: 'Password is incorrect'
};

const errors = {
  [errMessages.unloggined]: 401,
  [errMessages.incorrectPassword]: 400
};

function confirmAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error(errMessages.unloggined);
  return authHeader;
};

async function confirmUser(field) {
  const user = await dbService.getOneElementByField(User, field);
  if (!user) throw new Error('Username or password is incorrect');
  if (!user.confirm) throw new Error('Email is not confirmed');

  return user;
};

function getUserEmail(authHeader) {
  const { email } = JSON.parse(authHeader);
  return email;
};

const updateUser = {
  email: updateEmail,
  password: updatePassword,
  default: updateInfo
};

async function updateEmail(host, newEmail, email) {
  const code = createConfirmCode(newEmail);
  const link = `http://${host}/verify/${code}`;
  const info = await sendEmail(newEmail, changeEmailLetter(link));
  return dbService.updateElement(User, { email }, { email: newEmail, confirm: false });
};

async function updatePassword(password, prevPassword, email) {
  const user = await dbService.getOneElementByField(User, { email });
  const plainPassword = cryptor.deCryptPassword(user.password, cryptor.defaultSecret);
  if (plainPassword !== prevPassword) throw new Error(errMessages.incorrectPassword);
  const cryptPassword = cryptor.enCryptPassword(password, cryptor.defaultSecret).toString();
  return dbService.updateElement(User, { email }, { password: cryptPassword });
};

async function updateInfo(obj, email) {
  return dbService.updateElement(User, { email }, obj);
};

exports.errorHandler = (err, res) => {
  res.status(406).send(err.message);
};

exports.errHandler = (err, res) => {
  const { message } = err;
  return res.status(errors[message]).send(message);
};

exports.registerNewUser = async (User, req) => {
  const { email, firstName, lastName, password } = req.body
  const user = await dbService.getOneElementByField(User, { email });
  if (user) throw new Error('That user already exists!');
  req.body.password = cryptor.enCryptPassword(password, cryptor.defaultSecret);

  const code = createConfirmCode(email);
  const host = req.get('host');
  const link = `http://${host}/verify/${code}`;
  sendEmail(email, confirmLetter(firstName, lastName, link));

  return dbService.createElement(User, req.body);
};

exports.verificationEmail = async (req, res) => {
  const email = getOriginUserEmail(req.params.code);
  const user = await dbService.getOneElementByField(User, { email });
  const confirmation = user ? await dbService.updateElement(User, { email }, { confirm: true }) : 'User does not exists'
  if (confirmation) return res.redirect('https://eatngo-fbbeb.firebaseapp.com/login');
  return confirmation;
};


exports.authUser = async req => {
  const { email, password } = req.body;
  const user = await confirmUser({email});
  const plainPassword = cryptor.deCryptPassword(user.password, cryptor.defaultSecret);
  if (plainPassword !== password) throw new Error('Username or password is incorrect');
  
  return user;
};

exports.getUserInfo = async req => {
  const authHeader = confirmAuth(req);
  const email = getUserEmail(authHeader);
  const user = await dbService.getOneElementByField(User, { email });
  return user;
};

exports.updateUserInfo = async req => {
  const authHeader = confirmAuth(req);
  const email = getUserEmail(authHeader);
  const host = req.get('host');

  const { data } = req.body;
  const { email: newEmail, password, prevPassword } = data;
  const updatedUser = newEmail ? await updateUser.email(host, newEmail, email) :
    password ? await updateUser.password(password, prevPassword, email) :
      await updateUser.default(data, email);
  return updatedUser;
};

exports.sendEmailToResetPassw = async req => {
  const { email } = req.body;
  const user = await confirmUser({email});
  const code = createConfirmCode(email);
  const host = frontHost;
  const link = `${host}reset/${code}`;
  return sendEmail(email, resetPasswordLetter(link));
};

exports.resetPassword = async req => {
  const { newPassword, hash } = req.body;
  const email = getOriginUserEmail(hash);
  const cryptedPassword = cryptor.enCryptPassword(newPassword, cryptor.defaultSecret).toString();
  const user = await confirmUser({email});
  const reset = await dbService.updateElement(User, { email }, { password: cryptedPassword });
  if(reset) return true;
};