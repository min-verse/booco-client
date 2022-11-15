import React, { useEffect, useState } from 'react';
import { setOutgoingsUpdate } from '../state/user';
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from '../ErrorAlert';
import { Link, useNavigate } from 'react-router-dom';

function ReaderResultCard({ reader }) {

    const [inFriends, setInFriends] = useState(false);
    const [inPending, setInPending] = useState(false);
    const [inOutgoing, setInOutgoing] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id, username, avatar, readings } = reader;
    console.log(reader);
    const user = useSelector((state) => state.user);
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goToLanding = () => {
        navigate("/");
    }

    useEffect(() => {

        if (user['friends'] && user['friends'].length && user['friends'].length > 0) {
            const addedFriend = user['friends'].find(reader => reader['friend']['id'] === id);
            if (addedFriend) {
                setInFriends(true);
            }
        }

        if (user['pendings'] && user['pendings'].length && user['pendings'].length > 0) {
            const pendingFriend = user['pendings'].find(reader => reader['friend']['id'] === id);
            if (pendingFriend) {
                setInPending(true);
            }
        }

        if (user['outgoings'] && user['outgoings'].length && user['outgoings'].length > 0) {
            const outgoingFriend = user['outgoings'].find(reader => reader['friend']['id'] === id);
            if (outgoingFriend) {
                setInOutgoing(true);
            }
        }

    }, [user]);

    const handleSendRequest = async () => {
        try {
            setLoading(true);
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`https://booco-app.onrender.com/friendships`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }).then(res => res.json())
                    .then((data) => {
                        setError('');
                        setLoading(false);
                        dispatch(setOutgoingsUpdate(data));
                        console.log(data);
                        setInPending(true);
                    });
            } else {
                goToLanding();
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div>
            <div className="reader-result-card-container">
                {error && error.length && error.length > 0 ?
                    <ErrorAlert errors={error} />
                    :
                    null}
                <div className="reader-result-avatar">
                    <div className="mask mask-squircle w-16 h-16">
                        <img src={avatar ? avatar : "https://i.imgur.com/KhYI6SH.jpg"} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <h1 className="reader-card-result-username">{username}</h1>
                        <h3>Their Recent Reads:</h3>
                        {readings && readings.length ?
                            readings.length > 5 ?
                                <p className="reader-card-result-readings">{readings.map((book, index) => {
                                    if (index < 5) {
                                        return (
                                            <span className="reader-card-result-readings" key={index}>{book['book']['title']}, </span>
                                        );
                                    } else if (index === 5) {
                                        return (
                                            <span className="reader-card-result-readings" key={index}>{book['book']['title']}</span>
                                        );
                                    }
                                })}</p>
                                :
                                <p className="reader-card-result-readings">{readings.map((book, index) => {
                                    if (index < readings.length) {
                                        return (
                                            <span className="reader-card-result-readings" key={index}>{book['book']['title']}, </span>
                                        );
                                    } else {
                                        return (
                                            <span className="reader-card-result-readings" key={index}>{book['book']['title']}</span>
                                        );
                                    }
                                })}</p>
                            :
                            <p className="reader-card-result-readings" style={{color:'#a0a0a0'}}>This reader hasn't added any books yet</p>
                        }
                    </div>
                    <div style={{alignItems:'flex-end'}}>
                        <Link className="btn reader-result-card-button" to={`/readers/${id}`}>See Profile</Link>
                        {inFriends ?
                            <button className="btn reader-result-card-button" disabled>Already Friends</button>
                            :
                            inPending ?
                                <button className="btn reader-result-card-button" disabled>In Your Pending</button>
                                :
                                inOutgoing ?
                                    <button className="btn reader-result-card-button" disabled>Already Requested</button>
                                    :
                                    loading ?
                                        <button className="btn reader-result-card-button" disabled>Sending Request...</button>
                                        :
                                        <button className="btn reader-result-card-button btn-success" onClick={handleSendRequest}>Send Friend Request</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReaderResultCard;