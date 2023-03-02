const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const addProductMock = require('../mocks/addProductModelMock');
const connection = require('../../../src/connection');
const chaiHTTP = require('chai-http');
const {productsModel} = require('../../../src/models');
const mock = require('../mocks/allProductsModelMock');


chai.use(chaiHTTP);


describe('Products Model layer tests', function() {
  describe('/products route GET tests', function() {
    afterEach(function() {
      sinon.restore();
      });

    it('should return all products', async function(){
      sinon.stub(connection, 'execute').resolves([mock]);
      const expectedDB = await productsModel.getAllProducts();
      expect(expectedDB).to.be.deep.equal(mock);
    });

    it('should return product by Id', async function(){
      sinon.stub(connection, 'execute').resolves([mock]);
      const expectedDB = await productsModel.getProductById(1);
      expect(expectedDB).to.be.deep.equal(mock[0]);
    });

    it('should return the all products with added one', async function(){
      sinon.stub(connection, 'execute').resolves([addProductMock]);
      const productToAdd = {"name": "Laço da Verdade"};
      await productsModel.addProduct(productToAdd);
      const expectedDB = await productsModel.getAllProducts();
      expect(expectedDB).to.be.deep.equal(addProductMock);
    });

    it('Should update the product in the DB', async()=> {
      const updatedProduct = "Martelo do Batman";
      const query = sinon.stub(connection, 'execute').onFirstCall().resolves()
  .onSecondCall().resolves([[[{id: 1, name: updatedProduct}]]]);
      const req = await productsModel.updateProduct(updatedProduct, 1);
      expect(query.firstCall.args[0]).to.equal('UPDATE StoreManager.products SET name=? WHERE id=?;');
    
    });

    it('Should return the added one', async() => {
      const updatedProduct = "Martelo do Batman";
      sinon.stub(connection, 'execute').resolves([[[{id: 1, name: updatedProduct}]]]);
      const result = await productsModel.updateProduct(updatedProduct, 1);
      expect(result[0]).to.be.deep.equal({
        "id": 1,
        "name": "Martelo do Batman"
      });
    });
});
});