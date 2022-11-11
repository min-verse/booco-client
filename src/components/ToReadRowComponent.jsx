import React from 'react';
import { Link } from 'react-router-dom';

function ToReadRowComponent({ book, status }) {

    const {id, title, author} = book;

    return (
        <>
            <tr>

                <td className="bg-zinc-100">
                {title}
                    <br />
                    <span className="badge badge-ghost badge-sm">{author}</span>
                </td>
                <td className="bg-zinc-100">
                <button className="btn btn-ghost btn-xs bg-gray-200" disabled>{status}</button>
                </td>

                <th className="bg-zinc-100">
                    <Link to={`/books/${id}`} className="btn btn-ghost btn-xs bg-gray-200">Details</Link>
                </th>
            </tr>
        </>
    )
}

export default ToReadRowComponent;