import React, { useState, useEffect } from 'react';
import FriendRowComponent from './FriendRowComponent';
import PendingRowComponent from './PendingRowComponent';
import ToReadRowComponent from '../ToReadRowComponent';

function CompletedTableComponent({ readings }) {

    return (
        <>
            <div className="example2-table-height overflow-x-auto overflow-y-auto">

                <table className="table w-full">

                    <thead>

                        <tr>
                            <th className="text-teal-900 bg-teal-300">Completed Books List</th>
                            <th className="text-teal-900 bg-teal-300"></th>
                            <th className="text-teal-900 bg-teal-300"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-amber-100">

                        {readings && readings.length && readings.length > 0 ?
                            readings.map((book) => {
                                return (
                                    <ToReadRowComponent
                                        key={book.id}
                                        book={book['book']}
                                        status={book.status}
                                    />
                                )
                            })
                            :
                            <tr>

                                <td style={{color:'gray'}}>
                                    No titles completed
                                    <br />
                                    <span className="badge badge-ghost badge-sm" style={{color:'gray'}}>N/A</span>
                                </td>
                                <td>
                                    <button className="btn btn-success" style={{ marginRight: 5 }} disabled>No books completed</button>
                                </td>

                                <th>
                                    <button className="btn btn-ghost btn-xs" disabled>N/A</button>
                                </th>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CompletedTableComponent;