const connection = require('../connection');

const getAllProducts = async () => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products ORDER BY id;');
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id=? ORDER BY id;', [id]);
  return result;
};

const addProduct = async (name) => {
  await connection.execute('INSERT INTO StoreManager.products (name) VALUES (?);',
    [name]);
  const [[dataToUser]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name=?;', [name]);
  return dataToUser;
};

const updateProduct = async (name, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name=? WHERE id=?;', [name, id],
  );
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name=?;', [name]);
  return result;
};

const deleteProduct = async (id) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id=?', [id],
  );
  return result;
};

const test1 = () => { };
const test2 = () => { };

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  test1,
  test2,
};