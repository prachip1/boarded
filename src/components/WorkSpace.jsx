import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../firebase';
import { collection, getDocs, addDoc, query, where, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { useUser } from './UserContext';
import OpenModal from "./OpenModal";
import Sidebar from "./Sidebar";
import { Trash2 } from 'react-feather';

const WorkSpace = () => {
    const [title, setTitle] = useState("");
    const [workSpaceName, setWorkSpaceName] = useState([]);
    const userCollectionRef = collection(db, 'workspace');
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const [createdworkspaceId, setCreatedWorkspaceId] = useState("");
    const [modalDisplay, setModalDisplay] = useState(false);

    useEffect(() => {
        const userId = user ? user.uid : sessionStorage.getItem("userId");
        if (!userId) {
            navigate('/');
        } else {
            getWorkspace(userId);
            sessionStorage.setItem("userId", userId);
        }
    }, [user, navigate, createdworkspaceId, modalDisplay]);

    const getWorkspace = async (userId) => {
        try {
            if (user) {
                const data = await getDocs(query(userCollectionRef, where('createdBy', '==', userId)));
                const workspaceData = data.docs.map(doc => {
                    const datadata = doc.data();
                    const createdAt = datadata.createdAt.toDate();
                    const formattedDate = createdAt.toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric'
                    });

                    return {
                        id: doc.id,
                        title: datadata.title,
                        createdAt,
                        formattedDate
                    };
                });

                // Sort workspace data by createdAt in descending order
                workspaceData.sort((a, b) => b.createdAt - a.createdAt);

                setWorkSpaceName(workspaceData);
            }
        } catch (error) {
            console.error("Error fetching workspaces: ", error);
        }
    };

    const workspaceCreation = async (title) => {
        try {
            if (user) {
                await addDoc(userCollectionRef, {
                    title: title,
                    createdBy: user.uid,
                    createdAt: serverTimestamp(),
                    username: user.displayName
                });
                setTitle("");
                getWorkspace(user.uid);
            }
        } catch (error) {
            console.error("Error creating workspace: ", error);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const deleteItem = (wid) => {
        const itemId = wid;
        setCreatedWorkspaceId({ ...createdworkspaceId, itemId });
        deleteDoc(doc(db, "workspace", itemId));
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
            <Sidebar createitems={<OpenModal displayClass="home-more-board-add" placeholder="My Workspace" modalbuttonText="Create" headerText="Create your workspace here!" onSubmit={(value) => workspaceCreation(value)} />} />
            <div className="flex flex-col justify-center items-center lg:mt-12 w-full lg:w-3/4 px-4">
             
               <div className="flex flex-col justify-center items-center ml-4">

         
          
                <div className="flex flex-col justify-center items-center 
                text-myblue w-full mt-12 lg:-mt-24 lg:mb-8">
                    
                    <h2 className="text-lg">Workspace</h2>
                    <p className="text-xs text-red-300">*please click on the title to visit the workspace page.</p>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start w-full mb-24 mt-8 lg:mt-4 lg:mb-0">
                    {workSpaceName?.length > 0 ? (
                        <div className="flex justify-center flex-wrap gap-6 mt-8 w-full">
                            {workSpaceName.map((works) => (
                                <div className="flex flex-col justify-center items-center 
                                w-64 h-52 p-12 mb-6 bg-mywhitetext border-2 
                                border-slate-200 rounded-md shadow-lg 
                                shadow-indigo-200/50 box-border" key={works.id}>
                                    <div>
                                        <button className='transition ease-in-out delay-150 p-4 rounded-md text-myblue hover:-translate-y-1 hover:scale-110 hover:bg-purple-200 duration-300'>
                                            <Link className="workspace-extra-css" to={`/${works.title}/${works.id}`} state={{ title: works.title }}>
                                                <h3>{works.title}</h3>
                                            </Link>
                                        </button>
                                    </div>
                                    <div className="flex w-full h-full justify-between gap-4 -mb-12 mt-20 pb-2 text-xs">
                                        <p className='text-xs -ml-8'>{works.formattedDate}</p>
                                        <Trash2 onClick={() => deleteItem(works.id)} className='cursor-pointer text-red-500 text-xs -mr-8 h-4' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="flex justify-center items-center text-xl font-normal mt-14 text-center w-full">
                            {user ? 'No workspaces created by you. 🥲' : 'You have not created any workspaces yet.'}
                        </p>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
};

export default WorkSpace;
