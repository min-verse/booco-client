import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function StatsComponent() {

    const [genre, setGenre] = useState('N/A');
    const [mood, setMood] = useState('N/A');
    const [postsMade, setPostsMade] = useState(0);
    const [commentsMade, setCommentsMade] = useState(0);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user['genres'] && user['genres'].length) {
            setGenre(Object.keys(user['genres']).reduce((a, b) => user['genres'][a] > user['genres'][b] ? a : b));
        }
        if (user['moods'] && user['moods'].length) {
            setMood(Object.keys(user['moods']).reduce((a, b) => user['moods'][a] > user['moods'][b] ? a : b));
        }

        if (user['posts'] && user['posts'].length) {
            setPostsMade(user['posts'].length);
        }

        if (user['comments'] && user['comments'].length) {
            setCommentsMade(user['comments'].length);
        }
    }, [user]);
    return (
        <>
            <div className="stat-component-horizontal bg-violet-50 my-12 stats shadow">

                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">Fav Genre</div>
                    <div className="stat-value text-primary">{genre}</div>
                    <div className="stat-desc">these books seem to be page turners</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>

                    </div>
                    <div className="stat-title">Fav Mood</div>
                    <div className="stat-value text-secondary">{mood}</div>
                    <div className="stat-desc">looks you've been feeling this way lately</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <img src="https://placeimg.com/128/128/people" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">{postsMade}</div>
                    <div className="stat-title">Posts made</div>
                    <div className="stat-desc text-secondary">and {commentsMade} comments</div>
                </div>

            </div>
        </>
    );
}

export default StatsComponent;