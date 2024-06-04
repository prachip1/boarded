import React,{ useEffect, useState } from 'react';
import { X, Users} from 'react-feather';
import './WorkModal.css';


export default function WorkModal({setShowModal}){
    const[workname, setWorkname] = useState('');
    const[workdesc, setWorkdesc] = useState('');
    const[modalOpen, setModalOpen] = useState(true);




   

    const cancelWorkspace=() =>{
        setModalOpen(false);
    }
  useEffect(()=>{},[workname, workdesc])


    return(

        <div className="work-modal">
            
              <div className="closebtn">
              <button onClick={() => setShowModal(false)}> <X /></button>
              </div>
              <div className="work-modal-header">
              <h1>Create Your Workspace</h1>
             </div>

             <div className="work-modal-body">
                <form>
                <input type="text" placeholder="Workspace Name" onChange={(event)=> {setWorkname (event.target.value)}} />
                <input type="text" placeholder="Workspace Description -- (Optional)" onChange={(event)=> {setWorkdesc (event.target.value)}}/>

                <div className="work-modal-invite-body">
                <input type="email" placeholder="Enter Email to invite" />
                <button>Add People <Users /></button>
                </div>
                <div className="btncoll">
                <button >Create</button>
                <button>Cancel</button>
                </div>
                </form>  
             
        
            </div>
    
        </div>
       
    )
}