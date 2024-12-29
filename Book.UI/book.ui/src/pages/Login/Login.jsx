import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/BOOK HUB.png'; // Logo dosyasını import ettik
import './Login.css';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [storedUsername, setStoredUsername] = useState('');
    const navigate = useNavigate();

    // Component mount olduğunda localStorage'dan kullanıcı adını çek
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setStoredUsername(storedUser.username || storedUser.name); // Kullanıcı adını doğru al
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5094/api/User/login', {
                username,
                password,
            });

            const { token } = response.data;
            localStorage.setItem('token', token);

            // Token'i decode edip kullanıcı bilgilerini al
            let userData = JSON.parse(atob(token.split('.')[1]));
            console.log(userData); // Payload'ı konsola yazdır

            // Admin kullanıcı adı ve şifresi ile giriş yapılmışsa, role'ü admin olarak ayarla
            if (username === 'admin' && password === 'admin123') {
                userData = { ...userData, role: 'admin' };
            }

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData)); // Kullanıcı bilgilerini localStorage'a kaydet
            setStoredUsername(username); // Kullanıcı adını state'e kaydet

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
        localStorage.removeItem('user'); // Kullanıcı bilgilerini localStorage'dan kaldır
        setUser(null);
        setStoredUsername('');
        setMessage('Logged out successfully.');
    };

    const token = localStorage.getItem('token');
    const loggedInUser = token ? JSON.parse(atob(token.split('.')[1])) : null;

    return (
        <div className="login-page">
            <header className="navbar">
                <img src={logo} alt="Book Hub Logo" className="logo"/>
                <h1>Book Hub</h1>
                <nav>
                    <ul>
                        <li onClick={() => navigate('/')}>Home</li>
                        <li onClick={() => navigate('/about')}>About</li>
                        <li onClick={() => navigate('/books')}>Books</li>
                    </ul>
                </nav>
            </header>
            <div className="login-container">
                <div className="login-form">
                    {loggedInUser && storedUsername && (
                        <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                            <p style={{fontSize: '1.2rem', color: 'teal'}}>
                                Welcome, <strong>{storedUsername}</strong>!
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

                    {loggedInUser ? (
                        <div>
                            <p>You are already logged in as <strong>{storedUsername}</strong>.</p>
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

                    <div style={{ marginTop: '1rem', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button onClick={() => navigate('/register')}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;