import React, { useState, useEffect } from 'react'
import {useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import NewNav from './NewNav'
import OpenModal from './OpenModal'
import { useUser } from './UserContext';
import { MoreHorizontal,Clock,CheckSquare, Trash2, X } from 'react-feather';
import {db} from '../firebase';
import {collection, getDocs, addDoc,query,updateDoc,deleteDoc,doc,where, getDoc, serverTimestamp} from 'firebase/firestore';

import "./NewWorks.css";
import Sidebar from './Sidebar';
import Hero from './Hero';

export default function NewWorks() {
  const { user, logout, loggedInState} = useUser();
  const { workspaceId } = useParams();
 
  const location = useLocation();
  const { title } = location.state || {}; /*this title is the workspace title coming from workspace page*/
  const[boardName, setBoardName]= useState([]);
  const navigate = useNavigate();
  const boardCollectionRef = collection(db, `workspace/${workspaceId}/boards`);

  const [boardTitle, setBoardTitle] = useState("");
  const[createdworkspaceId, setCreatedWorkspaceId] = useState("");

  const boardCreation =async (boardTitle)=>{
    //e.preventDefault();
    try{
      if(user){
          await addDoc(boardCollectionRef,{
              
              boardTitle:boardTitle, 
              createdBy:user.uid,
             // createdAt: serverTimestamp(),
             createdAt: serverTimestamp(),
              username: user.displayName
          });
         // setTitle("");
          getWorkspace(user.uid);
        
      }
     
     
     }catch(error){}
     
  }


  useEffect(()=>{
    
    const userId = user ? user.uid : sessionStorage.getItem("userId");
    if (!userId) {
        navigate('/');
    } else {
        getWorkspace(userId);
        sessionStorage.setItem("userId", userId);
    }
     
     
  },[user,navigate, createdworkspaceId]);


  const getWorkspace = async (userId) =>{

    try{
      console.log("Fetching workspaces for user:", userId);
          if(user){
            const data= await getDocs(query(boardCollectionRef, where('createdBy', '==' , userId)));

            console.log("data from back", data);
           // console.log("this is giving user id",userId);
          //const workspaceData = data.docs.map(doc=>({
           // id:doc.id,
          //  title:doc.data().title,
          //  createdAt: doc.data().createdAt.toDate()
        //})
              
           //  );
            //setWorkSpaceName(workspaceData)
             // console.log("this is the workspace name",workSpaceName.title);
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
                  boardTitle: datadata.boardTitle,
                  createdAt: formattedDate
              };
          });
          console.log("Workspace data:", workspaceData);
          setBoardName(workspaceData);
          }
          
       console.log({boardName})
            
        
     
          //setWorkSpaceName(workData);
          
      }catch(error){

      }

    }


    const deleteItem = (wid)=>{
      const itemId = wid;
      setCreatedWorkspaceId({...createdworkspaceId,itemId})
      deleteDoc(doc(db,`workspace/${workspaceId}/boards`,itemId));
      console.log("delete");
    }





  return (
    <div className='flex flex-col lg:flex-row w-full min-h-screen bg-white'>
     
     <Sidebar createitems = { <OpenModal displayClass="home-more-board-add" placeholder="My Board" modalbuttonText = "Create" headerText="Create your board here!" onSubmit={(value) => boardCreation(value)} />} ></Sidebar>
    
      {/*workspace new works display */}
    <div className='flex flex-col justify-center items-center lg:mt-12 w-full lg:w-3/4 px-4'>
    <div className="flex flex-col justify-center items-center -ml-4">
    <div className="flex flex-col justify-center items-center text-myblue w-full mt-12 lg:-mt-24 lg:mb-8">
           <h2 className="text-lg">Boards</h2>
           <p className="text-xs text-red-300">*please click on the title to visit the board.</p>
           </div>
           <div className='flex flex-col justify-center'>
           <Hero pagetitle={"All Boards"} creating={false} title={title}/>
           </div>
          


           <div className="flex flex-wrap justify-center lg:justify-start w-full 
           mb-24 mt-8 lg:mt-4 lg:mb-0">
          {boardName?.length > 0 ? (
             
         
               
             <div className="flex justify-center gap-6 flex-wrap mt-8 w-full">
                    {boardName.map((boards)=>(
                           <div className="flex flex-col justify-center items-center w-64 h-52 p-12 
                           mb-6 bg-mywhitetext border-2 border-slate-200 rounded-md shadow-lg shadow-indigo-500/50 box-border" 
                           key ={boards.id}>
                          
                          <div>
 
                                {/*//this is link to kanban// */}
                              <button className='transition ease-in-out delay-150 text-myblue p-4 rounded-md hover:-translate-y-1 hover:scale-110 hover:bg-purple-200 duration-300'>
                              <Link to={`/${title}/${boards.boardTitle}/${boards.id}`} state={{ boardTitle: boards.boardTitle }}><h3 className='text-xs font-md'>{boards.boardTitle}</h3></Link> 
                              </button>  
                                 {/*  <p className="workspace-extra-css">Created By {user.displayName}</p> */}
                             
                          
                              </div>
                            <div className="flex w-full h-full justify-between gap-4 -mb-12 mt-20 pb-2 text-xs"> 
                            <p className='text-xs -ml-8'>{boards.createdAt}</p>  
                               <Trash2 onClick={()=>deleteItem(boards.id)} type="submit" value="Delete" className='cursor-pointer text-red-500 text-xs -mr-8 h-4' /> 
                            </div>
                            </div>
                       
                            
                          
                     
                    ))}
             
            </div>
        ):(
            <p className="flex justify-center items-center text-xl font-normal mt-14 text-center">
            {user ? 'No board is created by you. 🥹' : 'You have not created any workspaces yet.'}
          </p>
        )}
</div>
</div>
   </div>
    </div>
  )
}
