const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/connection');
const chaiHTTP = require('chai-http');
const { productServices } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const mock = require('../mocks/productServiceMock');
const allProductsMock = require('../mocks/allProductsModelMock');

chai.use(chaiHTTP);

describe('Products Service layer tests', function () {

  afterEach(function() {
    sinon.restore()
  });

  it('Should return type obj with All products on message Key', async () => {
    sinon.stub(productsModel, 'getAllProducts').resolves({ "id": 1, "name": "Martelo de Thor" });
    const expected = await productServices.getAllProducts();
    expect(expected).to.be.deep.equal({ type: null, message: { id: 1, name: 'Martelo de Thor' } });
  });

  it('Should type obj with product filtered by his ID does not exist', async () => {
    sinon.stub(productsModel, 'getProductById').resolves(allProductsMock[3]);
    const validIdTest = await productServices.getProductById(4);
    expect(validIdTest).to.be.deep.equal({
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    });
  });

  it('Should return the error when name in addProduct func is not valid', async() => {
    sinon.stub(productsModel, 'addProduct').resolves(allProductsMock[0]);
    const noName = await productServices.addProduct();
    const shortName = await productServices.addProduct('a');
    const validName = await productServices.addProduct('Martelo do Thor');
    expect(noName.type).to.be.deep.equal('EMPTY_NAME');
    expect(shortName.type).to.be.deep.equal('NAME_TOO_SHORT');
    expect(validName.message).to.be.deep.equal(allProductsMock[0])
  });

  it('Should type obj with product filtered by his ID', async () => {
    sinon.stub(productsModel, 'getProductById').resolves(allProductsMock[2]);
    const validIdTest = await productServices.getProductById(1);
    expect(validIdTest.message).to.be.deep.equal({
      "id": 3,
      "name": "Escudo do Capitão América"
    });
  });

  it('Should validate name args on updateProduct', async() => {
    sinon.stub(productsModel, 'updateProduct').resolves(allProductsMock);
    const noName = await productServices.updateProduct();
    const shortName = await productServices.updateProduct('a');
    const validName = await productServices.updateProduct('Martelo do Batman', 1);
    expect(noName.type).to.be.deep.equal('EMPTY_NAME');
    expect(shortName.type).to.be.deep.equal('NAME_TOO_SHORT');
    expect(validName.type).to.be.deep.equal(null);
  });

  it('Should validate id args on updateProduct', async() => {
    sinon.stub(productsModel, 'updateProduct').resolves(allProductsMock[4]);
    const noName = await productServices.updateProduct();
    const invalidId = await productServices.updateProduct('Martelo do Batman', 4);
    expect(invalidId.type).to.be.deep.equal('PRODUCT_NOT_FOUND')
  });

  
});