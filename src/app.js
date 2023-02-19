const express = require('express');
const productRoutesValidations = require('./middlewares/validations/productsRoutesValidations');
const db = require('./utils/connection');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (req, res) => {
  const [result] = await db
.execute('SELECT * FROM StoreManager.products ORDER BY id;');
  res.status(200).json(result);
});

app.get('/products/:id', productRoutesValidations, async (req, res) => {
  const { id } = req.params;
  const [[result]] = await db
.execute('SELECT * FROM StoreManager.products WHERE id=? ORDER BY id;', [id]);
  res.status(200).json(result);
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;