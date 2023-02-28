const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/connection');
const chaiHTTP = require('chai-http');
const { productServices } = require('../../../src/services');


chai.use(chaiHTTP);
