// VerticalNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="d-flex flex-column vh-100 p-3 bg-light" style={{ width: '250px' }}>
      <h5 className="mb-4">Menu</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link active">
            Employees
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/add-employee" className="nav-link">
            Add Employee
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
