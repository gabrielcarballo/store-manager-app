const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { db } = require('../mocks/productsMock');
const connection = require('../../../src/connection');
const chaiHTTP = require('chai-http');
const {productsModel} = require('../../../src/models')

chai.use(chaiHTTP);


describe('Products route tests', function() {
  describe('/products route GET tests', function() {
    afterEach(function() {
      sinon.restore();
      });
    it('should return all products', async function(){
      sinon.stub(connection, 'execute').resolves([db]);
      const expectedDB = await productsModel.getAllProducts();
      expect(expectedDB).to.be.deep.equal(db);
    });
  
});
});