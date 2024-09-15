import axios from "axios";
const baseUrl = "http://localhost:5000/api/employee";

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

const fetchEmployees = async (page,limit,sortBy,order,searchName,searchEmail,searchMobile,searchDob) => {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        page,
        limit,
        sortBy,
        order,
        searchName: searchName,
        searchEmail: searchEmail,
        searchMobile: searchMobile.trim(), 
        searchDob: searchDob.trim(), 
      },
    });
    const { data, pagination } = response.data;
    return { data, pagination };

  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

export default {
  addEmployee,
 fetchEmployees,
};
