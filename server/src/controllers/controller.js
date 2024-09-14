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
    res.status(400).json({ error: "Error deleting employee" });
  }
};

exports.getEmployees = async (req, res) => { 
  const { page = 1, limit = 10, sortBy = 'fullname', order = 'asc', searchName = '', searchEmail = '', searchMobile = '', searchDob = '' } = req.query;
  
  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };

  // Build dynamic search query
  const searchQuery = {
    $and: []
  };

  // Partial search for fullname
  if (searchName) {
    searchQuery.$and.push({
      fullname: { $regex: searchName, $options: 'i' }  // Case-insensitive partial search on fullname
    });
  }

  // Partial search for email
  if (searchEmail) {
    searchQuery.$and.push({
      email: { $regex: searchEmail, $options: 'i' }  // Case-insensitive partial search on email
    });
  }

  // Exact search for mobile
  if (searchMobile) {
    searchQuery.$and.push({
      mobile: searchMobile  // Exact match for mobile
    });
  }

  // Exact search for date of birth (ISO format)
  if (searchDob) {
    searchQuery.$and.push({
      dob: searchDob  // Exact match for dob
    });
  }

  // If there are no search parameters, remove the $and array to avoid unnecessary filtering
  if (!searchQuery.$and.length) {
    delete searchQuery.$and;
  }

  try {
    // Fetch employees with pagination, sorting, and searching
    const employees = await Employee.find(searchQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);

    // Get total count for pagination
    const count = await Employee.countDocuments(searchQuery);

    res.status(200).json({
      data: employees,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    res.status(400).json({ error: 'Something went wrong' });
  }
};
