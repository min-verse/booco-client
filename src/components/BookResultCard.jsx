import React, { useEffect, useState } from 'react';
import { setUser, clearUser, setReadings, setReadingsUpdate, setFriends, setPosts, setComments, setPendings, setGenres, setMoods } from './state/user';
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from './ErrorAlert';
import { Link } from 'react-router-dom';

function BookResultCard({ book }) {

    const [inLibrary, setInLibrary] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id, title, description, genres, moods, cover } = book;
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user['readings'] && user['readings'].length && user['readings'].length > 0) {
            const readBook = user['readings'].find(readingBook => readingBook['book']['id'] === id);
            if (readBook) {
                setInLibrary(true);
            }
        }
    }, [user]);

    const handleAddToReading = async ()=>{
        try {
            setLoading(true);
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`http://localhost:5000/readings`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        id: id,
                        status: 'reading'
                    })
                }).then(res => res.json())
                    .then((data) => {
                        setError('');
                        setLoading(false);
                        console.log(data);
                        setInLibrary(true);
                        dispatch(setReadingsUpdate(data));
                    });
            } else {
                alert("You are not logged in.");
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="book-result-card">
            <div className="book-result-image">
                <img src={cover} style={{objectFit:'cover'}}/>
            </div>
            <div>
            {error && error.length && error.length > 0 ?
                        <ErrorAlert errors={error} />
                        :
                        null}
                <h1 className="book-title">{title}</h1>
                <h3 style={{marginLeft:12}}>Sneak Peek:</h3>
                {description && description.length && description.length > 150 ?
                <p className="book-summary">{description.slice(0,150)+"..."}</p>
                :
                <p className="book-summary">{description}</p>
                }
                <p style={{marginLeft:12}}>genre(s): {genres.map((genre, index) => {
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
                <p style={{marginLeft:12}}>mood(s): {moods.map((mood, index) => {
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
                <div style={{marginTop:10, marginBottom:10}}>
                    <Link className="btn" to={`/books/${id}`} style={{marginRight:10, marginBottom:10}}>See More</Link>
                    {inLibrary ?
                        <button className="btn" disabled>Already Tracking</button>
                        :
                        loading ? 
                            <button className="btn" disabled>Adding...</button>
                            :
                            <button className="btn" onClick={handleAddToReading}>Add to Reading</button>
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default BookResultCard;