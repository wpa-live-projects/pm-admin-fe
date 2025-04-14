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

      await axios.post('http://localhost:5000/api/admin/project', {
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
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-2">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
