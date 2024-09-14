import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeItem from './EmployeeItem';
import Pagination from './Pagination';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit as per project requirement
  const [totalPages, setTotalPages] = useState(1); // Total pages will be calculated
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchMobile, setSearchMobile] = useState('');
  const [searchDob, setSearchDob] = useState('');
  const [sortBy, setSortBy] = useState('fullname');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchEmployees();
  }, [page, sortBy, order, searchName, searchEmail, searchMobile, searchDob]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employee', {
        params: {
          page,
          limit,
          sortBy,
          order,
          searchName,
          searchEmail,
          searchMobile,
          searchDob
        }
      });

      const { data, pagination } = response.data; // Destructure pagination from response
      setEmployees(data); // Set employees for the current page

      // Calculate total pages based on total records and limit per page
      const calculatedTotalPages = Math.ceil(pagination.total / pagination.limit);
      setTotalPages(calculatedTotalPages); // Set the calculated total pages

    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Delete function
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Employee List</h1>
      
      {/* Search Inputs */}
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Mobile"
            value={searchMobile}
            onChange={(e) => setSearchMobile(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="date"
            className="form-control"
            placeholder="Date of Birth"
            value={searchDob}
            onChange={(e) => setSearchDob(e.target.value)}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={fetchEmployees}>Search</button>
        </div>
      </div>

      {/* Employee Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Photo</th>
            <th onClick={() => { setSortBy('fullname'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>
              Full Name {sortBy === 'fullname' && (order === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => { setSortBy('email'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>
              Email {sortBy === 'email' && (order === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => { setSortBy('mobile'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>
              Mobile {sortBy === 'mobile' && (order === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => { setSortBy('dob'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>
              Date of Birth {sortBy === 'dob' && (order === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeItem
              key={employee._id}
              employee={employee}
              onDelete={() => deleteEmployee(employee._id)}  // Pass delete handler
            />
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default EmployeeList;
