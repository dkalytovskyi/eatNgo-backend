const mongoose = require('mongoose');
const {uri, dbName} = require('./dBParameters');

exports.connectToDB = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(uri, {useNewUrlParser: true, useFindAndModify: false, dbName:dbName}, (err) => {
            err ? reject(err) : resolve();
          });
    })
};
exports.getAllDataFromCollection = (model) => {
  return new Promise((resolve, reject) => {
    model.find((err, dataArray) => {
        err ? reject(err) : resolve(dataArray);
    });
  });
};
exports.createElement = (model, params) => {
  return new Promise((resolve, reject) => {
    const newElement = new model(params);
    newElement.save((err, element) => {
      (err) ? reject(err) : resolve(element);
    });
  }) 
};
exports.getOneElementById = (model, elementId) => {
  return new Promise((resolve, reject) => {
    model.findById(elementId, (err, element) => {
      err ? reject(err) : resolve(element);
    });
  });
};
exports.getUserByEmail = (model, {email}) => {
  return new Promise((resolve, reject) => {
    model.findOne({ email: email }, (err, user) => {
        err ? reject(err) : resolve(user);
      }
    );
  });
};
exports.updateOneElement = (model, elemetId, params) => {
  return new Promise((resolve, reject) => {
    model.findOneAndUpdate(
      { _id: elemetId },
      params,
      { new: true },
      (err, element) => {
        err ? reject(err) : resolve(element);
      });
  });
};
exports.deleteOneElement = (model, name) => {
  return new Promise((resolve, reject) => {
    model.findOneAndUpdate(
      { name: name },
      { isDeleted: true},
      err => {
        err ? reject(err) : resolve('User successfully deleted');
      });
  });
};
