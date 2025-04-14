import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', deadline: '' });

    // Fetch all projects
    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/projects');
            setProjects(res.data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Delete project
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/project/${id}`);
            fetchProjects();
            alert('Project deleted successfully!');  // Show success message
        } catch (err) {
            console.error('Error deleting project:', err);
            alert('Failed to delete project. Please try again.');  // Show error message
        }
    };

    // Start editing
    const startEditing = (project) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            description: project.description,
            deadline: project.deadline.split('T')[0], // for input[type="date"]
        });
    };

    // Save update
    const handleUpdate = async () => {
        try {
            const updatedData = {
                ...formData,
                deadline: new Date(formData.deadline).toISOString().split('T')[0] + 'T00:00:00Z',
            };
            await axios.put(`http://localhost:5000/api/admin/project/${editingId}`, updatedData);
            setEditingId(null);
            setFormData({ title: '', description: '', deadline: '' });
            fetchProjects();
            alert('Project updated successfully!');  // Show success message
        } catch (err) {
            console.error('Error updating project:', err);
            alert('Failed to update project. Please try again.');  // Show error message
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Manage Projects</h2>

            {projects.map((project) => (
                <div key={project._id} className="border p-4 rounded mb-4 shadow-md bg-white">
                    {editingId === project._id ? (
                        <>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full mb-2 p-2 border rounded"
                            />
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full mb-2 p-2 border rounded"
                            />
                            <input
                                type="date"
                                value={formData.deadline}
                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                className="w-full mb-2 p-2 border rounded"
                            />
                            <button
                                onClick={handleUpdate}
                                className="bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="text-sm">{project.description}</p>
                            <p className="text-sm text-gray-500">
                                Deadline: {new Date(project.deadline).toLocaleDateString()}
                            </p>
                            <div className="mt-2">
                                <button
                                    onClick={() => startEditing(project)}
                                    className="bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default ManageProjects;
