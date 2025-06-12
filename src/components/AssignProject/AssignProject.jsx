import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignProject = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://pm-admin-be.onrender.com/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get('https://pm-admin-be.onrender.com/api/admin/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleAssign = async () => {
    if (!selectedUser || !selectedProject) {
      alert('Please select both a user and a project');
      return;
    }

    try {
      await axios.post('https://pm-admin-be.onrender.com/api/admin/project/assign', {
        userId: selectedUser,
        projectId: selectedProject,
      });

      alert('Project successfully assigned! ✅');
      setSelectedUser('');
      setSelectedProject('');
    } catch (err) {
      console.error('Error assigning project:', err);
      alert('Failed to assign project ❌');
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-blue-100 to-blue-400">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mt-0">
        <h2 className="text-2xl font-bold text-center mb-6">Assign Project</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">-- Choose User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name || user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Select Project:</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">-- Choose Project --</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAssign}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-200"
        >
          Assign Project
        </button>
      </div>
    </div>
  );
};

export default AssignProject;
