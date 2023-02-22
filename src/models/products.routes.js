const express = require('express');
const productRoutesValidations = require('../middlewares/validations/productsRoutesValidations');
const db = require('./connection');

const routes = express.Router();

const mainProductRoute = routes.get('/products', async (req, res) => {
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

module.exports = {
  mainProductRoute,
  productRouteByID,
};