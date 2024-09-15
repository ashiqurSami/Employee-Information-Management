import axios from "axios";
const baseUrl = "http://localhost:5000/api/employee";

// Add Employee function
const addEmployee = async (formData) => {
  try {
    let data = await axios.post(`${baseUrl}/add-employee`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.status === 200;
  } catch (err) {
    console.error("Error adding employee:", err);
  }
};

// Fetch Employees function
const fetchEmployees = async ({ page, limit, sortBy, order, search }) => {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        page,
        limit,
        sortBy,
        order,
        searchName: search.name,
        searchEmail: search.email,
        searchMobile: search.mobile.trim(),
        searchDob: search.dob.trim(),
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching employees:", err);
    return null;
  }
};

// Fetch Employee by ID
const fetchEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching employee with id ${id}:`, err);
    return null;
  }
};

// Update Employee
const updateEmployee = async (id, formData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.status === 200;
  } catch (err) {
    console.error(`Error updating employee with id ${id}:`, err);
    return false;
  }
};

// Delete Employee function
const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.status === 200;
  } catch (err) {
    console.error(`Error deleting employee with id ${id}:`, err);
    return false;
  }
};

export default {
  addEmployee,
  fetchEmployees,
  fetchEmployeeById,  
  updateEmployee,     
  deleteEmployee,
};
