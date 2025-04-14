// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import CreateProject from './components/CreateProjects/CreateProjects';
import ManageProjects from './components/ManageProjects/ManageProjects';
import AssignProject from './components/AssignProject/AssignProject';
import CreateTask from './components/CreateTask/CreateTask';
import ManageTasks from './components/ManageTask/ManageTasks';
import AssignTasks from './components/AssignTasks/AssignTasks';
import ViewUsers from './components/ViewUsers/ViewUsers';
import ViewTasks from './components/ViewTasks/ViewTasks';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/admin/login" />} />

        {/* Public Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard Layout with nested routes */}
        <Route path="/admin" element={<Dashboard />}>
          <Route path="create-project" element={<CreateProject />} />
          <Route path="manage-projects" element={<ManageProjects />} />
          <Route path="assign-project" element={<AssignProject />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="manage-tasks" element={<ManageTasks />} />
          <Route path="assign-task" element={<AssignTasks />} />
          <Route path="users" element={<ViewUsers />} />
          <Route path="tasks" element={<ViewTasks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
