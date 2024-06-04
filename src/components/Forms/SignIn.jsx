import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";


export default function SignIn() {
    const { login } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fireErrors, setFireErrors] = useState("");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const loggingIn = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setFireErrors("All fields are required");
            return;
        }

        try {
            await login(email, password);
        } catch (error) {
            setFireErrors(error.message);
            console.log(error.message);
        }
    }

    const signuppage = () => {
        navigate('/signup');
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, []);

    return (
        <div className="flex flex-col lg:flex-row w-screen h-screen bg-white">
            {screenWidth > 800 &&
                <div className="w-2/4">
                    <img src="/forlogin1.jpg" className='w-full h-full' />
                </div>
            }

            <div className="flex flex-col lg:w-2/4">
                <div className="flex justify-center items-center">
                    <img src="/boardedlogosmall.png" alt="logo" className='w-36 h-40' />
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-lg text-myblue font-md'>Login here!</h2>
                    <form className="flex lg:pl-28 lg:pr-28" onSubmit={loggingIn}>
                        <input
                            type="text"
                            className="w-full bg-white text-black border-2 border-slate-300 p-8 text-base focus:outline-none focus:border-purple-300"
                            placeholder="Email"
                            name="email"
                            onChange={event => setEmail(event.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full bg-white text-black border-2 border-slate-300 p-8 text-base focus:outline-none focus:border-purple-300"
                            placeholder="Password"
                            name="password"
                            onChange={event => setPassword(event.target.value)}
                        />
                        <input type="submit" className="w-full bg-myblue text-mytextwhite border-0 p-4 mt-4 text-base cursor-pointer hover:bg-hoverblue" value="Login" />
                    </form>
                </div>

                <div className="flex justify-center items-center">
                    Not Registered Yet?
                    <button onClick={signuppage} type="button" className="border-0 underline text-linkcolor cursor-pointer">Create an account</button>
                </div>

                <div className="flex justify-center items-center mt-6 ">
                    <p className='text-red-500 text-sm font-md'>{fireErrors}</p>
                </div>
            </div>
        </div>
    );
}
