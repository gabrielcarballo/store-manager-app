const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const { productServices } = require('../../../src/services');
const { productsController } = require('../../../src/controllers')
const allProductsMock = require('../mocks/allProductsModelMock');
const sinonChai = require('sinon-chai');
const { addProductsValidations } = require('../../../src/middlewares/validations')

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

    it('Should return the respective validations of name', async () => {
      sinon.restore();
      const req = {
        body: { name: '' },
        params: { id: 1 },
      };
      sinon.stub(productServices, 'updateProduct').resolves({
        type: 'EMPTY_NAME',
        message: '"name" is required',
      });
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns({
          type: 'EMPTY_NAME',
          message: '"name" is required',
        })
      }
      await productsController.updatedProduct(req, res);

      expect(res.status.calledOnceWith(400)).to.be.true;
    });


    it('Should return short name validations', async () => {
      sinon.restore();
      const req = {
        body: { name: 'aaa' },
        params: { id: 1 },
      };
      sinon.stub(productServices, 'updateProduct').resolves({
        type: 'NAME_TOO_SHORT',
        message: '"name" length must be at least 5 characters long',
      });
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns({
          type: 'NAME_TOO_SHORT',
          message: '"name" length must be at least 5 characters long',
        })
      }
      await productsController.updatedProduct(req, res);

      expect(res.status.calledOnceWith(422)).to.be.true;
    });

    it('Should return invalid ID validations', async () => {
      sinon.restore();
      const req = {
        body: { name: 'Doomhammer' },
        params: { id: 99999 },
      };
      sinon.stub(productServices, 'updateProduct').resolves({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      });
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns({
          type: 'PRODUCT_NOT_FOUND',
          message: 'Product not found',
        })
      }
      await productsController.updatedProduct(req, res);

      expect(res.status.calledOnceWith(404)).to.be.true;
    });

    it('Should return as expected when args are valid', async () => {
      sinon.restore();
      const req = {
        body: { name: 'Doomhammer' },
        params: { id: 1 },
      };
      sinon.stub(productServices, 'updateProduct').resolves({
        type: null,
        message: req.body,
      });
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns({
          type: null,
          message: req.body,
        })
      }
      await productsController.updatedProduct(req, res);

      expect(res.status.calledOnceWith(200)).to.be.true;
    });

  });



