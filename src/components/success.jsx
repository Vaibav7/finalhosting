import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeData = location.state;

  // Redirect to form if no data is available
  if (!employeeData) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Form Submitted Successfully! 🎉
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Employee Details</h2>
        <ul className="space-y-2">
          {Object.entries(employeeData).map(([key, value]) => (
            <li key={key} className="text-gray-700">
              <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}: </strong>
              {value}
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
