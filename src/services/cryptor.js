const CryptoJS = require("crypto-js");

exports.enCryptPassword = (password, secret) => {
    const ciphertext = CryptoJS.AES.encrypt(password, secret);
    return ciphertext;
};

exports.deCryptPassword = (password, secret) => {
    const bytes  = CryptoJS.AES.decrypt(password.toString(), secret);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
};