import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    status: '',
    assignedTo: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('https://pm-admin-be.onrender.com/api/admin/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://pm-admin-be.onrender.com/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleEditClick = (task) => {
    setEditId(task._id);
    setFormData({
      title: task.title,
      description: task.description,
      deadline: task.deadline.slice(0, 10),
      status: task.status,
      assignedTo: task.assignedTo?._id || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`https://pm-admin-be.onrender.com/api/admin/task/${id}`);
        fetchTasks();
        window.alert('Task deleted successfully!');
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://pm-admin-be.onrender.com/api/admin/task/${editId}`, formData);
      setEditId(null);
      setFormData({ title: '', description: '', deadline: '', status: '', assignedTo: '' });
      fetchTasks();
      window.alert('Task updated successfully!');
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 px-80 py-2">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Manage Tasks</h2>

      {tasks.map(task => (
        <div key={task._id} className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          {editId === task._id ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditId(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
              <p className="text-gray-700 mt-1">{task.description}</p>
              <p className="text-sm mt-2 text-gray-600"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600"><strong>Status:</strong> {task.status}</p>
              <p className="text-sm text-gray-600">
                <strong>Assigned To:</strong>{' '}
                {task.assignedTo ? `${task.assignedTo.name} (${task.assignedTo.email})` : 'Not assigned'}
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleEditClick(task)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-md transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageTasks;
