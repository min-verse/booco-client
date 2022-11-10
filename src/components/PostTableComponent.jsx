import React, { useState, useEffect } from 'react';
import FriendRowComponent from './FriendRowComponent';
import PendingRowComponent from './PendingRowComponent';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostRowComponent from './PostRowComponent';

function PostTableComponent({ posts }) {

    return (
        <>
            <div className="example2-table-height overflow-x-auto overflow-y-auto">

                <table className="table w-full">

                    <thead>

                        <tr>
                            <th className="sticky text-indigo-900 bg-indigo-300">Post Title</th>
                            <th className="sticky text-indigo-900 bg-indigo-300">Post Content</th>
                            <th className="sticky text-indigo-900 bg-indigo-300">Related Book</th>
                            <th className="sticky text-indigo-900 bg-indigo-300"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-amber-100">

                        {posts && posts.length && posts.length > 0 ?
                            posts.map((post) => {
                                return (
                                    <PostRowComponent
                                        key={post.id}
                                        post={post}
                                    />
                                )
                            })
                            :
                            <tr>

                                <td className="bg-indigo-50">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <span className="animate-spin"><FontAwesomeIcon style={{ color: 'white', marginLeft: 8 }} icon={faNoteSticky} /></span>
                                        </div>
                                        <div>
                                            <div className="font-bold" style={{color:'gray'}}>No posts made yet</div>

                                        </div>
                                    </div>
                                </td>
                                <td className="bg-indigo-50">
                                    <div className="font-bold" style={{color:'gray'}}>
                                    No post content
                                    </div>
                                </td>
                                <td className="bg-indigo-50" style={{color:'gray'}}>
                                    No posts
                                    <br />
                                    <span className="badge badge-ghost badge-sm">N/A</span>
                                </td>

                                <th className="bg-indigo-50">
                                    <button className="btn btn-ghost btn-xs bg-gray-200" disabled>No posts yet</button>
                                </th>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PostTableComponent;