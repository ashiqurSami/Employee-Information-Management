import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  console.log(id);
  const [employee, setEmployee] = useState({
    fullname: '',
    email: '',
    mobile: '',
    dob: '',
    photo: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        console.log(response.data);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
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
      formData.append('photo', employee.photo);
    }

    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Employee updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Employee</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" value={employee.fullname} onChange={handleChange} placeholder="Full Name" className="form-control mb-2" />
        <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" className="form-control mb-2" />
        <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} placeholder="Mobile" className="form-control mb-2" />
        <input type="date" name="dob" value={employee.dob.split('T')[0]} onChange={handleChange} placeholder="Date of Birth" className="form-control mb-2" />
        <input type="file" name="photo" onChange={handleFileChange} className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
