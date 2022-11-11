import React from 'react';
import ReadingGallery from '../ReadingGallery';
import ToReadTableComponent from '../ToReadTableComponent';
import FriendTableComponent from '../FriendTableComponent';
import CompletedTableComponent from '../CompletedTableComponent';
import PostTableComponent from '../PostTableComponent';
import StatsComponent from '../StatsComponent';
import StatsVerticalComponent from '../StatsVerticalComponent';

function ReaderResultContent({ reader, status }) {

    const { id, readings, to_reads, completed, comments, friends, genres, moods, posts } = reader;

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
                    genres={genres}
                    moods={moods}
                    posts={posts}
                    comments={comments} />
                <StatsVerticalComponent
                    genres={genres}
                    moods={moods}
                    posts={posts}
                    comments={comments} />
            </div>
        </>
    )
}

export default ReaderResultContent;