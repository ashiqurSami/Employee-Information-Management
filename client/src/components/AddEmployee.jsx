import React, { useState } from 'react';
import service from '../service/service.js';
import toast from "react-hot-toast";
import Resizer from 'react-image-file-resizer'; // Import the resizer library

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    fullname: '',
    email: '',
    mobile: '',
    dob: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      Resizer.imageFileResizer(
        file,
        300,  
        300, 
        'JPEG',
        100, 
        0, 
        (uri) => {
          setEmployee((prev) => ({ ...prev, photo: uri }));
        },
        'blob' 
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', employee.fullname);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('dob', employee.dob);
    formData.append('photo', employee.photo); // Now we're adding the resized image

    const success = await service.addEmployee(formData);
    success ? toast.success('Employee added successfully') : toast.error('Error adding employee');

    setEmployee({
      fullname: '',
      email: '',
      mobile: '',
      dob: '',
      photo: null,
    });

    // Clear file input manually
    document.querySelector('input[name="photo"]').value = '';
  };

  return (
    <div className="container mt-4">
      <h3>Add Employee</h3>
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
          value={employee.dob} 
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
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
