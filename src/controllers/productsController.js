const productServices = require('../services');

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
module.exports = {
  getAllProducts,
  getProductById,
};