const express = require('express');
const productsRouter = require('./routes/products.routes');

const app = express();

app.use(express.json());

app.use('/', productsRouter);

module.exports = app;