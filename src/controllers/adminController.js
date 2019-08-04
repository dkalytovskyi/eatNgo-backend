const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const dbService = require('../services/dBService');
const queryWrapper = require('../utils/queryWrapper');
const cryptor = require('../services/cryptor');
const userService = require('../services/userService');
  
authentication = async adminData => {
    const admin = await dbService.getOneElementByField(Admin, {name: adminData.name});

    if(!admin) throw new Error('Admin name or password is incorrect');

    const decryptedPassword = cryptor.deCryptPassword(admin.password, cryptor.defaultSecret);
   
    if(decryptedPassword === adminData.password){
        return true;
    } else {
        throw new Error('Admin name or password is incorrect');
    }
}

exports.authenticateAdmin = async (req, res) => {
   queryWrapper(req, res, () => authentication(req.body), userService.errorHandler);
}
