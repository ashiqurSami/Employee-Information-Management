import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeItem from './EmployeeItem';
import Pagination from './Pagination';
import SearchBar from './SearchBar';  

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputLimit, setInputLimit] = useState('10')
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
  }, [page, limit, sortBy, order, search]); 

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

      const calculatedTotalPages = Math.ceil(pagination.total / pagination.limit);
      setTotalPages(calculatedTotalPages); 

    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };


  const handleSearchChange = (name, value) => {
    setSearch((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleInputLimitChange = (e) => {
    const value = e.target.value;
    setInputLimit(value)

    if (value === '' || parseInt(value) < 1) {
      setLimit(1); 
    } else {
      setLimit(parseInt(value)); 
    }

    setPage(1); 
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
              onDelete={() => deleteEmployee(employee._id)} 
            />
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <div className="col-md-2 ">
          <label htmlFor="limit" className="form-label">Records per page</label>
          <input
            type="number"
            className="form-control"
            value={inputLimit}  
            onChange={handleInputLimitChange} 
            id="limit"
            placeholder="Records per page"
            min="1"
          />
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default EmployeeList;
