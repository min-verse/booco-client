import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function FriendRowComponent({ friendData }) {

    const { friend, current_book } = friendData;

    const { id, avatar, username } = friend;
    const user = useSelector((state)=>state.user);

    return (
        <>
            <tr>

                <td className="bg-sky-50">
                    <div className="flex bg-sky-50 items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={avatar ? avatar : "https://i.imgur.com/KhYI6SH.jpg"} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{username}</div>

                        </div>
                    </div>
                </td>
                <td className="bg-sky-50">
                    {
                        current_book ?
                            current_book['title'].length > 30 ?
                                current_book['title'].slice(0, 30) + "..."
                                :
                                current_book['title']
                            :
                            <span style={{color:'gray'}}>No books yet</span>
                    }
                    {/* {title && title.length && title.length > 0 ?
                        title.length > 30 ?
                            title.slice(0, 30) + "..."
                            :
                            title
                        :
                        "No books added yet"
                    } */}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                        {current_book ?
                            current_book['author']
                            :
                            <span style={{color:'gray'}}>Not applicable</span>
                        }
                    </span>
                </td>

                <th className="bg-sky-50">
                    {user['profile']['id'] === id ? 
                    <button className="btn btn-ghost btn-xs bg-gray-200" disabled>
                    this is you
                    </button>
                    :
                    <Link to={`/readers/${id}`} className="btn btn-ghost btn-xs bg-gray-200">
                        details
                        </Link>}
                </th>
            </tr>
        </>
    )
}

export default FriendRowComponent;