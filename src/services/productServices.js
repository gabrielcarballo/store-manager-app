const productModel = require('../models/productsModel');
/* const validations = require('../middlewares/validations'); */

const getAllProducts = async () => {
  const allProducts = await productModel.getAllProducts();
  return { type: null, message: allProducts };
};

/* const getProductById = async function(id) {
  const productById = await productModel.getProductById(id);
  if
} */

module.exports = {
  getAllProducts,
};