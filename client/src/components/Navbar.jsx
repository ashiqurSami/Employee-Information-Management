import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();  // Get the current location

  return (
    <div className="d-flex flex-column vh-100 p-3 bg-light" style={{ width: '250px' }}>
      <h5 className="mb-4">Menu</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Employees
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/add-employee"
            className={`nav-link ${location.pathname === '/add-employee' ? 'active' : ''}`}
          >
            Add Employee
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
