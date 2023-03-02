const { productServices } = require('../services');

const getAllProducts = async (_req, res) => {
  const { message } = await productServices.getAllProducts();
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { message, type } = await productServices.getProductById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { message, type } = await productServices.addProduct(name);
  switch (type) {
    case 'EMPTY_NAME':
      return res.status(400).json({ message });
    case 'NAME_TOO_SHORT':
      return res.status(422).json({ message });
    default:
      res.status(201).json(message);
  }
};

  const updatedProduct = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const { message, type } = await productServices.updateProduct(name, id);
    switch (type) {
      case 'EMPTY_NAME':
      return res.status(400).json({ message });
    case 'NAME_TOO_SHORT':
      return res.status(422).json({ message });
    case 'PRODUCT_NOT_FOUND':
      return res.status(404).json({ message });
      default:
        return res.status(200).json(message);
    }
  };

  const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { message, type } = await productServices.deleteProduct(id);
    switch (type) {
      case 'PRODUCT_NOT_FOUND':
        return res.status(404).json({ message });
      default:
        return res.status(204).end();
    }
  };

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updatedProduct,
  deleteProduct,
};