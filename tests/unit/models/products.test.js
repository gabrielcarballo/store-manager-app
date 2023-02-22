const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const db = require('./mocks/productsMock');

const connection = require('../../../src/models/connection');
const chaiHTTP = require('chai-http');
const {
mainProductRoute,
addProduct,
productRouteByID,
} = require('../../../src/models/products.routes');

chai.use(chaiHTTP);



describe('Products route tests', async function() {
  describe('/products GET tests', async function() {
    /* beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(db);
    }); */
    it('should return all products', async function(){
      const db = sinon.stub(connection, 'execute').resolves(db);
      const expectedDB = mainProductRoute()
      expect(expectedDB).to.deep.equal(db);
    });
    it('should return a product filtered by id', async function(){

    });

    /* afterEach(function() {
      sinon.restore();
    }) */
  });
});