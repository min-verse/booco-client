import React, { useEffect, useState } from 'react';
import { Button, Progress } from 'react-daisyui';
import PostCard from './PostCard';
import { useDispatch } from 'react-redux';
import ErrorAlert from './ErrorAlert';
import { setUser, clearUser, setReadings, setReadingsUpdate, setFriends, setPosts, setComments, setPendings, setGenres, setMoods } from './state/user';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostList from './PostList';

function BookCard({ book }) {

    const { id, title, author, total_pages, publisher, year_published, genres, moods, description, cover, ISBN, posts } = book;
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [inReading, setInReading] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [visible, setVisible] = useState(false);
    const [bookPosts, setBookPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {

        setBookPosts(posts);
        if (user['readings'] && user['readings'].length && user['readings'].length > 0) {
            console.log(user['readings']);
            const readBook = user['readings'].find(readingBook => readingBook['book']['id'] === id);
            console.log(readBook);
            if (readBook) {
                setCurrentProgress(readBook['progress']);
                setInReading(true);
                setStatus(readBook['status']);
            }
        }

    }, [user]);

    const handleClick = () => {
        const newBool = !visible;
        setVisible(newBool);
    }

    const handleSelect = async (e) => {
        e.preventDefault();
        setLoading(true);
        const status = e.target['select-status'].value;
        try {
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
                        status: status
                    })
                }).then(res => res.json())
                    .then((data) => {
                        setError('');
                        setLoading(false);
                        console.log(data);
                        setStatus(status);
                        dispatch(setReadingsUpdate(data));
                    });
            } else {
                alert("You are not logged in.");
            }
        } catch (error) {
            setError(error);
        }
    }

    const handleReadingDelete = async () =>{
        setLoading(true)
        try{
            let token = localStorage.getItem("token");
            if(token){
                await fetch(`http://localhost:5000/readings/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    }
                }).then(res => res.json())
                    .then((data) => {
                        if (data['error']) {
                            setError(data['error']);
                        } else {
                            setError('');
                            setLoading(false);
                            setInReading(false);
                            console.log(data);
                            setStatus('');
                            dispatch(setReadingsUpdate(data));
                        }
                    });
            }
        }catch(error){
            setError(error);
        }
    };

    const handlePageSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const numberOfPages = e.target['pageCount'].value;
        try {
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`http://localhost:5000/change_page`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        id: id,
                        pageCount: numberOfPages
                    })
                }).then(res => res.json())
                    .then((data) => {
                        if (data['error']) {
                            setError(data['error']);
                        } else {
                            setError('');
                            setLoading(false);
                            console.log(data);
                            setStatus(status);
                            setCurrentProgress(numberOfPages);
                            dispatch(setReadingsUpdate(data));
                        }
                    });
            } else {
                alert("You are not logged in.");
            }
        } catch (error) {
            setError(error);
        }

    }

    return (
        <>
            <div className="book-top-container">
                <div className="book-card-image-container">
                    <img src={cover} className="book-card-image" />
                    {inReading &&
                        <div>
                            {status === "reading" &&
                                <>
                                    <Progress className="progress-accent bg-[#d1d5db]" value={currentProgress} max={100} />
                                    <form onSubmit={handlePageSubmit}>
                                        <input type="number" name="pageCount" min={0} max={total_pages} className="peer w-full" placeholder="Set pages read"></input>
                                        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                                            Page not in range {0} to {total_pages}.
                                        </p>
                                        <button type="submit" className="btn">Set Pages</button>
                                    </form>
                                </>
                            }
                            <small style={{ fontStyle: "italic" }}>Already in shelf</small>
                            <p className="btn" disabled>{status}</p>
                            {loading ? 
                            <button className="btn btn-error" disabled>Removing...</button>
                            :
                            <button onClick={handleReadingDelete} className="btn btn-error">Remove</button>
                            }
                        </div>}
                </div>
                <div className="book-inner-info">
                    {error && error.length && error.length > 0 ?
                        <ErrorAlert id="auto-hide-message" errors={error} />
                        :
                        null}
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
                                    <select name="select-status" className="select select-info w-full max-w-xs book-reading-select">
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

                </div>
            </div>
            {/* <div>
                {posts && posts.length && posts.length > 0 ? <>
                <PostList posts={bookPosts}/>
                    </>
                    :
                    <h1>no posts yet</h1>
                }
            </div> */}
        </>
    )
}

export default BookCard;