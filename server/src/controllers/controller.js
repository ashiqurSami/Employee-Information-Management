const Employee = require("../models/Employee");

exports.addEmployee= async (req, res) => {
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
      res.status(201).json(newEmployee);
    } catch (err) {
        console.log(err.toString())
      res.status(400).json({ error: err.toString() });
    }
  }