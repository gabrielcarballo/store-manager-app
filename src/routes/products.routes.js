const express = require('express');
const { productsController } = require('../controllers');

const productsRoutes = express.Router();

productsRoutes.get('/products', productsController.getAllProducts);

productsRoutes.get('/products/:id', productsController.getProductById);

productsRoutes.post('/products', productsController.addProduct);

productsRoutes.put('/products/:id', productsController.updatedProduct);

module.exports = productsRoutes;