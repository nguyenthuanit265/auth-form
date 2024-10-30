import React from 'react';
import {useState} from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from "./api";
import axiosInstance from "./axios";

const AuthForm = () => (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4 text-center">Welcome</h1>
            <div className="space-y-4">
                <Link to="/login"
                      className="block w-full text-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Login
                </Link>
                <Link to="/register"
                      className="block w-full text-center py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">
                    Register
                </Link>
            </div>
        </div>
    </div>
);

const HomePage = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-xl font-semibold text-gray-800">My Website</div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Welcome, {email || 'Guest'}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto mt-10 px-4">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to My Website</h1>
                    <p className="text-gray-600">
                        Thank you for joining us! Feel free to explore our features and content.
                    </p>
                </div>
            </main>
        </div>
    );
};

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('All fields are required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        try {
            const response = await axiosInstance.post(API_ENDPOINTS.SIGN_IN, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data) {
                setSuccess('Login successful!');
                localStorage.setItem('email', response.data?.data?.email);
                localStorage.setItem('accessToken', response.data?.data?.accessToken);
                setFormData({email: '', password: ''});
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <Link to="/" className="text-blue-500 hover:underline mb-4 block">Back to Home</Link>
                {error &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
                {success && <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
};

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required');
            return false;
        }
        if (formData.name.length < 2) {
            setError('Name must be at least 2 characters long');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        try {
            const response = await axiosInstance.post(API_ENDPOINTS.SIGN_UP, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data) {
                setSuccess('Registration successful!');
                setFormData({name: '', email: '', password: ''});
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                <Link to="/" className="text-blue-500 hover:underline mb-4 block">Back to Home</Link>

                {error &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
                {success && <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};
const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthForm/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    </BrowserRouter>
);

export default App;