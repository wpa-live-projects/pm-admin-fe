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
      const res = await axios.get('http://localhost:5000/api/admin/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users');
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
        await axios.delete(`http://localhost:5000/api/admin/task/${id}`);
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
      await axios.put(`http://localhost:5000/api/admin/task/${editId}`, formData);
      setEditId(null);
      setFormData({ title: '', description: '', deadline: '', status: '', assignedTo: '' });
      fetchTasks();
      window.alert('Task updated successfully!');
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>

      {tasks.map(task => (
        <div key={task._id} className="border p-4 rounded mb-4 bg-gray-50">
          {editId === task._id ? (
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
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
                className="w-full border p-2 rounded"
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
                <button onClick={() => setEditId(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p>
                <strong>Assigned To:</strong>{' '}
                {task.assignedTo
                  ? `${task.assignedTo.name} (${task.assignedTo.email})`
                  : 'Not assigned'}
              </p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleEditClick(task)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(task._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageTasks;
