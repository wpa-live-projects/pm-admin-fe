import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', deadline: '' });

    const fetchProjects = async () => {
        try {
            const res = await axios.get('https://pm-admin-be.onrender.com/api/admin/projects');
            setProjects(res.data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://pm-admin-be.onrender.com/api/admin/project/${id}`);
            fetchProjects();
            alert('Project deleted successfully!');
        } catch (err) {
            console.error('Error deleting project:', err);
            alert('Failed to delete project. Please try again.');
        }
    };

    const startEditing = (project) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            description: project.description,
            deadline: project.deadline.split('T')[0],
        });
    };

    const handleUpdate = async () => {
        try {
            const updatedData = {
                ...formData,
                deadline: new Date(formData.deadline).toISOString().split('T')[0] + 'T00:00:00Z',
            };
            await axios.put(`https://pm-admin-be.onrender.com/api/admin/project/${editingId}`, updatedData);
            setEditingId(null);
            setFormData({ title: '', description: '', deadline: '' });
            fetchProjects();
            alert('Project updated successfully!');
        } catch (err) {
            console.error('Error updating project:', err);
            alert('Failed to update project. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 px-4 py-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Manage Projects</h2>

                {projects.map((project) => (
                    <div key={project._id} className="bg-white rounded-xl shadow-md p-6 mb-6">
                        {editingId === project._id ? (
                            <>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <input
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                                <p className="text-gray-700 mb-1">{project.description}</p>
                                <p className="text-sm text-gray-500">
                                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                                </p>
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => startEditing(project)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;
