const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const { productServices } = require('../../../src/services');
const { productsController } = require('../../../src/controllers')
const allProductsMock = require('../mocks/allProductsModelMock');
const sinonChai = require('sinon-chai');
const {addProductsValidations} = require('../../../src/middlewares/validations')

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

  it('Should return 200 and filtered product', async () => {
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

  it('Should return updated product and status 200', async () => {
    const addedProduct = sinon.stub(productServices, 'updateProduct').resolves({
      type: null,
      message: "Martelo do Batman"
    });

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({
        "id": 4,
        "name": "Martelo do Batman"
      })
    };

    const req = {
      body:
      {
        "name": "Martelo do Batman"
      }
    };
    await productsController.addProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
  });



});

describe('Middleware validations tests', () => {
  it('should return a EMPTY NAME type obj after Validation if no name has been passed as arg', async () => {
    const isNameValid = await addProductsValidations();
    expect(isNameValid).to.be.deep.equal({
      type: 'EMPTY_NAME',
      message: '"name" is required',
    })
  });

  it('should return a NAME_TOO_SHORT type obj after Validation if short name has been passed as arg', async () => {
    const isNameValid = await addProductsValidations('aa');
    expect(isNameValid).to.be.deep.equal({
      type: 'NAME_TOO_SHORT',
      message: '"name" length must be at least 5 characters long',
    });
  });
})