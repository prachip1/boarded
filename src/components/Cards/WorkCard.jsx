import React,{ useState} from 'react';
import { MoreHorizontal,Clock,CheckSquare } from 'react-feather';
import Dropdown from '../Dropdown/Dropdown';
import Chip from "../Chip/Chip";
import WorkCardDetails from './CardDetails/WorkCardDetails';

import './WorkCard.css';




export default function WorkCard(props){
    const[showDropdown, setShowDropdown] = useState(false);
    const[showModal, setShowModal] = useState(false);
    

    return(
       <>
         {showModal && 
         
         <WorkCardDetails workcard= {props.workcard} 
         updateCard = {props.updateCard}
         boardId = {props.boardId}
         onClose ={() => setShowModal(false)} />}
      

        <div className="workcard" 
        onClick ={() => setShowModal(true)}
        >
         <div className="card_top">
                <div className="card_labels">
                    {props.workcard?.labels?.map(item => (
                        <Chip key={item.id} text={item.text} color={item.color} />
                    ))}
                 
                </div>
                <div className="card_top_more" onClick={()=>setShowDropdown((showDropdown) => !showDropdown)}>
            <MoreHorizontal />
            {showDropdown && (  
             <Dropdown>
              <div className="card_dropdown">
              <p onClick={() => props.removeCard(props.workcard?.id, props.boardId)}>Delete Card</p>
              </div>
              </Dropdown>)}
           </div>
            </div>
                <div className="card_title">
                   {props.workcard?.title}
                </div>
                <div className="card_footer">
                    {
                        props.workcard?.date &&
                        <p>
                        <Clock />
                       {props.workcard?.date}
                    </p>
                    }
                    
                 
                <p>Invite people</p>
                </div>
        </div>
    </>
    )
}