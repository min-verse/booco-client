import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import SignupModal from './SignupModal';
import SignupModalNavBar from './SignUpModalNavBar';
import LoginModal from './LoginModal';
import { ReactComponent as BoocoSvg } from '../assets/booco-logo.svg';
import { Navbar, Dropdown, Button, Menu } from 'react-daisyui';

function NavBarLanding() {

    const [registerVisible, setRegisterVisible] = useState(false);
    const [loginVisible, setLoginVisible] = useState(false);

    const toggleRegisterVisible = () => {
        setRegisterVisible(!registerVisible)
    };

    const toggleLoginVisible = () => {
        setLoginVisible(!loginVisible)
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
                            <Dropdown.Item><Button onClick={toggleRegisterVisible} style={{ marginRight: 20 }} color="ghost">Sign Up</Button></Dropdown.Item>
                            <Dropdown.Item><Button onClick={toggleLoginVisible}>Log In</Button></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <BoocoSvg className="pb-1"/>
                    <a className="btn btn-ghost normal-case text-xl">BOOCO</a>
                </Navbar.Start>
                <Navbar.End className="navbar-landing-end">
                    <Button onClick={toggleRegisterVisible} style={{ marginRight: 20 }} color="ghost">Sign Up</Button>
                    
                    <Button onClick={toggleLoginVisible}>Log In</Button>
                    
                </Navbar.End>
                <SignupModal open={registerVisible} toggle={toggleRegisterVisible} />
                <LoginModal open={loginVisible} toggle={toggleLoginVisible} />
            </Navbar>
        </div>
    )
}

export default NavBarLanding;