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
  const {
    page = 1,
    limit = 10,
    sortBy = "fullname",
    order = "asc",
    searchName = "",
    searchEmail = "",
    searchMobile = "",
    searchDob = "",
  } = req.query;

  console.log("fullname", searchName, " searchEmail", searchEmail);
  const sort = { [sortBy]: order === "asc" ? 1 : -1 };

  const searchQuery = {
    $and: [],
  };

  if (searchName && searchName.trim()) {
    searchQuery.$and.push({
      fullname: { $regex: searchName.trim(), $options: "i" }, // Case-insensitive regex for fullname
    });
  }

  if (searchEmail && searchEmail.trim()) {
    searchQuery.$and.push({
      email: { $regex: searchEmail.trim(), $options: "i" }, // Case-insensitive regex for email
    });
  }

  if (searchMobile && searchMobile.trim()) {
    searchQuery.$and.push({
      mobile: searchMobile.trim(), // Exact match for mobile
    });
  }

  if (searchDob && searchDob.trim()) {
    try {
      const dobDate = new Date(searchDob.trim());
      if (!isNaN(dobDate)) {
        searchQuery.$and.push({
          dob: searchDob.trim(),
        });
      }
    } catch (error) {
      console.log("Invalid DOB format: ", error);
    }
  }

  if (!searchQuery.$and.length) {
    delete searchQuery.$and;
  }

  console.log("Search Query:", JSON.stringify(searchQuery, null, 2));

  try {
    const employees = await Employee.find(searchQuery)
      .limit(parseInt(limit))
      .skip((page - 1) * parseInt(limit))
      .sort(sort);

    const count = await Employee.countDocuments(searchQuery);

    res.status(200).json({
      data: employees,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
