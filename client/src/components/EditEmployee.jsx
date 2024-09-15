import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import service from '../service/service';  

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    fullname: '',
    email: '',
    mobile: '',
    dob: '',
    photo: null,
  });
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const fetchedEmployee = await service.fetchEmployeeById(id);  
        if (fetchedEmployee) {
          setEmployee({
            ...fetchedEmployee,
            dob: fetchedEmployee.dob ? fetchedEmployee.dob.split('T')[0] : '',  
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setLoading(false); 
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
      const success = await service.updateEmployee(id, formData);  
      if (success) {
        toast.success('Employee updated successfully');
        navigate('/');  // Redirect to employee list
      } else {
        toast.error('Error updating employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Error updating employee');
    }
  };

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
          value={employee.dob || ''}  
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