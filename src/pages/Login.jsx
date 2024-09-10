import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [currentState, setCurrentState] = useState('Log In');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const url = currentState === 'Sign Up'
            ? 'http://localhost:5000/api/auth/createuser'
            : 'http://localhost:5000/api/auth/login';

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (currentState === 'Sign Up') {
                toast.success('Signed Up Successfully');
                setFormData({ name: '', email: '', password: '' });
                localStorage.setItem('token', response.data.authToken);
                navigate('/'); // Redirect to home
            } else {
                if (response.data.success) {
                    localStorage.setItem('token', response.data.authToken);
                    toast.success('Logged In Successfully');
                    navigate('/'); // Redirect to home
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data.error) {
                    switch (error.response.data.error) {
                        case 'Email already in use. Please use a different email.':
                            toast.error('This email is already registered. Please use a different email.');
                            break;
                        case 'Invalid email or password.':
                            toast.error('Invalid email or password. Please try again.');
                            break;
                        case 'User not found.':
                            toast.error('No user found with this email.');
                            break;
                        default:
                            toast.error(`Error: ${error.response.data.message || 'Something went wrong'}`);
                            break;
                    }
                } else {
                    toast.error(`Error: ${error.response.data.message || 'Something went wrong'}`);
                }
            } else if (error.request) {
                console.error('Request error:', error.request);
                toast.error('No response from server. Please try again later.');
            } else {
                console.error('Error message:', error.message);
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    }

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="bg-white p-10 rounded-lg shadow-xl max-w-md w-full transform transition-transform hover:scale-105 duration-300 ease-in-out">
                <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-700">{currentState}</h2>
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
                    {currentState === 'Sign Up' && (
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 transform hover:scale-105"
                            placeholder="Name"
                            value={formData.name}
                            onChange={onChangeHandler}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 transform hover:scale-105"
                        placeholder="Email"
                        value={formData.email}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 transform hover:scale-105"
                        placeholder="Password"
                        value={formData.password}
                        onChange={onChangeHandler}
                        required
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-4">
                        <p className="cursor-pointer underline hover:text-blue-800">Forgot password?</p>
                        {currentState === 'Log In' ? (
                            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer underline hover:text-blue-800">Create an account</p>
                        ) : (
                            <p onClick={() => setCurrentState('Log In')} className="cursor-pointer underline hover:text-blue-800">Login here</p>
                        )}
                    </div>
                    <button type="submit" className="btnForWhiteBg">
                        {currentState === 'Log In' ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
