const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ newDepartment });
    await newDepartment.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { name } = req.body;
  try {
    const dep = Department.findById(req.params.id);
    if (dep) {
      const updatedDep = await Department.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name } },
        { new: true }
      );
      if (updatedDep) {
        res.json({ updatedDepartment: updatedDep });
      } else {
        res.status(500).json({ message: 'Error updating department...' });
      }
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = Department.findById(req.params.id);
    if (dep) {
      const deletedDep = await Department.findOneAndDelete({
        _id: req.params.id,
      });
      res.json({ deletedDepartment: deletedDep });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};