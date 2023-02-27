const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const db = require('../mocks/productsMock');
const connection = require('../../../src/connection');
const chaiHTTP = require('chai-http');
const {productsModel} = require('../../../src/models')

chai.use(chaiHTTP);


describe('Products route tests', function() {
  describe('/products route GET tests', function() {
    afterEach(function() {
      sinon.restore();
      });

    beforeEach(async() =>{
      sinon.stub(connection, 'execute').resolves([db]);
    });
    it('should return all products', async function(){
      const expectedDB = await productsModel.getAllProducts();
      expect(expectedDB).to.be.deep.equal(db);
    });

    it('should return product by Id', async function(){
      const expectedDB = await productsModel.getProductById(1);
      expect(expectedDB).to.be.deep.equal(db[0]);
    })

    it('should return the added product', async function(){
      const productToAdd = {"name": "Laço da Verdade"};
      const expectedDB = await productsModel.addProduct(productToAdd);
      db.push({"id": db.length+1, "name": "Laço da Verdade" });
      expect(expectedDB).to.be.deep.equal(db);
    })
  
});
});