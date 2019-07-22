const CryptoJS = require("crypto-js");

const defaultSecret = 'newSecret';

exports.enCryptPassword = (password, secret = defaultSecret) => {
    const ciphertext = CryptoJS.AES.encrypt(password, secret);
    return ciphertext;
};

exports.deCryptPassword = (password, secret = defaultSecret) => {
    const bytes  = CryptoJS.AES.decrypt(password.toString(), secret);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
};