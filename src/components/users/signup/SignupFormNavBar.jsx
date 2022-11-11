import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './state/user';

function SignupFormNavBar({ handleError }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    function handleExampleClick(e) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    function handleUsernameChange(e) {
        const newUsername = e.target.value;
        setUsername(newUsername);
    }

    function handleEmailChange(e) {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    function handlePasswordChange(e) {
        const newPassword = e.target.value;
        setPassword(newPassword);
    }

    function handleConfirmPasswordChange(e) {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            setLoading(false);
            handleError("Passwords do not match. Unable to register new reader.");
        } else {
            await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        email: email,
                        password: password,
                    },
                }),
            })
                .then(res => res.json())
                .then((data) => {
                    setLoading(false);
                    if (!data['status']['code']) {
                        handleError(data['status']['message']);
                    } else {
                        dispatch(setUser(data['data']));
                    }
                });
        }
    }

    return (
        <div className="mt-10 sm:mt-0">
            <div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <form id="sign-up-form-nav" onSubmit={handleSubmit}>
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">

                                    <div className="col-span-6">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            onChange={handleUsernameChange}
                                            value={username}
                                            autoComplete="username"
                                            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <input
                                            type="text"
                                            name="email-address"
                                            value={email}
                                            onChange={handleEmailChange}
                                            autoComplete="email"
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
                                            value={password}
                                            onChange={handlePasswordChange}
                                            autoComplete="password"
                                            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm-password"
                                            onChange={handleConfirmPasswordChange}
                                            value={confirmPassword}
                                            autoComplete="password"
                                            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                {loading ?
                                    <button

                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        disabled>
                                        <div className="animate-spin h-5 w-5 mr-3 ">&#128214;</div>
                                        Loading...
                                    </button>
                                    :
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >

                                        Start Reading &#128214;
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

export default SignupFormNavBar;