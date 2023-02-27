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

    it('should return product by Id', async function(id){
      const expectedDB = await productsModel.getProductById(id);
      expect(expectedDB).to.be.deep.equal(db[0])
    })
  
});
});