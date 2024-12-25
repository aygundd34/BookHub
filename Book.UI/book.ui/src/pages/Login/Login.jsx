import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // API'ye giriş isteği gönder
            const response = await axios.post('http://localhost:5094/api/User/login', {
                username,
                password,
            });

            const { token } = response.data;
            localStorage.setItem('token', token);

            // Token'den kullanıcı bilgilerini çöz
            const userData = JSON.parse(atob(token.split('.')[1]));
            setUser(userData);

            setMessage('Login successful! Redirecting...');
            setTimeout(() => navigate('/books'), 1500);
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Invalid username or password!'
            );
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setMessage('Logged out successfully.');
    };

    // Kullanıcı bilgilerini kontrol et
    const token = localStorage.getItem('token');
    const loggedInUser = token
        ? JSON.parse(atob(token.split('.')[1]))
        : null;

    return (
        <div className="login-container">
            <div className="login-form">
                {/* Eğer giriş yapılmışsa üstte hoş geldin mesajı */}
                {loggedInUser && (
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <p style={{ fontSize: '1.2rem', color: 'teal' }}>
                            Welcome, <strong>{loggedInUser.name}</strong>!
                        </p>
                    </div>
                )}

                <h2>Login</h2>
                {message && (
                    <p
                        style={{
                            color: message.includes('successful') ? 'green' : 'red',
                        }}
                    >
                        {message}
                    </p>
                )}

                {/* Eğer giriş yapılmışsa */}
                {loggedInUser ? (
                    <div>
                        <p>You are already logged in as <strong>{loggedInUser.name}</strong>.</p>
                        <button onClick={handleLogout}>Sign Out</button>
                    </div>
                ) : (
                    <>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="login-button" onClick={handleLogin}>
                            Login
                        </button>
                    </>
                )}

                {/* Login ve Register butonları her zaman görünür */}
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
