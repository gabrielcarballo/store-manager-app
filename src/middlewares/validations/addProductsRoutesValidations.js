const addProductsRoutesValidations = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
 res.status(401)
  .send('You have to inform the product name'); 
}
  next();
};

module.exports = {
  addProductsRoutesValidations,
};