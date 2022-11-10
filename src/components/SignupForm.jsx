import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser, clearUser, setReadings, setFriends, setPosts, setComments, setPendings, setGenres, setMoods } from './state/user';

function SignupForm({ handleError }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState('https://i.imgur.com/KhYI6SH.jpg');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToUserHome = ()=>{
        navigate("/home");
    }

    // const avatarHash = {
    //     "Default Avatar": "https://i.imgur.com/KhYI6SH.jpg",
    //     "Human - Azure": "https://i.imgur.com/5skGPs8.png",
    //     "Human - Magenta": "https://i.imgur.com/44ctm99.png",
    //     "Human - Citrus": "https://i.imgur.com/nFWDwXy.png",
    //     "Pigeon Beanie": "https://i.imgur.com/y3PH86q.png",
    //     "Pigeon Surf's Up": "https://i.imgur.com/bskXjBK.png",
    //     "Pigeon Masquerade": "https://i.imgur.com/gy1tAqU.png",
    //     "Cat - Purple": "https://i.imgur.com/Vf8YVwu.png",
    //     "Cat - Cyan": "https://i.imgur.com/zAb8VZN.png",
    //     "Cat - Yellow Visor": "https://i.imgur.com/Jq8NXNl.png"
    // };

    const handleSelectAvatar = (e) => {
        setAvatar(e.target.value);
    }

    function handleExampleClick(e) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    function handleUsernameChange(e) {
        const newUsername = e.target.value;
        console.log(username);
        setUsername(newUsername);
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

    function handleConfirmPasswordChange(e) {
        const newConfirmPassword = e.target.value;
        console.log(newConfirmPassword);
        setConfirmPassword(newConfirmPassword);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        // const form = document.getElementById('sign-up-form');
        // const formData = new FormData(form);
        // const userObj = {
        //     username: formData.get('username'),
        //     email: formData.get('email'),
        //     password: formData.get('password'),
        // };
        // let photoInput = document.getElementById('profile-photo-input');
        // if (photoInput.files[0]) {
        //     const uploadedPicture = photoInput.files[0];
        //     userObj['profilePicture'] = uploadedPicture;
        // }
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
                        avatar:avatar
                    }
                }),
            })
                .then(res => {
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
                    if (!data['status']['code']) {
                        handleError(data['status']['message']);
                    } else {
                        dispatch(setUser(data['data']));
                        goToUserHome();
                    }
                })
                .catch((err)=>{
                    setLoading(false);
                    handleError(err);
                });
        }
    }

    // async function exampleSubmit(e) {
    //     e.preventDefault();
    //     setLoading(true);
    //     const form = document.getElementById('sign-up-form');
    //     const formData = new FormData(form);
    //     const userObj = {
    //         username: formData.get('username'),
    //         email: formData.get('email'),
    //         password: formData.get('password'),
    //     };
    //     let photoInput = document.getElementById('profile-photo-input');
    //     if (photoInput.files[0]) {
    //         const uploadedPicture = photoInput.files[0];
    //         userObj['profilePicture'] = uploadedPicture;
    //     }
    //     if (password !== confirmPassword) {
    //         setLoading(false);
    //         handleError("Passwords do not match. Unable to register new reader.");
    //     } else {
    //         await fetch("http://localhost:5000/example_register", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 user: userObj
    //             }),
    //         })
    //             .then(res => res.json())
    //             .then((data) => {
    //                 setLoading(false);
    //                 console.log(data);
    //             });
    //     }
    // }

    return (
        <div className="mt-10 sm:mt-0">
            <div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <form id="sign-up-form" onSubmit={handleSubmit}>
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
                                            name="email"
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
                                            name="confirmPassword"
                                            onChange={handleConfirmPasswordChange}
                                            value={confirmPassword}
                                            autoComplete="password"
                                            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700">
                                            Select Avatar
                                        </label>
                                        <div class="sign-up-dropdown">
                                            <div className="mask mask-squircle w-12 h-12 sign-up-dropdown-option">
                                                <img src={avatar} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                            <select onClick={handleSelectAvatar} className="select w-full max-w-xs">
                                                <option value="https://i.imgur.com/KhYI6SH.jpg">Default Avatar</option>
                                                <option value="https://i.imgur.com/5skGPs8.png">Human - Azure</option>
                                                <option value="https://i.imgur.com/44ctm99.png">Human - Magenta</option>
                                                <option value="https://i.imgur.com/nFWDwXy.png">Human - Citrus</option>
                                                <option value="https://i.imgur.com/y3PH86q.png">Pigeon Beanie</option>
                                                <option value="https://i.imgur.com/bskXjBK.png">Pigeon Surf's Up</option>
                                                <option value="https://i.imgur.com/gy1tAqU.png">Pigeon Masquerade</option>
                                                <option value="https://i.imgur.com/Vf8YVwu.png">Cat - Purple</option>
                                                <option value="https://i.imgur.com/zAb8VZN.png">Cat - Cyan</option>
                                                <option value="https://i.imgur.com/Jq8NXNl.png">Cat - Yellow Visor</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* <div className="col-span-6">
                                        <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700">
                                            Upload Profile Picture
                                        </label>
                                        <input
                                            id="profile-photo-input"
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            name="profilePicture"
                                            multiple={false}
                                            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div> */}

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

export default SignupForm;