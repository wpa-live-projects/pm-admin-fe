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
      const res = await axios.get('http://localhost:5000/api/admin/projects');
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
      await axios.post('http://localhost:5000/api/admin/task', formData);
      alert('✅ Task created successfully!');
      setFormData({ title: '', description: '', deadline: '', projectId: '' });
    } catch (err) {
      console.error('Error creating task:', err);
      alert('❌ Failed to create task');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Assign to Project:</label>
          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
