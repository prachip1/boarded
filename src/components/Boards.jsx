import React, { useState, useEffect } from 'react'
import {useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import Sidebar from './Sidebar';
import {db} from '../firebase';
import {collection, getDocs, addDoc,query,updateDoc,deleteDoc,doc,where, getDoc, serverTimestamp} from 'firebase/firestore';

export default function Boards() {
    const { workspaceId } = useParams();
    const { boardsId } = useParams();
    const {user}= useUser();
    const [boardsName, setBoardsName] = useState([]);
    const userCollectionRef1 = collection(db, `workspace/${workspaceId}/boards/${boardsId}/lists`);
    const title=useState("here"); 
    const navigate = useNavigate();
       
    useEffect(()=>{
    
        const userId = user ? user.uid : sessionStorage.getItem("userId");
        if (!userId) {
            navigate('/');
        } else {
            getBoardsData(userId);
            sessionStorage.setItem("userId", userId);
        }
         
         
      },[user]);

      const getBoardsData = async(userId) =>{
        try{
            console.log("Fetching workspaces for user:", userId);
                if(user){
                  const data= await getDocs(query(userCollectionRef1, where('createdBy', '==' , userId)));
  
                  console.log("data from back", data);
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
                        createdAt: formattedDate
                    };
                });
                console.log("Workspace data:", workspaceData);
                setBoardsName(workspaceData);
                }
                
                }
            catch(error){

            }
      }

  return (
    <div>
     <Sidebar />
      <h2>This will contain all boards from all workspaces.</h2>
      <div>
      {boardsName?.length > 0 ? (
                        <div>
                                
                            {boardsName.map((item) => (
                             <div key={item.id}>
                                  <div>
 
 {/*//this is link to kanban// */}
<h3 className='text-secondary'>{item.boardTitle}</h3>
  {/*  <p className="workspace-extra-css">Created By {user.displayName}</p> */}


</div>
<div> 
<p>{item.createdAt}</p>  

</div>

                            </div>

                            ))}
                        </div>
                    ) : (
                        <p>No boards yet</p>
                    )}
      </div>
    </div>
  )
}
