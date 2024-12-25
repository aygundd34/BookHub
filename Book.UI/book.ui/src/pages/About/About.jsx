import React from 'react';
import "./About.css";
import logo from "../../assets/BOOK HUB.png";
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="about-page">
            <header className="navbar">
                <img src={logo} alt="Book Hub Logo" className="logo" />
                <h1>Book Hub</h1>
                <nav>
                    <ul>
                        <li onClick={() => navigate('/')}>Home</li>
                        <li onClick={() => navigate('/about')}>About</li>
                        <li onClick={() => navigate('/books')}>Books</li>
                    </ul>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>About Book Hub</h1>
                    <p>Your journey to discovering amazing books starts here.</p>
                    <p>Explore our extensive library of books and find your next favorite read.</p>
                    <button className="cta-button" onClick={() => navigate('/books')}>Start Exploring</button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="feature-item">
                    <h3>Endless Collection</h3>
                    <p>Explore a vast collection of books across all genres.</p>
                </div>
                <div className="feature-item">
                    <h3>Recommendations</h3>
                    <p>Get personalized book recommendations based on your preferences.</p>
                </div>
                <div className="feature-item">
                    <h3>Community</h3>
                    <p>Join a community of passionate book lovers, share reviews, and discuss books.</p>
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Book Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
