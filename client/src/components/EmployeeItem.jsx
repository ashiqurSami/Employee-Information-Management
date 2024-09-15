import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const EmployeeItem = ({ employee, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleConfirmDelete = () => {
    onDelete();
    setShowModal(false);
  };

  return (
    <>
      <tr>
        <td>
          <img
            src={
              employee.photo
                ? `http://localhost:5000/uploads/${employee.photo}`
                : "/default-photo.png"
            }
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
          <Link
            to={`/edit-employee/${employee._id}`}
            className="btn btn-sm btn-primary mr-2"
          >
            Edit
          </Link>

          <button onClick={handleShowModal} className="btn btn-sm btn-danger">
            Delete
          </button>
        </td>
      </tr>

      <ConfirmDeleteModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default EmployeeItem;
