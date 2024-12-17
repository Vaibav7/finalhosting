import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Frontend = () => {
  const [formData, setFormData] = useState({
    EmployeeID: '',
    Name: '',
    Email: '',
    PhoneNumber: '',
    Department: '',
    DateOfJoining: '',
    Role: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.EmployeeID || formData.EmployeeID.length > 10)
      newErrors.EmployeeID = 'Employee ID must be <= 10 characters';
    if (!formData.Email.includes('@')) newErrors.Email = 'Valid Email is required';
    if (formData.PhoneNumber.length !== 10)
      newErrors.PhoneNumber = 'Phone number must be 10 digits';
    if (!formData.Department) newErrors.Department = 'Department is required';
    if (!formData.DateOfJoining || new Date(formData.DateOfJoining) > new Date())
      newErrors.DateOfJoining = 'Date cannot be in the future';
    if (!formData.Role) newErrors.Role = 'Role is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post('http://localhost:5000/employees', formData);
        setMessage(res.data.message);
        setErrors({});
        setFormData({
          EmployeeID: '',
          Name: '',
          Email: '',
          PhoneNumber: '',
          Department: '',
          DateOfJoining: '',
          Role: '',
        });
        // Redirect to success page and pass data
        navigate('/success', { state: formData });
      } catch (err) {
        setMessage(err.response?.data?.message || 'Submission failed');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <form
        className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 space-y-6 border-t-4 border-blue-500"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700">EMPLOYEE DETAILS</h1>
        {message && (
          <div className="text-green-600 text-center bg-green-100 p-2 rounded-lg mb-4">
            {message}
          </div>
        )}

        {/* Input fields */}
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label
              className="block mb-1 font-semibold text-gray-700 capitalize"
              htmlFor={key}
            >
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              id={key}
              type={key === 'DateOfJoining' ? 'date' : 'text'}
              value={formData[key]}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors[key] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
              }`}
            />
            {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Frontend;
