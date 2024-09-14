import axios from 'axios';
const baseUrl = "http://localhost:5000/api/employee";

const addEmployee=async(formData)=>{
    try {
      let data=await axios.post(`${baseUrl}/add-employee`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.status===200;
     
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  }


  export default {
    addEmployee
  };