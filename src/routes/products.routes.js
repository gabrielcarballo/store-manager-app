const express = require('express');
const { productsController } = require('../controllers');
/* const {
  addProductsMidValidation,
  getAllProductsMidValidation,
} = require('../middlewares/validations'); */

const productsRoutes = express.Router();

productsRoutes.get('/products', productsController.getAllProducts);

 productsRoutes.get('/products/:id', productsController.getProductById);

/* roductsRoutes.post('/products', addProductsMidValidation, OQFAZ);
 */
module.exports = productsRoutes;