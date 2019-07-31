const mongoose = require('mongoose');
const User = mongoose.model('User');

const userService = require('../services/userService');
const queryWrapper = require('../utils/queryWrapper');

exports.getUserInfo = async (req, res) => {
  queryWrapper(req, res, userService.getUserInfo, userService.errHandler);
};

exports.updateUserInfo = async (req, res) => {
  queryWrapper(req, res, userService.updateUserInfo, userService.errHandler);
};

exports.userRegistration = async (req, res) => {
  queryWrapper(req, res, () => userService.registerNewUser(User, req), userService.errorHandler);
};

exports.authenticate = async (req, res) => {
  queryWrapper(req, res, () => userService.authUser(req), userService.errorHandler);
};

exports.verification = async (req, res) => {
  queryWrapper(req, res, () => userService.verificationEmail(req, res));
};

exports.sendEmailToResetPassw = async (req, res) => {
  queryWrapper(req, res, () => userService.sendEmailToResetPassw(req), userService.errorHandler);
};

exports.resetPassword = async (req, res) => {
  queryWrapper(req, res, () => userService.resetPassword(req, res), userService.errorHandler);
};