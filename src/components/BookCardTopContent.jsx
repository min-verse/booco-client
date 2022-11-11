import React, { useEffect, useState } from 'react';

function BookCardTopContent({book, handleSelect, loading}) {

    const { id, title, author, total_pages, publisher, year_published, genres, moods, description, cover, ISBN, posts } = book;

    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        const newBool = !visible;
        setVisible(newBool);
    }

    return (
        <>
            <div className='book-card'>
                <div className="book-card-info book-title">
                    <h1 className="book-title">{title}</h1>
                    <small style={{ fontStyle: 'italic' }}>{author}</small>
                </div>
            </div>
            <div className="book-card">
                <div className="book-description">
                    <p className="book-summary">{description}</p>
                    <p>genre(s): {genres.map((genre, index) => {
                        if (index !== genres.length - 1) {
                            return (
                                <span key={index} className="genre-style">{genre}, </span>
                            );
                        } else {
                            return (
                                <span key={index} className="genre-style">{genre}</span>
                            );
                        }
                    })}</p>
                    <p>mood(s): {moods.map((mood, index) => {
                        if (index !== moods.length - 1) {
                            return (
                                <span key={index} className="mood-style">{mood}, </span>
                            );
                        } else {
                            return (
                                <span key={index} className="mood-style">{mood}</span>
                            );
                        }

                    })}</p>
                    
                </div>
                <div className="book-reading-button">

                    {loading ?

                        <select className="select select-info w-full max-w-xs book-reading-select" disabled>
                            <option>
                                &#128214;
                                Setting status...
                            </option>
                        </select>

                        :
                        <form onSubmit={handleSelect} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <select name="select-status" className="select select-info max-w-xs book-reading-select">
                                <option disabled defaultValue>Select status</option>
                                <option value="to-read">to-read</option>
                                <option value="reading">reading</option>
                                <option value="completed">completed</option>
                            </select>
                            <button type="submit" className="btn btn-active btn-ghost" style={{
                                fontSize: 'small',
                                marginLeft: 10
                            }}>Set Status</button>
                        </form>
                    }

                </div>
            </div>
            <div className="book-more-info">
                <button onClick={handleClick} className="book-more-info-button">more information</button>
                {visible &&
                    <ul className="book-extra-details">
                        <li>ISBN: {ISBN}</li>
                        <li>Year Published: {year_published}</li>
                        <li>Publisher: {publisher}</li>
                        <li>Total Pages: {total_pages}</li>
                    </ul>
                }
            </div>
        </>
    )
}

export default BookCardTopContent;