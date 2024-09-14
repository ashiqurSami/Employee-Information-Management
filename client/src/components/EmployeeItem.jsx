import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeItem = ({ employee, onDelete }) => {
  return (
    <tr>
      <td>
        {/* Displaying the employee photo */}
        <img 
          src={employee.photo ? `http://localhost:5000/uploads/${employee.photo}` : '/default-photo.png'} 
          alt="Employee" 
          width="50" 
          height="50" 
        />
      </td>
      <td>{employee.fullname}</td>
      <td>{employee.email}</td>
      <td>{employee.mobile}</td>
      <td>{new Date(employee.dob).toLocaleDateString()}</td>
      <td>
        {/* Edit button navigates to the edit form */}
        <Link to={`/edit-employee/${employee._id}`} className="btn btn-sm btn-primary mr-2">
          Edit
        </Link>
        {/* Delete button triggers the onDelete prop passed from EmployeeList */}
        <button onClick={onDelete} className="btn btn-sm btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeItem;
