const cryptor = require('../services/cryptor');

const createConfirmCode = (email) => {
    return cryptor.enCryptPassword(email, cryptor.defaultSecret).toString().replace(/\//g, "Eea1AtTN94ngOo");
}

module.exports = createConfirmCode;