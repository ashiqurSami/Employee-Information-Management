import React from 'react';

const SearchBar = ({ onSearchChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onSearchChange(name, value);  // Pass search input back to EmployeeList
  };

  return (
    <div className="row mb-4">
      <div className="col-md-3">
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          placeholder="Name"
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          placeholder="Email"
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <input
          type="text"
          name="mobile"
          onChange={handleInputChange}
          placeholder="Mobile"
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <input
          type="date"
          name="dob"
          onChange={handleInputChange}
          placeholder="Date of Birth"
          className="form-control"
        />
      </div>
    </div>
  );
};

export default SearchBar;
