const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should threw an error if lack of any arguments', () => {
    const cases = [
      { firstName: 'John', department: 'IT' },
      { lastName: 'Doe', department: 'IT' },
      { firstName: 'John', lastName: 'Doe' },
      {},
      { firstName: 'John' },
    ];
    for (let person of cases) {
      const emp = new Employee({ person });
      emp.validateSync(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" is not a string', () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      const emp = new Employee({ firstName });

      emp.validateSync(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is not a string', () => {
    const cases = [{}, []];
    for (let lastName of cases) {
      const emp = new Employee({ lastName });

      emp.validateSync(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should throw an error if "department" is not a string', () => {
    const cases = [{}, []];
    for (let department of cases) {
      const emp = new Employee({ department });

      emp.validateSync(err => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not threw an error if all args are okay', () => {
    const employee = ['John', 'Doe', 'IT'];
    const emp = new Employee({ employee });

    emp.validateSync(err => {
      expect(err).to.not.exist;
    });
  });
});