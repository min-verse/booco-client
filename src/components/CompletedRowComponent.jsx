import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CompletedRowComponent({ book, status }) {

    const {id, title, author} = book;

    return (
        <>
            <tr>

                <td>
                {title}
                    <br />
                    <span className="badge badge-ghost badge-sm">{author}</span>
                </td>
                <td>
                <button className="btn btn-ghost btn-xs bg-gray-200" disabled>{status}</button>
                </td>

                <th>
                    <Link to={`/books/${id}`} className="btn btn-ghost btn-xs bg-gray-200">Details</Link>
                </th>
            </tr>
        </>
    )
}

export default CompletedRowComponent;