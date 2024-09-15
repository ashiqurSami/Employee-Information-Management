import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    fullname: '',
    email: '',
    mobile: '',
    dob: '',
    photo: null,
  });
  const [loading, setLoading] = useState(true); // Loading state to handle data fetching
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`);
        const fetchedEmployee = response.data;
        setEmployee({
          ...fetchedEmployee,
          dob: fetchedEmployee.dob ? fetchedEmployee.dob.split('T')[0] : '',  // Format DOB for input
        });
        setLoading(false); // Data is fetched, stop loading
      } catch (error) {
        console.error('Error fetching employee:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEmployee((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', employee.fullname);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('dob', employee.dob);

    if (employee.photo) {
      formData.append('photo', employee.photo);  // Only append photo if it's changed
    }

    try {
      await axios.put(`http://localhost:5000/api/employee/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Employee updated successfully!');
      navigate('/');  // Redirect back to employee list after update
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee.');
    }
  };

  // If loading, show a loading message
  if (loading) {
    return <div className="container mt-4">Loading employee data...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Edit Employee</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="fullname" 
          value={employee.fullname} 
          onChange={handleChange} 
          placeholder="Full Name" 
          className="form-control mb-2" 
        />
        <input 
          type="email" 
          name="email" 
          value={employee.email} 
          onChange={handleChange} 
          placeholder="Email" 
          className="form-control mb-2" 
        />
        <input 
          type="text" 
          name="mobile" 
          value={employee.mobile} 
          onChange={handleChange} 
          placeholder="Mobile" 
          className="form-control mb-2" 
        />
        <input 
          type="date" 
          name="dob" 
          value={employee.dob || ''}  // Ensure DOB is correctly formatted for input
          onChange={handleChange} 
          placeholder="Date of Birth" 
          className="form-control mb-2" 
        />
        <input 
          type="file" 
          name="photo" 
          onChange={handleFileChange} 
          className="form-control mb-2" 
        />
        <button type="submit" className="btn btn-primary">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
