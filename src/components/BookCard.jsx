import React, { useEffect, useState } from 'react';
import { Progress } from 'react-daisyui';
import { useDispatch } from 'react-redux';
import ErrorAlert from './ErrorAlert';
import { setReadingsUpdate } from './state/user';
import { useSelector } from 'react-redux';
import ProgressForm from './ProgressForm';
import BookCardTopContent from './BookCardTopContent';

function BookCard({ book }) {

    const { id, total_pages, cover, posts } = book;
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
            const readBook = user['readings'].find(readingBook => readingBook['book']['id'] === id);
            if (readBook) {
                setCurrentProgress(readBook['progress']);
                setInReading(true);
                setStatus(readBook['status']);
            }
        }

    }, [user]);

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

    const handleReadingDelete = async () => {
        setLoading(true)
        try {
            let token = localStorage.getItem("token");
            if (token) {
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
                            setStatus('');
                            dispatch(setReadingsUpdate(data));
                        }
                    });
            }
        } catch (error) {
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
                            setStatus(status);
                            setCurrentProgress(numberOfPages);
                            dispatch(setReadingsUpdate(data.reverse()));
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
                    <div>
                        <img src={cover} className="book-card-image" />
                    </div>
                    {inReading &&
                        <div className="progress-status-block">
                            <div>
                                {status === "reading" &&
                                    <>
                                        <Progress className="progress-accent bg-[#d1d5db]" value={currentProgress} max={100} />
                                        <ProgressForm handlePageSubmit={handlePageSubmit} total_pages={total_pages} />
                                    </>
                                }
                            </div>
                            <div className="status-container">
                                <div>
                                    <p className="in-shelf-text">Already in shelf</p>
                                </div>
                                <div className="status-buttons">
                                    <p className="btn status-buttons" disabled>{status}</p>
                                    {loading ?
                                        <button className="btn btn-error status-buttons" disabled>Removing...</button>
                                        :
                                        <button onClick={handleReadingDelete} className="btn btn-error status-buttons">Remove</button>
                                    }
                                </div>
                            </div>
                        </div>}
                </div>
                <div className="book-inner-info">
                    {error && error.length && error.length > 0 ?
                        <ErrorAlert id="auto-hide-message" errors={error} />
                        :
                        null}
                    <BookCardTopContent
                        book={book}
                        handleSelect={handleSelect}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    )
}

export default BookCard;