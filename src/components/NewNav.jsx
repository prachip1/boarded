import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { Menu, X } from 'react-feather';

export default function NewNav() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleNav = () => {
        setToggleMenu(!toggleMenu);
    };

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);

    const goLogin = () => {
        navigate('/signin');
    };

    const goRegister = () => {
        navigate('/signup');
    };

    const handleLinkClick = () => {
        setToggleMenu(false); // Close the menu when a link is clicked
    };

    return (
        <>
            <div data-theme="dracula" className="navbar flex mt-4 bg-white text-myblue w-full">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleNav}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        {toggleMenu && (
                            <ul className="flex flex-col menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 bg-white border-2 border-myblue">
                                {user ? (
                                    <>
                                        <li className='text-black text-base cursor-pointer'>Welcome, {user.displayName} 🥳</li>
                                        <li><button className='text-black text-base cursor-pointer' onClick={() => { navigate('/workspace'); handleLinkClick(); }}>Workspace</button></li>
                                        <li><button onClick={() => { handleLogout(); handleLinkClick(); }} className='text-black text-base cursor-pointer'>Logout</button></li>
                                    </>
                                ) : (
                                    <>
                                        <li><button onClick={() => { goLogin(); handleLinkClick(); }} className='text-black text-base cursor-pointer'>Login</button></li>
                                        <li><button onClick={() => { goRegister(); handleLinkClick(); }} className='text-black text-base cursor-pointer'>Register</button></li>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>
                    <a className="btn btn-ghost text-xl text-black">boarded.</a>
                </div>
                <div className="flex navbar-center hidden lg:flex">
                    <ul className="flex items-center menu menu-horizontal px-1">
                        {user ? (
                            <>
                                <li className='text-black text-base cursor-pointer'>Welcome, {user.displayName} 🥳</li>
                                <li><button className='text-black text-base cursor-pointer' onClick={() => navigate('/workspace')}>Workspace</button></li>
                                <li><button onClick={handleLogout} className='text-black text-base cursor-pointer btn btn-primary'>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><button onClick={goLogin} className='text-black text-base cursor-pointer btn btn-primary'>Login</button></li>
                                <li><button onClick={goRegister} className='text-black text-base cursor-pointer btn btn-ghost'>Register</button></li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="navbar-end"></div>
            </div>
        </>
    );
}
