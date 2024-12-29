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
import UpdateBook from './pages/UpdateBook/UpdateBook'; // UpdateBook bileşenini import edin

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData = JSON.parse(atob(token.split('.')[1]));
                setUser(userData);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Kullanıcı bilgilerini localStorage'dan kaldır
        setUser(null);
    };

    return (
        <Router>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/about" element={<About />} />
                <Route path="/books" element={<Books user={user} />} />
                <Route path="/book/:id" element={<BookDetails user={user} />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/update-book/:bookId" element={<UpdateBook />} /> {/* UpdateBook rotasını ekleyin */}
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register setUser={setUser} />} />
            </Routes>
        </Router>
    );
};

export default App;