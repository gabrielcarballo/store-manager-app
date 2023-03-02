const productModel = require('../models/productsModel');
const validations = require('../middlewares/validations');

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

const addProduct = async (name) => {
  const isNameValid = await validations.addProductsValidations(name);
  if (isNameValid) return { type: isNameValid.type, message: isNameValid.message };
  const productAdded = await productModel.addProduct(name);
  return { type: null, message: productAdded };
};

const updateProduct = async (name, id) => {
  const isNameValid = await validations.addProductsValidations(name);
  if (isNameValid) return { type: isNameValid.type, message: isNameValid.message };
  const updatedProduct = await productModel.updateProduct(name, id);
  if (!updatedProduct) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }
  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => {
  if (!id || typeof id !== 'number') {
 return {
    type: 'ID_NOT_PROVIDED', message: 'id not provided',
  }; 
}
  const [deletedProduct] = await productModel.deleteProduct(id);
  if (deletedProduct.affectedRows === 0) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }
  
  return { type: null, message: deletedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};