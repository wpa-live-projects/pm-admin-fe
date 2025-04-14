import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar'; // adjust path if needed
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
