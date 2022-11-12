import React from 'react';
import PostCard from './PostCard';

function PostList({posts}){


    return (
        <div className="post-card-container-overall">
        {posts.map((item) => {
                        return (
                            <PostCard
                                key={item.id}
                                post={item}
                            />
                        );
                    })}
        </div>
    );
}

export default PostList;