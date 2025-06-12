import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    projectId: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('https://pm-admin-be.onrender.com/api/admin/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://pm-admin-be.onrender.com/api/admin/task', formData);
      alert('✅ Task created successfully!');
      setFormData({ title: '', description: '', deadline: '', projectId: '' });
    } catch (err) {
      console.error('Error creating task:', err);
      alert('❌ Failed to create task');
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 px-4 py-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Task</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Project Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Project</label>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="">-- Select Project --</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200 font-semibold"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>

  );
};

export default CreateTask;
