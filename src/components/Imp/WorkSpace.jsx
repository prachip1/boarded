import React,{ useEffect, useState } from 'react';
import './WorkSpace.css';
import SideBar from './SideBar';
import NewNav from '../NewNav';
import CreateWork from './CreateWork';
import WorkEdit from '../Editable/WorkEdit';
import { db } from '../../firebase';
import { setDoc,doc } from "firebase/firestore";

// this page is for the main page for all workspaces... just like a homepage for gallery

export default function WorkSpace(){

    const[workspace,setWorkspace] = useState(JSON.parse(localStorage.getItem('workspace')) || []);  //  creating the localstorage for input data on the workspace page


    const addWork = async (worktitle) => {
      
        setWorkspace ([...workspace, 
          {
          id: Date.now() + Math.random(),
          worktitle,
        
        },
      ]);
     await setDoc(doc(db, "workspace"),{
       workspace: workspace
     })
  
       };

       const removeWork = (bid) => {
      
        const tempBoards = workspace.filter(item => item.id !== bid)
          setWorkspace(tempBoards);
  
       };
  
       useEffect(() =>{
        localStorage.setItem('workspace', JSON.stringify(workspace));
       },[workspace]);
   
    return(
        <>
        <div className="top-content">  
        <NewNav />
       
       <div className="work-main">
      
       <div className="work-body-left">
        <SideBar />
       </div>
       <div className="work-body-right">
       
          {workspace.map((item) => (
           <CreateWork key={item.id} workspace={item} removeWork={removeWork} />
          ))} 
        
        <div className="workspace-edit">
          <WorkEdit text ="Add Workspace" onSubmit={(value) => addWork(value)} placeholder="Workspace Title" buttonText="Add Workspace" />
        </div>
        </div>
        </div>
        </div>
        </>
    );
}