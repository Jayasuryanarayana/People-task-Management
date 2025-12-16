import { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the backend registration API
            await API.post('/auth/register', formData);
            alert('Registration Successful! Please Login.');
            navigate('/'); // Redirect to Login Page
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Registration failed';
            alert('Error: ' + errorMsg);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text" 
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                            placeholder="John Doe" 
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                            placeholder="user@example.com" 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                            placeholder="••••••••" 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full rounded-md bg-green-600 py-2 text-white transition hover:bg-green-700"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/" className="text-blue-600 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;