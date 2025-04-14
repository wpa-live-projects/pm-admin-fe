// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4 space-y-6">
      <h1 className="text-xl font-bold border-b pb-4">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/admin/create-project">📝 Create Project</Link>
        <Link to="/admin/manage-projects">📁 Manage Projects</Link>
        <Link to="/admin/assign-project">📌 Assign Project</Link>
        <Link to="/admin/create-task">🆕 Create Task</Link>
        <Link to="/admin/manage-tasks">🛠️ Manage Tasks</Link>
        <Link to="/admin/assign-task">🗂️ Assign Tasks</Link>
        <Link to="/admin/users">👥 View Users</Link>
        <Link to="/admin/tasks">📊 View Tasks</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
