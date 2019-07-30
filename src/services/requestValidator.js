exports.isSortFilterExists = (filter, filters) => Object.keys(filters).includes(filter);

exports.isCategoryExists = (category, categories) => Object.values(categories).includes(category);

exports.isElementsNumberValid = (requestedNumber, maxNumber, minNumber = 1) => requestedNumber >= minNumber && requestedNumber <= maxNumber;
