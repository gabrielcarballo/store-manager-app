const express = require('express');

const productRoutesValidations = require('../middlewares/validations/productsRoutesValidations');

const {
addProductsRoutesValidations,
} = require('../middlewares/validations/addProductsRoutesValidations');

const db = require('./connection');

const routes = express.Router();

const mainProductRoute = routes.get('/products', async (_req, res) => {
  const [result] = await db
.execute('SELECT * FROM StoreManager.products ORDER BY id;');
  res.status(200).json(result);
});

const productRouteByID = routes.get('/products/:id', productRoutesValidations, async (req, res) => {
  const { id } = req.params;
  const [[result]] = await db
.execute('SELECT * FROM StoreManager.products WHERE id=? ORDER BY id;', [id]);
  res.status(200).json(result);
});

const addProduct = routes.post('/products', addProductsRoutesValidations, async (req, res) => {
  const { name } = req.body;
  await db.execute('INSERT INTO StoreManager.products (name) VALUES (?);',
 [name]);
const [[dataToUser]] = await db
.execute('SELECT * FROM StoreManager.products WHERE name=?;', [name]);
res.status(201).json(dataToUser);
});
module.exports = {
  mainProductRoute,
  productRouteByID,
  addProduct,
};
