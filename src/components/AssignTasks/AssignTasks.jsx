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
      const res = await axios.get('https://pm-admin-be.onrender.com/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get('https://pm-admin-be.onrender.com/api/admin/tasks');
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
      await axios.post('https://pm-admin-be.onrender.com/api/admin/task/assign', {
        taskId: selectedTask,
        userId: selectedUser,
      });

      window.alert('Task successfully assigned! ✅');
      setSelectedUser('');
      setSelectedTask('');
    } catch (err) {
      console.error('Error assigning task:', err);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-blue-100 to-blue-400">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mt-0">
        <h2 className="text-2xl font-bold text-center mb-6">Assign Task</h2>

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
          <label className="block mb-1 font-semibold">Select Task:</label>
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
          className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition duration-200"
        >
          Assign Task
        </button>
      </div>
    </div>
  );
};

export default AssignTask;
