import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AddEmployee from './components/AddEmployee';




function App() {
  return (
    <Router>
        <Routes>
          <Route path="/add-employee" element={<AddEmployee/>} />
        </Routes>
        <Toaster />
    </Router>
  );
}

export default App;