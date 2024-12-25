import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Books from "./pages/Books/Books";
import BookDetails from './pages/BookDetails/BookDetails';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/HomePage/HomePage";
import About from "./pages/About/About";
import AddBook from "./pages/AddBook/AddBook"; 

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // JWT'den kullanıcı bilgilerini çöz
                const userData = JSON.parse(atob(token.split('.')[1]));
                setUser(userData);
            } catch (error) {
                console.error("Geçersiz token:", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Token'ı temizle
        setUser(null); // Kullanıcı bilgisini sıfırla
    };

    return (
        <Router>
            {/* Navbar her sayfada yer alır */}
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/about" element={<About />} />
                <Route path="/books" element={<Books user={user} />} />
                <Route path="/book/:id" element={<BookDetails user={user} />} />
                <Route path="/add-book" element={<AddBook />} /> {/* Yeni route */}
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register setUser={setUser} />} />
            </Routes>
        </Router>
    );
};

export default App;
