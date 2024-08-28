import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [currentState, setCurrentState] = useState('Sign Up');
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
                // Check for specific backend error messages
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
        <div>
            <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
                <div className='inline-flex gap-2 mb-2 mt-10 items-center'>
                    <p className='prata-regular text-3xl'>{currentState}</p>
                    <p className='w-1 sm:w-1 h-[2px] bg-[#414141]'></p>
                    <p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>
                </div>
                {currentState === 'Log In' ? null : (
                    <input
                        type="text"
                        name="name"
                        className='w-full px-3 py-2 border border-gray-800'
                        placeholder='Name'
                        value={formData.name}
                        onChange={onChangeHandler}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Email'
                    value={formData.email}
                    onChange={onChangeHandler}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Password'
                    value={formData.password}
                    onChange={onChangeHandler}
                    required
                />
                <div className='w-full flex justify-between text-sm mt-[-8px]'>
                    <p className='cursor-pointer'>Forget password?</p>
                    {currentState === 'Log In'
                        ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
                        : <p onClick={() => setCurrentState('Log In')} className='cursor-pointer'>Login here</p>
                    }
                </div>
                <button className='bg-black text-white my-8 px-8 py-3 text-sm active:bg-gray-700'>
                    {currentState === 'Log In' ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}

export default Login;
