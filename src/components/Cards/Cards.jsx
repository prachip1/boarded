import React,{ useState} from 'react';
import { MoreHorizontal,Clock,CheckSquare } from 'react-feather';
import Dropdown from '../Dropdown/Dropdown';
import Chip from "../Chip/Chip";
import CardDetails from './CardDetails/CardDetails';

import './Card.css';




export default function Cards(props){
    const[showDropdown, setShowDropdown] = useState(false);
    const[showModal, setShowModal] = useState(false);
    const[openCardDetails,setOpenCardDetails] = useState(false);
    

    return(
       <>
       {openCardDetails && <CardDetails card= {props.card} 
         updateCard = {props.updateCard}
         boardId = {props.boardId}
    onClose ={() => setOpenCardDetails(false)} /> }
      

     {/*{openCardDetails && <CardDetails card= {props.card} 
         updateCard = {props.updateCard}
         boardId = {props.boardId}
         onClose ={() => setShowModal(false)} />} */}


      

        <div className="card" draggable 
        onDragEnd={()=>props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={()=>props.handleDragEnter(props.card?.id, props.boardId)} 
        //onClick ={() => setShowModal(true)}
        >
         <div className="card_top">
                <div className="card_labels">
                    {props.card?.labels?.map(item => (
                        <Chip key={item.id} text={item.text} color={item.color} />
                    ))}
                 
                </div>
                <div className="card_top_more" onClick={()=>setShowDropdown((showDropdown) => !showDropdown)}>
            <MoreHorizontal />
            {showDropdown && (  
             <Dropdown>
              <div className="card_dropdown">
              <p onClick={()=>setOpenCardDetails(true)}>Open Card Details</p>
              <p onClick={() => props.removeCard(props.card?.id, props.boardId)}>Delete Card</p>
             
              </div>
              </Dropdown>)}
           </div>
            </div>
                <div className="card_title">
                   {props.card?.title}
                </div>
                <div className="card_footer">
                    {
                        props.card?.date &&
                        <p>
                        <Clock />
                       {props.card?.date}
                    </p>
                    }
                    
                 
                    <p>
                        <CheckSquare />
                        {props.card?.tasks?.filter(item=>item.completed).length}/
                        {props.card?.tasks?.length}
                    </p>
                </div>
        </div>
    </>
    )
}