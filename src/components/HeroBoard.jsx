import React from 'react';
import "./HeroBoard.css";
import LinkGenModal from './LinkGenModal';

export default function HeroBoard({pagetitle,workspacetitle, boardstitle,boardsId,showthis,creating, }) {
  
  return (
    <div className='heroboard-container'>
    
    {creating && <p>{boardstitle} / </p> } 
     <p>  {pagetitle} 🧾</p>
    {showthis && <LinkGenModal workspacetitle={workspacetitle} boardstitle={boardstitle} boardsId={boardsId}  /> } 
    
  

 
    </div>
  )
}

