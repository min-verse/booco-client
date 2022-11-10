import React, { useState, useEffect } from 'react';
import FriendTableRow from '../FriendTableRow';

function FriendTable({ friends }) {


    return (
        <>

            <div className="flex flex-col h-screen">
                <div className="flex-grow overflow-auto">
                    <table className="table relative w-full border">
                        
                        <thead>
                            <tr>
                                <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300">Friend</th>
                                <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300">Currently Reading</th>
                                <th className="sticky top-0 px-6 py-3 text-blue-900 bg-blue-300">Details</th>
                                
                            </tr>
                        </thead>
                        <tbody className="divide-y bg-blue-100">
                            {friends.map((item)=>{
                                return (
                                    <FriendTableRow
                                        key={item.id}
                                        friend={item.friend}
                                        book={item['current_book']}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default FriendTable;