import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeItem from './EmployeeItem';
import Pagination from './Pagination';
import SearchBar from './SearchBar';  

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const [totalPages, setTotalPages] = useState(1); 
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
          searchMobile: search.mobile.trim(),  
          searchDob: search.dob.trim()  
        }
      });

      const { data, pagination } = response.data; 
      setEmployees(data); 

      // Calculate total pages based on total records and limit per page
      const calculatedTotalPages = Math.ceil(pagination.total / pagination.limit);
      setTotalPages(calculatedTotalPages); 

    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };


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

      <SearchBar onSearchChange={handleSearchChange}/>

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

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default EmployeeList;
