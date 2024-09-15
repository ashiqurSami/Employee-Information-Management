import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import defaultImage from "../assets/default.png";

const EmployeeItem = ({ employee, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleConfirmDelete = () => {
    onDelete(employee._id); // Pass employee ID here
    setShowModal(false);
  };

  const getFileName = (filePath) => {
    return filePath ? filePath.split("\\").pop() : null;
  };

  const photoFileName = getFileName(employee.photo);

  return (
    <>
      <tr>
        <td>
          <img
            src={
              photoFileName
                ? `http://localhost:5000/uploads/${photoFileName}`
                : defaultImage
            }
            alt={`Photo of ${employee.fullname}`}
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
