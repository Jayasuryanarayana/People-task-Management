import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await API.get('/tasks');
                setTasks(data);
            } catch (err) {
                navigate('/');
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/tasks', { title });
            setTasks([data, ...tasks]);
            setTitle('');
        } catch (err) {
            alert('Error adding task');
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (err) {
            alert('Error deleting task');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                    <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
                    <button 
                        onClick={handleLogout} 
                        className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
                
                {/* Add Task Input */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
                    <form onSubmit={handleAddTask} className="flex gap-2">
                        <input 
                            type="text" 
                            className="flex-1 rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                            placeholder="What needs to be done?" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            required
                        />
                        <button 
                            type="submit" 
                            className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                        >
                            Add
                        </button>
                    </form>
                </div>

                {/* Task List */}
                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <li key={task._id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
                            <div>
                                <p className="font-medium text-gray-800">{task.title}</p>
                                <span className={`text-xs uppercase font-bold ${task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                                    {task.status}
                                </span>
                            </div>
                            <button 
                                onClick={() => handleDelete(task._id)} 
                                className="text-red-500 hover:text-red-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </li>
                    ))}
                    {tasks.length === 0 && (
                        <p className="text-center text-gray-500 mt-10">No tasks yet. Add one above!</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;