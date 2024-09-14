const express = require("express");
const { addEmployee, getEmployee, editEmployee, deleteEmployee, getEmployees } = require("../controllers/controller");
const { multerSetup } = require("../utility/multerSetup");

const router = express.Router();
const upload=multerSetup()


// GET: Get all employees with pagination, sorting, and search
router.get("/", getEmployees);

// GET: Get a single employee
router.get("/:id", getEmployee);

// POST: Add a new employee
router.post("/add-employee", upload.single("photo"), addEmployee);

// PUT: Edit employee details
router.put("/:id", upload.single("photo"), editEmployee);

// DELETE: Delete an employee
router.delete("/:id",deleteEmployee);

module.exports = router;
