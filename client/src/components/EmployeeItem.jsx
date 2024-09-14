import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDeleteModal from './ConfirmDeleteModal'; 

const EmployeeItem = ({ employee, onDelete }) => {
  const [showModal, setShowModal] = useState(false); 

  // Function to open the modal
  const handleShowModal = () => setShowModal(true);

  // Function to close the modal
  const handleCloseModal = () => setShowModal(false);

  // Function to confirm deletion
  const handleConfirmDelete = () => {
    onDelete();  // Trigger delete function passed as a prop
    setShowModal(false); // Close modal after deletion
  };

  return (
    <>
      <tr>
        <td>
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
          {/* Delete button triggers the modal for confirmation */}
          <button onClick={handleShowModal} className="btn btn-sm btn-danger">
            Delete
          </button>
        </td>
      </tr>

      {/* Use the ConfirmDeleteModal component */}
      <ConfirmDeleteModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default EmployeeItem;
