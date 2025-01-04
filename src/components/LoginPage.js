import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/checkUsers', formData);

            console.log('User logged in successfully');
            // You might want to store the token or user data here
            // For example:
            // localStorage.setItem('token', response.data.token);
            navigate('/HomePage', { state: { userData: response.data.user } });
        } catch (error) {
            console.error('Error logging in:', error.response?.data || error.message);
            setError(error.message || 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };
    const handleSignup = () => {
        navigate('/SignUp');
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} disabled={isLoading}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading} className={`login1-btn ${isLoading ? 'loading' : ''}`}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                <button
                    onClick={handleSignup}
                    disabled={isLoading}
                    className={`signup1-btn ${isLoading ? 'loading' : ''}`}
                >
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
