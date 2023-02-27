const productServices = require('../services')

const getAllProducts = async (_req, res) => {
  const { message } = await productServices.getAllProducts();
  return res.status(200).json(message)
};
module.exports = {
  getAllProducts
};