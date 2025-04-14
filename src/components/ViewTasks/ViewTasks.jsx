import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching admin tasks:', err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">All Tasks (Admin View)</h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="border p-4 rounded mb-4 shadow-sm bg-white">
            <h3 className="text-lg font-bold text-blue-700">{task.title}</h3>
            <p className="mt-1">{task.description}</p>
            <p className="mt-2"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p>
              <strong>Assigned To:</strong> 
              {task.assignedTo ? task.assignedTo.name || task.assignedTo.email : 'Not assigned'}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewTasks;
