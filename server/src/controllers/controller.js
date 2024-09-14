const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {
  const { fullname, email, mobile, dob } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    const newEmployee = new Employee({
      fullname,
      email,
      mobile,
      dob,
      photo,
    });
    await newEmployee.save();
    res.status(200).json(newEmployee);
  } catch (err) {
    console.log(err.toString());
    res.status(400).json({ error: err.toString() });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.toString() });
  }
};

exports.editEmployee = async (req, res) => {
  const { fullname, email, mobile, dob } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { fullname, email, mobile, dob, photo },
      { new: true }
    );
    res.status(200).json(employee);
  } catch (err) {
    console.log(err.toString());
    res.status(400).json({ error: err.toString() });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting employee" });
  }
};
