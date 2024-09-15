import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import EditEmployee from './components/EditEmployee';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Navbar /> 
          </div>
          <div className="col-9">
            <Routes>
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/" element={<EmployeeList />} />
              <Route path="/edit-employee/:id" element={<EditEmployee />} />
            </Routes>
            <Toaster />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
