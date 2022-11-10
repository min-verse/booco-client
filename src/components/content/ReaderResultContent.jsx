import React, { useEffect, useState } from 'react';
import SignupModal from '../SignupModal';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Hero, Button, Toast, Artboard } from 'react-daisyui';
import Typewriter from 'typewriter-effect';
import { useSelector, useDispatch } from 'react-redux';
import FriendTable from '../FriendTable';
import ReadingCard from '../ReadingCard';
import ReadingGallery from '../ReadingGallery';
import PendingTableComponent from '../PendingTableComponent';
import ToReadTableComponent from '../ToReadTableComponent';
import FriendTableComponent from '../FriendTableComponent';
import CompletedTableComponent from '../CompletedTableComponent';
import ExampleFriendTableComponent from '../ExampleFriendTableComponent';
import UserSearchForm from '../UserSearchForm';
import PostTableComponent from '../PostTableComponent';
import StatsComponent from '../StatsComponent';
import StatsVerticalComponent from '../StatsVerticalComponent';

function ReaderResultContent({ reader, status }) {

    const [visible, setVisible] = useState(false);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [goingToRead, setGoingToRead] = useState([]);

    const [readerSearch, setReaderSearch] = useState('');
    const [havePendings, setHavePendings] = useState(false);
    const user = useSelector((state) => state.user);
    console.log(reader);
    const { id, readings, to_reads, completed, friends, genres, moods, posts } = reader;
    const navigate = useNavigate();
    console.log(user);

    function goToReaderSearch(query) {
        navigate(`/readersearch?user=${query}`);
    }

    useEffect(() => {
        const newReading = user['readings'].filter((item) => {
            return item.status === "reading";
        });
        const newToRead = user['readings'].filter((item) => {
            return item.status === "to-read";
        });
        const newCompleted = user['readings'].filter((item) => {
            return item.status === "completed";
        });
        setCurrentlyReading(newReading);
        setGoingToRead(newToRead);

        if (user['pendings'] && user['pendings'].length && user['pendings'].length > 0) {
            setHavePendings(true);
        }
    }, [user]);

    const toggleVisible = () => {
        setVisible(!visible)
    };

    const handleReaderSearchChange = (e) => {
        const newSearchValue = e.target.value.toLowerCase();
        setReaderSearch(newSearchValue);
    };

    const handleReaderSearch = (e) => {
        e.preventDefault();
        const encoded = encodeURIComponent(readerSearch);
        goToReaderSearch(encoded);
    };

    const handleRemoveToast = () => {
        setHavePendings(false);
    }

    return (
        <>
            {status === "accepted" &&
                <div className="top-container-test" style={{marginBottom:30}}>
                    <ReadingGallery reading={readings} />
                    <div className="problem-div">
                        <FriendTableComponent friends={friends} />
                    </div>
                </div>
            }
            {status === "accepted" ?
                <div className="home-second-section">
                    <PostTableComponent className="column" posts={posts} />
                    <ToReadTableComponent className="column" readings={to_reads} />
                    <CompletedTableComponent className="column" readings={completed} />
                </div>
                :
                <div className="home-second-section">
                    <ToReadTableComponent className="column" readings={to_reads} />
                    <CompletedTableComponent className="column" readings={completed} />
                </div>
            }

            <div className="home-third-section">
                <StatsComponent
                    genres={user['genres']}
                    moods={user['moods']}
                    posts={user['posts']}
                    comments={user['comments']} />
                <StatsVerticalComponent
                    genres={user['genres']}
                    moods={user['moods']}
                    posts={user['posts']}
                    comments={user['comments']} />
            </div>
        </>
    )
}

export default ReaderResultContent;