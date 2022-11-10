import React, { useEffect, useState } from 'react';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function PostRowComponent({ post }) {

    const { id, title, content, book } = post;
    const { author } = book;

    return (
        <>
            <tr>

                <td className="bg-indigo-50">
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <span><FontAwesomeIcon style={{ color: 'black', marginLeft: 8 }} icon={faNoteSticky} /></span>
                        </div>
                        <div>
                            <div className="font-bold">{title}</div>

                        </div>
                    </div>
                </td>
                <td className="bg-indigo-50">
                    <div className="font-bold">{content && content.length && content.length > 50 ? 
                    content.slice(0,50) + "..."
                    :
                    content
                    }</div>

                </td>
                <td className="bg-indigo-50">
                    {book['title']}
                    <br />
                    <span className="badge badge-ghost badge-sm">{author}</span>
                </td>

                <th className="bg-indigo-50">
                    <Link to={`/posts/${id}`} className="btn btn-ghost btn-xs bg-gray-200">See Post</Link>
                </th>
            </tr>
        </>
    )
}

export default PostRowComponent;