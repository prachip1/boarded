import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import LoaderPage from '../LoaderPage'; // Assuming LoaderPage is a component that shows the loading spinner


export default function SignUp() {
  const { register, loading } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fireErrors, setFireErrors] = useState("");
  const navigate = useNavigate();

  const registerNow = async (e) => {
    e.preventDefault();
 

    try {
      await register(username, email, password);
    } catch (error) {
      setFireErrors(error.message);
      console.log(error.message);
    }
  };

  const signinpage = () => {
    navigate('/signin');
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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
    <div className="flex flex-col lg:flex-row w-screen h-screen bg-white">
      {screenWidth > 800 &&
        <div className="w-2/4">
          <img src="/forsignup1.jpg" className='w-full h-full' />
        </div>
      }

      <div className='flex flex-col lg:w-2/4'>
        <div className='flex justify-center items-center'>
          <img src="/boardedlogosmall.png" alt="logo" className='w-36 h-40' />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-lg text-myblue font-md'>Register Here!</h2>
          <form className='flex lg:pl-28 lg:pr-28' onSubmit={registerNow}>

       
            <input
              type="text"
              className="w-full bg-white text-black border-2 border-slate-300 p-8 text-base focus:outline-none focus:border-purple-300"
              placeholder="Enter username"
              name="username"
              onChange={event => setUsername(event.target.value)}
            />
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
            <input type="submit" className="w-full bg-myblue text-mytextwhite border-0 p-4 mt-4 text-base cursor-pointer hover:bg-hoverblue" value="Register Now!" />
          </form>
        </div>

        <div className='flex justify-center items-center'>
          Already Registered?
          <button onClick={signinpage} type="button" className="border-0 underline text-linkcolor cursor-pointer">Sign In here</button>
        </div>
        <div className='flex justify-center items-center mt-6 '>
          <p className='text-red-500 text-sm font-md'>{fireErrors}</p>
        </div>
      </div>
    </div>
  );
}
