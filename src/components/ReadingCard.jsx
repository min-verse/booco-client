import React from 'react';
import { Progress } from 'react-daisyui';
import { Link } from 'react-router-dom';

function ReadingCard({ book, progress }) {

    const { id, title, author, cover } = book;

    return (
        <div className='reading-card'>
            <div className="reading-card-image-container">
                <img src={cover} className="reading-card-image" />
            </div>
            <div className="reading-card-info">
                <h1>{title}</h1>
                <small style={{ fontStyle: 'italic' }}>{author}</small>
            </div>
            <Progress className="w-56 my-2 progress-accent" value={progress} max={100} />
            <Link to={`/books/${id}`} className="btn reading-card-button">More Info</Link>
        </div>
    )
}

export default ReadingCard;