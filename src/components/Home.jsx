import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import SignIn from "./Forms/SignIn";
import SignUp from "./Forms/SignUp";
import HomeContent from './Imp/HomeContent';
import WorkSpace from './Imp/WorkSpace';
import FloxieBoard from './WorkSpace';
import NewNav from './NewNav';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Clock, PenTool, UserPlus } from 'react-feather';

export default function Home() {
    const [user, setUser] = useState(1);
    const [loading, setLoading] = useState(true);
    var [formSwitchervalue, setFormSwitcherValue] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, [user]);

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);

    return (
        <div data-theme="dracula" className='flex flex-col w-full h-100 bg-white font-raleway text-myblue overscroll-x-none'>
            <NewNav />
            <div className='flex flex-col justify-center items-center bg-white mb-40'>
                {/* First part of landing hero */}
                <div className="flex flex-col justify-center items-center w-full px-8 mb-24 mt-28">
                    <h3 className='text-5xl font-bold text-myblue leading-normal text-center'>Just unfussy and your <br /> simple Task Manager.</h3>
                    <p className='text-md mt-6 font-normal text-center'>Nothing fancy to impress you, but a <strong className='bg-primary p-2 rounded'>button click</strong> way to help plan your tasks.</p>
                    <button className='btn mt-12' onClick={() => { navigate("/signup") }}>Free Sign Up 🤜🏼</button>
                </div>

                {/* Second part of landing hero */}
                {screenWidth > 500 && (
                    <div className='flex justify-center items-center w-100'>
                        <img src='laptop-boarded-hero.jpg' className='h-80 w-full'  alt="Card Check" />
                    </div>
                )}
            </div>

            {/* Cards start here */}
            <div className='flex flex-col w-full -mt-48 lg:mt-14 justify-center items-center gap-8 mb-20 lg:mb-40'>
                <h2 className='text-xl font-bold'>What Can You Do Here?</h2>
                <div className='flex flex-col lg:flex-row gap-6'>
                    <div className="card bg-base-content border-2 border-myblue flex justify-center items-center w-80 h-96 bg-base-100 shadow-xl">
                        <div className='mt-8'><PenTool /></div>
                        <div className="flex flex-col justify-center items-center gap-6 mt-4">
                            <h2 className="text-lg font-bold mt-2">Create</h2>
                            <ul className='flex flex-col gap-2 text-sm list-disc'>
                                <li>Create a board for your WorkSpace.</li>
                                <li>Easy type and click.</li>
                                <li>Fluent Kanban Board.</li>
                                <li>Flawless flow to make the task easy.</li>
                            </ul>
                            <div className="flex justify-end">
                                <button className="btn btn-primary" onClick={() => { navigate("/signup") }}>Try It!</button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-content border-2 border-myblue flex justify-center items-center w-80 h-96 bg-base-100 shadow-xl">
                        <div className='mt-8'><Clock /></div>
                        <div className="flex flex-col justify-center items-center gap-6 mt-4">
                            <h2 className="text-lg font-bold mt-2">Track Your Progress</h2>
                            <ul className='flex flex-col gap-2 text-sm list-disc'>
                                <li>Arrange Your work.</li>
                                <li>Make a todo with cards.</li>
                                <li>Draggable Cards.</li>
                                <li>Simple but informative UI.</li>
                            </ul>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={() => { navigate("/signup") }}>Try It!</button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-content border-2 border-myblue flex justify-center items-center w-80 h-96 bg-base-100 shadow-xl">
                        <div className='mt-8'><UserPlus /></div>
                        <div className="flex flex-col justify-center items-center gap-6 mt-4">
                            <h2 className="text-lg font-bold mt-2">Share Your Work</h2>
                            <ul className='flex flex-col gap-2 text-sm list-disc'>
                                <li>Share your board.</li>
                                <li>Co-work</li>
                            </ul>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={() => { navigate("/signup") }}>Try It!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
