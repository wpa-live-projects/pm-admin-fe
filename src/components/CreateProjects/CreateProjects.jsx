// src/components/CreateProject.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedDeadline =
        new Date(deadline).toISOString().split('T')[0] + 'T00:00:00Z';

      await axios.post('https://pm-admin-be.onrender.com/api/admin/project', {
        title,
        description,
        deadline: formattedDeadline,
      });

      alert('✅ Project created successfully!');
      setTitle('');
      setDescription('');
      setDeadline('');
    } catch (error) {
      console.error(error);
      alert('❌ Failed to create project. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 px-4 py-6">
      <div className="w-[600px] h-[650px] bg-white rounded-2xl shadow-xl p-10 space-y-6 overflow-auto mx-auto mt-0">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Create New Project</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter project description"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
