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

function HomeContent() {

    const [visible, setVisible] = useState(false);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [goingToRead, setGoingToRead] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [readerSearch, setReaderSearch] = useState('');
    const [havePendings, setHavePendings] = useState(false);
    const user = useSelector((state) => state.user);
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
        setCompleted(newCompleted);
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
            {/* <h1 style={{
                fontSize: 30,
                fontStyle: 'italic',
                paddingLeft: 50
            }}>Currently Reading</h1> */}
            <div className="top-container-test">

                <ReadingGallery reading={currentlyReading} />
                <div className="problem-div">
                    <UserSearchForm />
                    {/* <form className="p-2" onSubmit={handleReaderSearch}>
                        <input
                            type="text"
                            name="readerSearch"
                            value={readerSearch}
                            onChange={handleReaderSearchChange}
                            style={{ marginRight: 8, marginBottom: 5 }}
                            className="input input-bordered input-info w-full max-w-xs"
                            placeholder="Find fellow readers to add" />
                        <button type="submit" className="btn">Search</button>
                    </form> */}
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
            {/* <ReadingGallery reading={currentlyReading} />
                <div>
                    <form onSubmit={handleReaderSearch}>
                        <input
                            type="text"
                            name="readerSearch"
                            value={readerSearch}
                            onChange={handleReaderSearchChange}
                            placeholder="Find fellow readers to add" />
                        <button type="submit">Search</button>
                    </form>
                    {user['friends'] && user['friends'].length && user['friends'].length > 0 ?

                        <ExampleTableComponent />
                        :
                        <h1>
                            No fellow readers added yet! Look through our database to find others!
                        </h1>

                    } */}
            {/* {user['friends'] && user['friends'].length && user['friends'].length > 0 ?

                    <FriendTable friends={user['friends']} />
                    :
                    <h1>
                        No fellow readers added yet! Look through our database to find others!
                    </h1>

                } */}
            {/* <ExampleTableComponent /> */}
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
            {/* </div> */}
            {/* <div className="flex w-auto h-120 mx-4 space-x-10 flex-nowrap overflow-x-auto p-8 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl">
                {currentlyReading.map((item) => {
                    return (
                        <ReadingCard
                            key={item.id}
                            book={item.book}
                            progress={item.progress}
                        />
                    );
                })}
            </div> */}
        </>
    )
}

export default HomeContent;