const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const { productServices } = require('../../../src/services');
const { productsController } = require('../../../src/controllers')
const allProductsMock = require('../mocks/allProductsModelMock');
const sinonChai = require('sinon-chai');

chai.use(sinonChai)
chai.use(chaiHTTP);


describe('Products Controller layer tests', function () {

  it('Should return 200 and all products', async () => {
    const allProducts = sinon.stub(productServices, 'getAllProducts').returns({ type: null, message: allProductsMock });
    const res = {
      status: sinon.stub().returns({
        json: sinon.stub().returns(allProductsMock),
      }),
    };
    const req = {};
    await productsController.getAllProducts(req, res);

    expect(allProducts.calledOnce).to.be.true;
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.status().json.calledOnceWith(allProductsMock)).to.be.true;
  })

  it('Should return 200 and filtered product', async() => {
    const filteredProduct = sinon.stub(productServices, 'getProductById').resolves({
      type: null,
      message: allProductsMock[0]
    })

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(allProductsMock[0])
    };
    const req = {
      params: { id: 1 }
    }

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

});