import React, { useEffect, useRef } from 'react';
import './Dropdown.css';

export default function Dropdown(props){
   const dropdownRef = useRef();


    const handleClick=(event)=>{
        if (dropdownRef && !dropdownRef.current.contains(event.target)) {
            if(props.onClose)props.onClose()
        }
           
       

    };
    

     useEffect(() => {
    
        document.addEventListener('click',handleClick)

        return () => {
            document.removeEventListener('click',handleClick)
        }
     })




    return(
        <div ref={dropdownRef} className="boardandcard_dropdown"
         style = {{position:"absolute", top:"100%",right:"0"}}>
           {props.children}
        </div>
    )
}