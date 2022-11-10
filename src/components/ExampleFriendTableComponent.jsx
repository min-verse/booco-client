import React, { useState, useEffect } from 'react';
import FriendRowComponent from './FriendRowComponent';

function ExampleFriendTableComponent({ friends }) {

    return (
        <>
            <div className="example2-table-height overflow-x-auto overflow-y-auto">
                
                <table className="table w-full">
                    
                    <thead>
                        
                        <tr>
                            <th className="text-blue-900 bg-blue-300">Friend</th>
                            <th className="text-blue-900 bg-blue-300">Currently Reading</th>
                            <th className="text-blue-900 bg-blue-300"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-blue-100">

                        {friends && friends.length && friends.length > 0 ?
                            friends.map((friend) => {
                                return (
                                    <FriendRowComponent
                                        key={friend.id}
                                        friendData={friend}
                                    />
                                )
                            })
                            :
                            <div style={{
                                alignItem:"center",
                                justifyContent:"center"
                            }}>
                                No readers added as friends
                            </div>
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ExampleFriendTableComponent;