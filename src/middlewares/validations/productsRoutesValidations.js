const db = require('../../utils/connection');

const productRoutesValidations = async (req, res, next) => {
  const { id } = req.params;
  const [[result]] = await db
.execute('SELECT * FROM StoreManager.products WHERE id=? ORDER BY id;', [id]);
  if (!result) res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = productRoutesValidations;