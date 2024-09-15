import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import EditEmployee from './components/EditEmployee';




function App() {
  return (
    <Router>
        <Routes>
          <Route path="/add-employee" element={<AddEmployee/>} />
          <Route path="/" element={<EmployeeList></EmployeeList>} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
        <Toaster />
    </Router>
  );
}

export default App;