import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser, clearUser, setReadings, setFriends, setPosts, setComments, setPendings, setGenres, setMoods } from './state/user';

function LoginForm({ handleError }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToUserHome = ()=>{
        navigate("/home");
    }

    function handleEmailChange(e) {
        const newEmail = e.target.value;
        console.log(email);
        setEmail(newEmail);
    }

    function handlePasswordChange(e) {
        const newPassword = e.target.value;
        console.log(password);
        setPassword(newPassword);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    email: email,
                    password: password,
                },
            }),
        })
            .then((res) => {
                if (res.ok) {
                    console.log(res.headers.get("Authorization"));
                    localStorage.setItem("token", res.headers.get("Authorization"));
                    return res.json();
                } else {
                    return res.text().then((text) => Promise.reject(text));
                }
            })
            .then((data) => {
                setLoading(false);
                if (data['status']['code'] === 200) {
                    dispatch(setUser(data['data']));
                    dispatch(setReadings(data['data']));
                    dispatch(setFriends(data['data']));
                    dispatch(setPosts(data['data']));
                    dispatch(setComments(data['data']));
                    dispatch(setPendings(data['data']));
                    dispatch(setGenres(data['data']));
                    dispatch(setMoods(data['data']));
                    goToUserHome();
                } else {
                    handleError(data);
                }
            }).catch((err) => {
                setLoading(false);
                console.log(typeof err);
                handleError(err);
            });
    }

    return (
        <div className="mt-10 sm:mt-0">
            <div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <form onSubmit={handleSubmit}>
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">

                                    <div className="col-span-6">
                                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <input
                                            type="text"
                                            name="email-address"
                                            autoComplete="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            autoComplete="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                {loading ?
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        disabled>
                                        Loading...
                                    </button>
                                    :
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Visit Your Shelves &#128278;
                                    </button>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;