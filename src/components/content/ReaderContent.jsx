import React, { useEffect, useState } from 'react';
import SignupModal from '../SignupModal';
import { Link, useNavigate } from 'react-router-dom';
import { Hero, Button, Toast, Artboard } from 'react-daisyui';
import { setUser, clearUser, setReadings, setPendingsUpdate, setOutgoingsUpdate, setReadingsUpdate, setFriends, setPosts, setComments, setPendings, setGenres, setMoods } from '../state/user';
import Typewriter from 'typewriter-effect';
import ErrorAlert from '../ErrorAlert';
import { useSelector, useDispatch } from 'react-redux';
import ReadingCard from '../ReadingCard';
import BookCard from '../BookCard';
import PostList from '../PostList';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReaderResultContent from './ReaderResultContent';
import ChatModal from '../ChatModal';

function ReaderContent({ readerId }) {

    const [visible, setVisible] = useState(false);
    const [currentReader, setCurrentReader] = useState();
    const [error, setError] = useState('');
    const [friendStatus, setFriendStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const MySwal = withReactContent(Swal)
    console.log(currentReader);
    const goToLanding = () => {
        navigate("/");
    }
    const toggleVisible = () => {
        const newBool = !visible;
        console.log(newBool);
        setVisible(newBool);
    }

    function goToUserHome() {
        navigate("/home");
    }

    const handleRemoveFriend = async () => {
        console.log('I\'m clicked!');
        const confirmation = await MySwal.fire({
            title: <p>Are you sure you want to remove {currentReader['username'] ? currentReader['username'] : "this reader"} as a friend?</p>,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: `Remove ${currentReader['username'] ? currentReader['username'] : "this reader"}`,
            confirmButtonColor: '#ef4444'
        })

        if (confirmation['value']) {
            console.log("This code block is reached");
            // try {
            //     setLoading(true);
            //     let token = localStorage.getItem("token");
            //     if (token) {
            //         await fetch(`http://localhost:5000/friendships/${currentReader['id']}`, {
            //             method: 'DELETE',
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 Authorization: token,
            //             }
            //         }).then(res => res.json())
            //             .then((data) => {
            //                 console.log(data);
            //                 setLoading(false);
            //                 dispatch(setFriends(data));
            //             })
            //     }
            // } catch (err) {
            //     console.log(err);
            //     setLoading(false);
            //     setError(err);
            // }
        }
        // try {
        //     setLoading(true);
        //     let token = localStorage.getItem("token");
        //     if (token) {
        //         await fetch(`http://localhost:5000/friendships/${currentReader['id']}`, {
        //             method: 'DELETE',
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 Authorization: token,
        //             }
        //         }).then(res => res.json())
        //             .then((data) => {
        //                 setLoading(false);
        //                 dispatch(setFriends(data));
        //             })
        //     }
        // } catch (err) {
        //     setLoading(false);
        //     setError(err);
        // }

    }

    useEffect(() => {
        console.log('evoked');
        const getReader = async () => {
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`http://localhost:5000/reader_page`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({ reader: readerId })
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else if (res.status == "401") {
                            throw new Error("Unauthorized Request. Must be signed in.");
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        if (data['reader_self']) {
                            goToUserHome();
                        } else if (data['reader']) {
                            setCurrentReader(data['reader']);
                            setFriendStatus(data['status']);
                        }
                    })
                    .catch((err) => console.error(err));
            } else {
                goToLanding();
            }
        };
        getReader();
    }, [user]);

    const handleSendRequest = async () => {
        try {
            setLoading(true);
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`http://localhost:5000/friendships`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        id: readerId
                    })
                }).then(res => res.json())
                    .then((data) => {
                        console.log(data);
                        setError('');
                        setLoading(false);
                        dispatch(setOutgoingsUpdate(data));
                        console.log(data);
                        setFriendStatus("pending");
                    });
            } else {
                goToLanding();
            }
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return (
        <>
            {currentReader &&
                <>
                    <div style={{ margin: 20 }}>
                        <div className="reader-page-header">
                            {error && error.length && error.length > 0 ?
                                <ErrorAlert errors={error} />
                                :
                                null}
                            <div className="mask mask-squircle w-16 h-16">
                                <img src={currentReader['avatar'] ? currentReader['avatar'] : "https://i.imgur.com/KhYI6SH.jpg"} alt="Avatar Tailwind CSS Component" />
                            </div>
                            <h1 className="reader-result-username">{currentReader['username']}</h1>
                        </div>
                        <div>
                            {friendStatus !== "not friends" ?
                                <>
                                    {friendStatus === "accepted" ?
                                        <>
                                            {loading ?
                                                <>
                                                    <button className="btn reader-result-buttons" disabled>Removing...</button>
                                                    <button className="btn btn-success reader-result-buttons" disabled>Removing...</button>
                                                    <button className="btn btn-error reader-result-buttons" disabled>Removing...</button>
                                                </>
                                                :
                                                <>
                                                    <button className="btn reader-result-buttons" disabled>Already Friends</button>
                                                    <button onClick={toggleVisible} className="btn btn-success reader-result-buttons">Live Chat</button>
                                                    <ChatModal friend={currentReader} open={visible} toggle={toggleVisible} />
                                                    <button onClick={handleRemoveFriend} className="btn btn-error reader-result-buttons">Remove Friend</button>
                                                </>
                                            }
                                            {/* <button className="btn reader-result-buttons" disabled>Already Friends</button>
                                            <button onClick={toggleVisible} className="btn btn-success reader-result-buttons">Live Chat</button>
                                            <ChatModal friend={currentReader} open={visible} toggle={toggleVisible} />
                                            <button onClick={handleRemoveFriend} className="btn btn-error reader-result-buttons">Remove Friend</button> */}
                                        </>
                                        :
                                        <button className="btn" disabled>Pending</button>}
                                </>
                                :
                                sentRequest ?
                                    <button className="btn" disabled>Sent Request</button>
                                    :
                                    <button className="btn btn-success" onClick={handleSendRequest}>Send Friend Request</button>
                            }
                        </div>
                    </div>
                </>}

            {currentReader && <ReaderResultContent reader={currentReader} status={friendStatus} />}
        </>
    )
}

export default ReaderContent;