import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, setReadings, setFriends, setPosts, setComments, setPendings, setGenres, setMoods } from './state/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as BoocoSvg } from '../assets/booco-logo.svg';
import { Navbar, Dropdown, Button, Menu, Form, Input } from 'react-daisyui';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

function NavBarUser() {

    const [registerVisible, setRegisterVisible] = useState(false);
    const [loginVisible, setLoginVisible] = useState(false);
    const [bookSearch, setBookSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function goToLanding() {
        navigate("/");
    }

    function goToResults(query) {
        navigate(`/browse?title=${query}`);
    }

    const toggleRegisterVisible = () => {
        setRegisterVisible(!registerVisible)
    };

    const toggleLoginVisible = () => {
        setLoginVisible(!loginVisible)
    }

    const handleSearchChange = (e) => {
        setBookSearch(e.target.value);
    }

    function handleSearch(e) {
        e.preventDefault();
        const encoded = encodeURIComponent(bookSearch);
        goToResults(encoded);
    }

    async function handleLogOut() {
        console.log('I\'ve been \n clicked');
        try {
            await fetch("http://localhost:5000/logout", {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.json().then((json) => Promise.reject(json));
                    }
                })
                .then((json) => {
                    console.dir(json);
                    localStorage.removeItem("token");
                    dispatch(clearUser());
                    goToLanding();
                })
                .catch((err) => alert(err));
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="flex w-full component-preview items-center justify-center gap-2 font-sans">
            <Navbar className='bg-base-300 bg-[#e0f2fe] p-5'>
                <Navbar.Start>
                    <Dropdown>
                        <Button color="ghost" tabIndex={0} className="lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </Button>
                        <Dropdown.Menu tabIndex={0} className="w-52 menu-compact mt-3">
                            <Dropdown.Item>
                                <Form className="w-8/12" onSubmit={handleSearch}>
                                    <Input
                                        onChange={handleSearchChange}
                                        value={bookSearch}
                                        name="search"
                                        bordered
                                        type="text"
                                        placeholder="Search Books" />
                                </Form>
                            </Dropdown.Item>
                            <Dropdown.Item><Button className="ml-4" onClick={handleLogOut}>Log Out</Button></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <BoocoSvg className="pb-1" />
                    <Link to="/home" className="btn btn-ghost normal-case text-xl">BOOCO</Link>
                    {/* <a className="btn btn-ghost normal-case text-xl">BOOCO</a> */}
                </Navbar.Start>
                <Navbar.End className="navbar-user-end">
                    {/* <h1 style={{marginRight:12}}>Welcome Back, {user['profile']['username']}</h1> */}
                    <Form onSubmit={handleSearch}>
                        <Input
                            onChange={handleSearchChange}
                            value={bookSearch}
                            name="search"
                            bordered
                            type="text"
                            placeholder="Search Books" />
                    </Form>
                    {loading ?
                        <Button className="ml-4" disabled>Logging Out... 
                        <span className="animate-spin"><FontAwesomeIcon style={{color:'white', marginLeft:8}} icon={faSpinner} /></span>
                        </Button>
                        :
                        <Button className="ml-4" onClick={handleLogOut}>Log Out</Button>
                    }
                </Navbar.End>
            </Navbar>
        </div>
    )
}

export default NavBarUser;