import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frontend from './components/form';
import SuccessPage from './components/success';

const App = () => {
  return (
    <Router>
      <div>
        {/* Header Section */}
        <header className="bg-black text-white text-center py-4">
          <h1 className="text-3xl font-bold">EMPLOYEE FORM</h1>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Frontend />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <footer className='bg-black flex-auto text-white text-center'> Created by Vaibav</footer>
      </div>
    </Router>
  );
};

export default App;
