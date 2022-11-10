import React, { useState, useEffect } from 'react';
import FriendRowComponent from './FriendRowComponent';
import PendingRowComponent from './PendingRowComponent';
import ErrorAlert from './ErrorAlert';

function PendingTableComponent({ pendings }) {

    const [error, setError] = useState('');
    const handleError = (obj)=>{
        setError(obj);
    };

    return (
        <>
            <div className="example2-table-height overflow-x-auto overflow-y-auto">
                {error && error.length && error.length > 0 ?
                    <ErrorAlert id="auto-hide-message" errors={error} />
                    :
                    null}
                <table className="table w-full">

                    <thead>

                        <tr>
                            <th className="text-yellow-900 bg-amber-500">Pending Requests</th>
                            <th className="text-yellow-900 bg-amber-500"></th>
                            <th className="text-yellow-900 bg-amber-500"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-amber-100">

                        {pendings && pendings.length && pendings.length > 0 ?
                            pendings.map((pending) => {
                                return (
                                    <PendingRowComponent
                                        key={pending['friend']['id']}
                                        pendingData={pending['friend']}
                                        handleError={handleError}
                                    />
                                )
                            })
                            :
                            <tr>

                                <td className="bg-orange-50">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="https://i.imgur.com/KhYI6SH.jpg" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold" style={{ color: 'gray' }}>No Requests</div>

                                        </div>
                                    </div>
                                </td>
                                <td className="bg-orange-50">
                                    <button className="btn btn-success" style={{ marginRight: 5 }} disabled>No Requests</button>
                                </td>

                                <th className="bg-orange-50">
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

export default PendingTableComponent;