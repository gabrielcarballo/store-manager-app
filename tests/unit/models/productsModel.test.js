const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const addProductMock = require('../mocks/addProductModelMock');
const connection = require('../../../src/connection');
const chaiHTTP = require('chai-http');
const {productsModel} = require('../../../src/models');
const mock = require('../mocks/allProductsModelMock');
const allProductsMock = require('../mocks/allProductsModelMock');


chai.use(chaiHTTP);


describe('Products Model layer tests', function() {
  describe('/products route GET tests', function() {
   

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

    it('Should delete the product based on id passed as arg', async() => {
      const productId = 1;
      sinon.stub(connection, 'execute').resolves({ affectedRows: 1 });
      const result = await productsModel.deleteProduct(1);
      expect(connection.execute.calledOnce).to.be.true;
      expect(connection.execute.firstCall.args[0]).to.equal('DELETE FROM StoreManager.products WHERE id=?');
      expect(connection.execute.firstCall.args[1]).to.deep.equal([productId]);
      expect(result.affectedRows).to.equal(1);
      connection.execute.restore();
    });

    it('Should not modify DB incorrectly', async() => {
      sinon.stub(connection, 'execute').resolves({ affectedRows: 1 });
      const result = await productsModel.deleteProduct(1);
      expect(result.affectedRows).to.not.equal(2);
    });
   
});
    

    afterEach(function() {
      sinon.restore();
      });
});