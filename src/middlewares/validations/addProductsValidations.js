const addProductsRoutesValidations = async (name) => {
  if (!name) {
    return {
      type: 'EMPTY_NAME',
      message: '"name" is required',
    };
  }
  if (name.length < 5) {
    return {
      type: 'NAME_TOO_SHORT',
      message: '"name" length must be at least 5 characters long',
    };
  }
  return false;
};

module.exports = addProductsRoutesValidations;