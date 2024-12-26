import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Student from '../literature/student/Student';
import './Login.css';

export const iAmSender = createContext();

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            const { token, message, userId } = response.data;
            setMessage(message);

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            setUserId(userId);
            setIsAuthenticated(true); 
            
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            if (decodedToken.role === 'admin') {
                navigate('/admin');
            } else if (decodedToken.role === 'user') {
                navigate('/user');
            }
        } catch (err) {
            setMessage('Invalid email or password');
            setIsAuthenticated(false); 
        }
    };

    useEffect(() => {
        if (userId) {
            console.log('Updated userId:', userId);
        }
    }, [userId]);

    return (
        <div>
            {!isAuthenticated ? (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    {message && <p>{message}</p>}
                    <p>
                Don't have an account?{' '}
                <Link to="/resister" style={{ color: 'blue', textDecoration: 'underline' }}>
                    Resister here
                </Link>
            </p>

                </div>
            ) : (
                <iAmSender.Provider value={userId}>
                    <Student />
                </iAmSender.Provider>
            )}
        </div>
    );
};

export default Login;
