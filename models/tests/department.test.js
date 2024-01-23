const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should threw an error if no "name" arg', () => {
    const dep = new Department({});
    dep.validateSync(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should threw an error if "name" arg is smaller than 5 letters and longer than 20 letters', () => {
    const cases = ['Abc', 'test', '123456789098765432105'];

    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not threw an error if "name" arg is okay', () => {
    const comp = 'Production';
    const dep = new Department({ comp });

    dep.validateSync(err => {
      expect(err).to.not.exist;
    });
  });
});