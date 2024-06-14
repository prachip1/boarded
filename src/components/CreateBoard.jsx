import React,{ useState } from 'react';
import { MoreHorizontal } from 'react-feather';
import Cards from "./Cards/Cards";

import Dropdown from './Dropdown/Dropdown';
import Editable from './Editable/Editable';
import WorkTitle from './Imp/WorkTitle';

import './CreateBoard.css';



export default function CreateBoard(props){
 
  let [displayDropdown, setDisplayDropdown] = useState(false); 


    
  return(
       <>
       <div className="board custom-scroll">  {/* the main board content */}
        <div className="flex">    
            {/* the title of the board */}
            <p className="flex flex-1 items-center gap-4">   
               <span>{`${props.board?.title}`}</span>
              <span className='text-md text-green-500'>{` ${props.board?.cards?.length}`}</span>
            </p>


             <div className="board_top_more" onClick={()=>setDisplayDropdown((displayDropdown) => !displayDropdown)}>
               <MoreHorizontal />
               {
                displayDropdown && (
                 <Dropdown>
                  <div className="board_dropdown">
                   <p onClick ={() =>props.removeBoard(props.board?.id)}>Delete board</p>
                   </div>
                 </Dropdown>
               )}
             </div>
          </div>
          <div className="pb-4 pt-4">
            {
              props.board?.cards?.map((item) => (
                <Cards key={item.id} card={item} 
                removeCard = {props.removeCard}
                boardId = {props.board?.id}
                handleDragEnd = {props.handleDragEnd}
                handleDragEnter = {props.handleDragEnter}
                updateCard = {props.updateCard}
                />
              ))
            }
          
           <Editable
             displayClass="board_cards_add"
             text="Add Card"
             placeholder="Enter Card Title"
            onSubmit = {(value) => props.addCard(value,props.board.id)}
           />
            </div>  
            
        </div>

        </>
    )
}