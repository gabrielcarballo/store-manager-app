const camelize = require('camelize');
const connection = require('../connection');

const getAllProducts = async () => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products ORDER BY id;');
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id=? ORDER BY id;', [id]);
  return camelize(result);
};

/* const addProduct = async function(name) {
  const { name } = req.body;
  await connection.execute('INSERT INTO StoreManager.products (name) VALUES (?);',
    [name]);
  const [[dataToUser]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name=?;', [name]);
  res.status(201).json(dataToUser);
}; */

module.exports = {
  getAllProducts,
  getProductById,
 /*  addProduct,  */
};