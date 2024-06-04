import React,{ useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { MoreHorizontal, Users } from 'react-feather';
import WorkCard from "../Cards/WorkCard";

import Dropdown from '../Dropdown/Dropdown';
import Title from './Title';
import Board from '../Board';
import WorkTitle from './WorkTitle';



import './CreateWork.css';


export default function CreateWork(props){
 
  let [displayDropdown, setDisplayDropdown] = useState(false);
  const [someTitle, setSomeTitle] = useState("");


const newBoardOpen= url =>{
  window.open(url, '_blank', 'noopener, noreferrer');
  
};
//this page is for created card for workspace
  
  return(
       <>
         
        <div className="work_board no-custom-scroll">
           
        <div className="work_board_bg_image">
        <div className="board_top">
        
          <div className="board_top_more" onClick={()=>setDisplayDropdown((displayDropdown) => !displayDropdown)}>
               <MoreHorizontal />
              
               {
                displayDropdown && (
                 <Dropdown>
                  <div className="board_dropdown">
                   <p onClick ={() =>props.removeWork(props.workspace?.id)}>Delete WorkSpace</p>
                   </div>
                 </Dropdown>
               )}
              
               
             </div>
          </div>
          </div>
          <div className="board_cards no-custom-scroll">
          <p className="board_top_title">
              {props.workspace?.worktitle} </p>
               <div className="boards_card_invite">
            <button className='btn-check' type="button" onClick ={() => newBoardOpen('/board')}>Check Board</button> 
              <Users />

               </div>
         
               {
              props.workspace?.workcard?.map((item) => (
                <WorkCard key={item.id} workcard={item} 
                removeCard = {props.removeCard}
                boardId = {props.workspace?.id}
              
                updateCard = {props.updateCard}
                />
              ))
            }
          
        {/* <WorkEdit
             displayClass="board_cards_add"
             text="Add Card"
             placeholder="Enter Card Title"
            onSubmit = {(value) => props.addCard(value, props.workspace?.id)}
          /> */}
            </div> 
           
        </div>
        </>
    )
}