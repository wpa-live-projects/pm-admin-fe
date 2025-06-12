// src/components/ViewUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://pm-admin-be.onrender.com/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 px-80 py-2">
      <h2 className="text-2xl font-bold mb-6 text-center">All Users (Admin View)</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div key={user._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-lg font-semibold text-blue-700">{user.name || 'No Name'}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role || 'User'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
