import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeItem from './EmployeeItem';
import Pagination from './Pagination';
import SearchBar from './SearchBar';  // Import SearchBar component

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit as per project requirement
  const [totalPages, setTotalPages] = useState(1); // Total pages will be calculated
  const [search, setSearch] = useState({
    name: '',
    email: '',
    mobile: '',  
    dob: ''    
  });
  const [sortBy, setSortBy] = useState('fullname');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchEmployees();
  }, [page, sortBy, order, search]);

  // Function to fetch employees based on search and pagination parameters
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employee', {
        params: {
          page,
          limit,
          sortBy,
          order,
          searchName: search.name,
          searchEmail: search.email,
          searchMobile: search.mobile.trim(),  // Ensure exact match for mobile
          searchDob: search.dob.trim()  // Ensure exact match for DOB
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

  // Handle search input changes from SearchBar
  const handleSearchChange = (name, value) => {
    setSearch((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      <h1>Employee List</h1>

      {/* SearchBar Component */}
      <SearchBar onSearchChange={handleSearchChange} />

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
