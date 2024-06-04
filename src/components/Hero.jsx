import React from 'react';

import LinkGenModal from './LinkGenModal';
import OpenModal from './OpenModal';

export default function Hero({title, pagetitle, boardstitle,boardsId,showthis,creating}) {
  
  return (
    <div className='flex flex-col'>
     
      <h5>{title} /</h5>
     {creating && <p>{boardstitle} 🎈</p> }
     
       <h5>{pagetitle} 🧾</h5>
      
        {showthis && 
        <LinkGenModal boardstitle={boardstitle} boardsId={boardsId}  /> } 
    
  
       
    
    </div>
  )
}


