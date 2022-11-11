import React, { useEffect, useState } from 'react';
import { Alert, Button, Toast } from 'react-daisyui';
import { useSelector, useDispatch } from 'react-redux';
import ReadingGallery from '../readings/ReadingGallery';
import PendingTableComponent from '../tables/pendings/PendingTableComponent';
import ToReadTableComponent from '../tables/to-reads/ToReadTableComponent';
import FriendTableComponent from '../tables/friends/FriendTableComponent';
import CompletedTableComponent from '../tables/completed/CompletedTableComponent';
import UserSearchForm from '../UserSearchForm';
import PostTableComponent from '../tables/posts/PostTableComponent';
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