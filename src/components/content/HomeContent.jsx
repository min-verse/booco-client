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
import UserSearchForm from '../UserSearchForm';
import PostTableComponent from '../PostTableComponent';
import StatsComponent from '../StatsComponent';
import StatsVerticalComponent from '../StatsVerticalComponent';

function HomeContent() {

    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [goingToRead, setGoingToRead] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [havePendings, setHavePendings] = useState(false);
    const user = useSelector((state) => state.user);

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
        setCompleted(newCompleted);
        if (user['pendings'] && user['pendings'].length && user['pendings'].length > 0) {
            setHavePendings(true);
        }
    }, [user]);

    const handleRemoveToast = () => {
        setHavePendings(false);
    }

    return (
        <>
            <div className="top-container-test">

                <ReadingGallery reading={currentlyReading} />
                <div className="problem-div">
                    <UserSearchForm />
                    <FriendTableComponent friends={user['friends']} />
                </div>
            </div>
            <div className="home-second-section">
                <PendingTableComponent className="column" pendings={user['pendings']} />
                <ToReadTableComponent className="column" readings={goingToRead} />
                <CompletedTableComponent className="column" readings={completed} />
            </div>
            <div className="home-third-section">
                <PostTableComponent posts={user['posts']} />
            </div>
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
            {havePendings &&
                <Toast vertical={'bottom'} horizontal={'end'}>
                    <Alert status="success">
                        <div className="w-full flex-row justify-between gap-2">
                            <h3>You have pending friend requests!</h3>
                        </div>
                        <Button color="ghost" onClick={handleRemoveToast}>
                            X
                        </Button>
                    </Alert>
                </Toast>
            }
        </>
    )
}

export default HomeContent;