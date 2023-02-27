const productModel = require('../models/productsModel');
/* const validations = require('../middlewares/validations'); */

const getAllProducts = async () => {
  const allProducts = await productModel.getAllProducts();
  return { type: null, message: allProducts };
};

const getProductById = async (id) => {
  const productById = await productModel.getProductById(id);
  if (!productById) {
 return {
    type: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  }; 
}
  return { type: null, message: productById };
};

module.exports = {
  getAllProducts,
  getProductById,
};