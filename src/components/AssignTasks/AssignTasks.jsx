// src/components/AssignTask.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignTask = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleAssign = async () => {
    if (!selectedUser || !selectedTask) {
      window.alert('Please select both a user and a task');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/admin/task/assign', {
        taskId: selectedTask,
        userId: selectedUser,
      });

      window.alert('Task successfully assigned! ✅');
      setSelectedUser('');
      setSelectedTask('');
    } catch (err) {
      console.error('Error assigning task:', err);
      window.alert('Failed to assign task ❌');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Assign Task to User</h2>

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
        <label className="block mb-1 font-semibold">Select Task:</label>
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Choose Task --</option>
          {tasks.map((task) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Assign Task
      </button>
    </div>
  );
};

export default AssignTask;
