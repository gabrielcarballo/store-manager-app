const addProductsRoutesValidations = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
 res.status(400)
  .send({ message: '"name" is required' }); 
}
  if (name.length < 5) {
    res.status(422)
.send({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = {
  addProductsRoutesValidations,
};