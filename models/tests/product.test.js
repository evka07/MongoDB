const Product = require('../product.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Product', () => {
  it('should threw an error if lack of any arguments', () => {
    const cases = [{ client: 'Google' }, { name: 'Will' }, {}];
    for (let item of cases) {
      const pro = new Product({ item });
      pro.validateSync(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const pro = new Product({ name });

      pro.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "client" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const pro = new Product({ name });

      pro.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not threw an error if all args are okay', () => {
    const product = { name: 'Will', client: 'Amazon' };
    const pro = new Product({ product });

    pro.validateSync(err => {
      expect(err).to.not.exist;
    });
  });
});