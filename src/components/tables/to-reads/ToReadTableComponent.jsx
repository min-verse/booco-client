import React from 'react';
import ToReadRowComponent from './ToReadRowComponent';

function ToReadTableComponent({ readings }) {

    return (
        <>
            <div className="example2-table-height overflow-x-auto overflow-y-auto">

                <table className="table w-full">

                    <thead>

                        <tr>
                            <th className="text-zinc-800 bg-gray-400">To-Read Book List</th>
                            <th className="text-zinc-800 bg-gray-400"></th>
                            <th className="text-zinc-800 bg-gray-400"></th>
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

                                <td className="bg-zinc-100" style={{color:'gray'}}>
                                    No titles to read
                                    <br />
                                    <span className="badge badge-ghost badge-sm" style={{color:'gray'}}>N/A</span>
                                </td>
                                <td className="bg-zinc-100">
                                    <button className="btn btn-success" style={{ marginRight: 5 }} disabled>No books read</button>
                                </td>

                                <th className="bg-zinc-100">
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

export default ToReadTableComponent;