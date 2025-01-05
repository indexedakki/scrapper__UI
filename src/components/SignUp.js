import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
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
            const response = await axios.post('https://scrapper-genai.onrender.com0/users', formData);

            console.log('User registered successfully');
            navigate('/LoginPage', { state: { formData } });
        } catch (error) {
            console.error('Error registering user:', error.response?.data || error.message);
            setError(error.message || 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };
    const handleLogin = () => {
        navigate('/LoginPage');
    };

    return (
        <div className="sign-up-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} disabled={isLoading}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <div className="button-container">
                    <div className="button-group">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`signup-btn ${isLoading ? 'loading' : ''}`}
                        >
                            {isLoading ? 'Registering...' : 'Sign Up'}
                        </button>
                    </div>
                    <div className="button-group">
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className={`login-btn ${isLoading ? 'loading' : ''}`}
                        >
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );

};

export default SignUpForm;
