const express = require("express");
const { addEmployee, getEmployee, editEmployee } = require("../controllers/controller");
const { multerSetup } = require("../utility/multerSetup");
const router = express.Router();

const upload=multerSetup()

// // Helper function for pagination and sorting
// const getEmployees = async (req, res) => {
//   const {
//     page = 1,
//     limit = 10,
//     sortBy = "firstName",
//     order = "asc",
//     search = "",
//   } = req.query;
//   const sort = { [sortBy]: order === "asc" ? 1 : -1 };

//   try {
//     const employees = await Employee.find({
//       $or: [
//         { firstName: { $regex: search, $options: "i" } },
//         { lastName: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } },
//       ],
//     })
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .sort(sort);

//     const count = await Employee.countDocuments();
//     res.status(200).json({
//       data: employees,
//       pagination: {
//         total: count,
//         page: parseInt(page),
//         limit: parseInt(limit),
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// // GET all employees with pagination, sorting, and search
// router.get("/", getEmployees);

// // GET a single employee
router.get("/:id", getEmployee);

// POST: Add a new employee
router.post("/add-employee", upload.single("photo"), addEmployee);

// PUT: Edit employee details
router.put("/:id", upload.single("photo"), editEmployee);

// // DELETE: Delete an employee
// router.delete("/:id", async (req, res) => {
//   try {
//     await Employee.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Employee deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Error deleting employee" });
//   }
// });

module.exports = router;
