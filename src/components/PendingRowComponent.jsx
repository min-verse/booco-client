import React, { useEffect, useState } from 'react';
import { setUser, clearUser, setReadings, setOutgoings, setFriends, setPosts, setComments, setPendings, setPendingsUpdate, setGenres, setMoods, setFriendsUpdate } from './state/user';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function PendingRowComponent({ pendingData, handleError }) {

    const { id, avatar, username } = pendingData;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    async function handleAccept(){
        try{
            setLoading(true);
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`http://localhost:5000/friendships/${id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    }
                }).then(res => res.json())
                    .then((data) => {
                        console.log(data);
                        setLoading(false);
                        handleError('');
                        dispatch(setPendings(data));
                        dispatch(setFriends(data));
                    });
            } else {
                setLoading(false);
                alert("You are not logged in.");
            }
        }catch(err){
            setLoading(false); 
            handleError(err);
        }
    }

    async function handleDecline(){
        try{
            setLoading(true);
            let token = localStorage.getItem("token");
            if (token) {
                await fetch(`http://localhost:5000/friendships/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    }
                }).then(res => res.json())
                    .then((data) => {
                    console.log(data);
                    if(!data['error']){
                        setLoading(false);
                        handleError('');
                        dispatch(setPendingsUpdate(data));
                    }else if(data['error']){
                        setLoading(false);
                        handleError(data['error']);
                    }
                    });
            } else {
                setLoading(false);
                alert("You are not logged in.");
            }
        }catch(err){
            setLoading(false); 
            handleError(err);
        }
    }

    return (
        <>
            <tr>

                <td className="bg-orange-50">
                    <div className="flex items-center space-x-3">
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
                <td className="bg-orange-50">
                    {loading ?
                        <>
                            <button className="btn" disabled>Loading ...</button>
                            <button className="btn" disabled>Loading ...</button>
                        </>
                        :
                        <>
                            <button onClick={handleAccept} className="btn btn-success" style={{ marginRight: 5 }}>Accept</button>
                            <button onClick={handleDecline} className="btn btn-error">Decline</button>
                        </>
                    }

                </td>

                <th className="bg-orange-50">
                    {loading ?
                        <button className="btn" disabled>Loading ...</button>
                        :
                        <Link to={`/readers/${id}`} className="btn btn-ghost btn-xs bg-gray-200">See Profile</Link>}
                </th>
            </tr>
        </>
    )
}

export default PendingRowComponent;