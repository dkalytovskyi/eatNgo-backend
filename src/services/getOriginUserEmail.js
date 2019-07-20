const cryptor = require('../services/cryptor');

const getOriginUserEmail = (pathCode) => {
    const verifyCode = pathCode.toString().replace(/Eea1AtTN94ngOo/g, '/');
    return cryptor.deCryptPassword(verifyCode, `Hello`);
}

module.exports = getOriginUserEmail;