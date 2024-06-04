// KanbanBoard.jsx
import React, { useEffect, useState } from 'react';
import "./Kanban.css";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import NewNav from './NewNav';
import CreateBoard from './CreateBoard';
import Board from './Board';
import { useUser } from './UserContext';


import EmailForm from './EmailForm';
import LinkGenModal from './LinkGenModal';

import {db} from '../firebase';
import {collection, getDocs, addDoc,query,updateDoc,deleteDoc,doc,where, getDoc, serverTimestamp} from 'firebase/firestore';

import InvitedUserView from './InvitedUserView';
import Hero from './Hero';
import HeroBoard from './HeroBoard';

const Kanban = () => {
  //const { workspaceId } = useParams();
  const { boardsId, boardTitle } = useParams();
 // const {title1} = useParams();
  const location = useLocation();
  //const { title } = location.state || {};
 // const { boardTitle } = location.state || {};
 const navigate = useNavigate();
  const {user,logout, invUserEmail}= useUser();
  const { title } = location.state || {}; /*this title is the workspace title coming from workspace page*/

  //const[showInvite, setShowInvite]= useState(false)
 
  //const invitedUserCollectionRef = collection(db, 'invitedUser');
  //const[invitedUserData, setInvitedUserData] = useState([]);
  useEffect(() => {


       // fetchCardsForBoard()
    }, [location,navigate,boardTitle,boardsId,user]);




  return (
    <div className='bg-white kanban-container'>
    <NewNav />
    <div className='kanban-main'>
      {/** <p>{boardTitle}</p> */}
     
     <div className='kanban-header'>
     <h2 className='text-myblue mb-4'>Kanban Board</h2>

       <HeroBoard pagetitle={"Boards"} workspacetitle={title} boardstitle={boardTitle} boardsId={boardsId} showthis={true} creating={true} />
    </div>
     <div className='kanban-board-display'>

 
     <Board />
     </div>
    </div>
     
 
       
      
       
   
    
      
   
    </div>
  );
};

export default Kanban;

