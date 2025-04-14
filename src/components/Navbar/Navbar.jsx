import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/logout');

      localStorage.removeItem('admin');
      localStorage.removeItem('adminId');
      alert('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      const message = error.response?.data?.error || 'Logout failed.';
      alert(message);
    }
  };

  return (
    <div className="bg-white shadow px-6 py-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-blue-700">Admin Dashboard</h2>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
