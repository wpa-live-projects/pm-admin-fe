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
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/projects');
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
      await axios.post('http://localhost:5000/api/admin/project/assign', {
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
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Assign Project to User</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select User:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Choose User --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name || user.email}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Project:</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full p-2 border rounded"
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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Assign Project
      </button>
    </div>
  );
};

export default AssignProject;
