import React from 'react';
import './BookCard.css';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    return (
        <div className="card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <button className="cta-button" onClick={() => navigate(`/book/${book.id}`)}>
                Details
            </button>
        </div>
    );
};

export default BookCard;
