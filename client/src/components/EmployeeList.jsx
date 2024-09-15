import React, { useState, useEffect } from 'react';
import EmployeeItem from './EmployeeItem';
import Pagination from './Pagination';
import SearchBar from './SearchBar';  
import service from '../service/service';  // Import the service

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputLimit, setInputLimit] = useState('10');
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
    loadEmployees();
  }, [page, limit, sortBy, order, search]);

  const loadEmployees = async () => {
    const data = await service.fetchEmployees({
      page,
      limit,
      sortBy,
      order,
      search,
    });

    if (data) {
      const { data: employees, pagination } = data;
      setEmployees(employees);
      const calculatedTotalPages = Math.ceil(pagination.total / pagination.limit);
      setTotalPages(calculatedTotalPages);
    }
  };

  const deleteEmployee = async (id) => {
    const success = await service.deleteEmployee(id);
    if (success) {
      setEmployees(employees.filter((employee) => employee._id !== id)); 
    } else {
      alert('Error deleting employee');
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
    setInputLimit(value);

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
              onDelete={() => deleteEmployee(employee._id)}  // Pass the delete handler to EmployeeItem
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
