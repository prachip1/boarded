import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit3, Home, LogOut } from 'react-feather';
import { useUser } from './UserContext';

export default function Sidebar({ createitems }) {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="lg:bg-myblue text-white lg:w-1/4 lg:min-h-screen flex flex-col p-4">
      <div className="hidden lg:flex flex-col h-full">
        <div className="p-4 gap-6 mt-8">
          <ul>
            <li>
              <a href="/">boarded.</a>
            </li>
            <li className="text-sm mt-2">Welcome, {user?.displayName} 🥳</li>
          </ul>
        </div>
        <button className="mt-4 bg-white p-4 hover:bg-purple-200 flex justify-center hover:font-bold">
          {createitems}
        </button>
        <div className="flex flex-col mt-8 flex-grow">
          <ul className="flex flex-col gap-2">
            <li className="flex justify-start p-4 hover:bg-purple-200 hover:font-bold">
              <button
                className="flex items-center text-sm text-linkcolor"
                onClick={() => navigate('/workspace')}
              >
                <Home className="mr-2 w-4" />
                Workspaces
              </button>
            </li>
            <li className="flex justify-start p-4 hover:bg-purple-200 hover:font-bold">
              <button
                className="flex items-center text-sm text-linkcolor"
                onClick={() => navigate('/boards')}
              >
                <Edit3 className="mr-2 w-4" />
                Boards
              </button>
            </li>
            <li className="flex justify-start p-4 hover:bg-purple-200 mt-auto hover:font-bold">
              <button
                className="flex items-center text-sm text-linkcolor"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 w-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-myblue">
        <ul className="menu menu-horizontal bg-myblue rounded-box w-full justify-around">
          <li>
            <a className="hover:bg-indigo-200 hover:rounded-md">
              <button className="flex flex-col -mt-1 items-center text-base text-linkcolor h-5 w-5">
                {createitems}
              </button>
            </a>
          </li>
          <li>
            <a>
              <button
                className="flex flex-col items-center text-base text-sm gap-2 text-linkcolor"
                onClick={() => navigate('/workspace')}
              >
                <Home className="h-5 w-5" />
                Workspaces
              </button>
            </a>
          </li>
          <li>
            <a>
              <button
                className="flex flex-col items-center text-base text-sm gap-2 text-linkcolor"
                onClick={() => navigate('/')}
              >
                <Edit3 className="h-5 w-5" />
                Boards
              </button>
            </a>
          </li>
          <li>
            <a>
              <button
                className="flex flex-col items-center text-base text-sm gap-2 text-linkcolor"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
