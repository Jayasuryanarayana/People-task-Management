import React, {useState} from 'react';
import API from '../api';
import {useNavigate, Link} from 'react-router-dom';

const Login = () => {
    const [formData , setFormData] = useState({email: '', password: ''});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await API.post('/auth/login',formData);
            localStorage.setItem('token', data.token);
            alert('Login Successful');
            navigate('/dashboard');
        }catch(err){
            alert('Invalid Credentials');
            setTimeout(navigate('/'),3000);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="user@example.com" 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="••••••••" 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                        />
                    </div>
                    <button type="submit"
                    className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
                    >Login</button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
                </p>


            </div>

        </div>
    );

};

export default Login;