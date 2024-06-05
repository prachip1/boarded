import React from 'react';
import "./HeroBoard.css";
import LinkGenModal from './LinkGenModal';

export default function HeroBoard({pagetitle,workspacetitle, boardstitle,boardsId,showthis,creating, }) {
  
  return (
    <div className='flex gap-14 items-center mt-4'>
    <div className='flex'>
    {creating && <p className='text-base text-myblue font-normal'>{boardstitle} / </p> } 
     <p className='text-base text-myblue font-normal'>  {pagetitle} 🧾</p> </div>
     <div>
    {showthis && <LinkGenModal workspacetitle={workspacetitle} boardstitle={boardstitle} boardsId={boardsId}  /> } 
    </div>
  

 
    </div>
  )
}

