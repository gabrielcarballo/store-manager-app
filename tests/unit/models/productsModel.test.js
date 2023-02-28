const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const getAllProductsMock = require('../mocks/allProductsMock');
const addProductMock = require('../mocks/addProductMock');
const connection = require('../../../src/connection');
const chaiHTTP = require('chai-http');
const {productsModel} = require('../../../src/models');


chai.use(chaiHTTP);


describe('Products route tests', function() {
  describe('/products route GET tests', function() {
    afterEach(function() {
      sinon.restore();
      });

    beforeEach(async() =>{
      sinon.stub(connection, 'execute').resolves([getAllProductsMock]);
    });
    it('should return all products', async function(){
      const expectedDB = await productsModel.getAllProducts();
      expect(expectedDB).to.be.deep.equal(getAllProductsMock);
    });

    it('should return product by Id', async function(){
      const expectedDB = await productsModel.getProductById(1);
      expect(expectedDB).to.be.deep.equal(getAllProductsMock[0]);
    });

    it('should return the all products with added one', async function(){
      sinon.restore();
      sinon.stub(connection, 'execute').resolves([addProductMock])
      const productToAdd = {"name": "Laço da Verdade"};
      const expectedDB = await productsModel.addProduct(productToAdd);
      expect(expectedDB).to.be.deep.equal(addProductMock);
      
    });
  
});
});