exports.isSortFilterExists = (filter, filters) => Object.keys(filters).includes(filter);

exports.isElementsNumberValid = (requestedNumber, maxNumber, minNumber = 1) => requestedNumber >= minNumber && requestedNumber <= maxNumber;
