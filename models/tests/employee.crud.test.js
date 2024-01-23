const mongoose = require('mongoose');
const Employee = require('../employee.model');
const expect = require('chai').expect;
const Department = require('../department.model');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testDepOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      await testDepOne.save();

      const testDepTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: 'Cleaning',
      });
      await testDepTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employee = await Employee.find();
      const expectedLength = 2;
      expect(employee.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "department" with "findOne" method', async () => {
      const employee = await Employee.findOne({ department: 'IT' });
      expect(employee).to.not.be.null;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: 'Tom',
        lastName: 'Smith',
        department: 'Sale',
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testDepOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      await testDepOne.save();

      const testDepTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: 'Cleaning',
      });
      await testDepTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: 'John' },
        { $set: { firstName: 'Johny' } }
      );
      const updatedEmployee = await Employee.findOne({
        firstName: 'Johny',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Amanda' });
      employee.department = 'HR';
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        department: 'HR',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { department: 'HR' } });
      const employees = await Employee.find();
      expect(employees[0].department).to.be.equal('HR');
      expect(employees[1].department).to.be.equal('HR');
    });
  });

  describe('Populating data', () => {
    beforeEach(async () => {
      const managementDepartment = new Department({ name: 'Management' });
      await managementDepartment.save();

      const cleaningDepartment = new Department({ name: 'Cleaning' });
      await cleaningDepartment.save();

      const testDepOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: managementDepartment._id,
      });
      await testDepOne.save();

      const testDepTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: cleaningDepartment._id,
      });
      await testDepTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });

    it('should populate "department" with actual department data', async () => {
      const employees = await Employee.find().populate('department');

      expect(employees[0].department.name).to.equal('Management');
      expect(employees[1].department.name).to.equal('Cleaning');
    });
  });
});