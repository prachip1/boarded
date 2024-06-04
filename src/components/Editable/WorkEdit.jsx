import React, { useState } from "react";
import { X, Plus} from "react-feather";

import './WorkEdit.css';

export default function WorkEdit(props){
    const[showEdit,setShowEdit] = useState(false);
    const [inputValue,setInputValue] = useState(props.text || "");

    console.log({inputValue})
  
   // this page is the editable form page for workspace.. where you create a workpace card but putting title 
    
    return(
        <div className="editable">
          
            { showEdit ? (  
            
            
            <form 
            className ={`edit_main ${props.editClass || ''}`}
            onSubmit={(event)=>{
                event.preventDefault()
                if(props.onSubmit)props.onSubmit(inputValue)
                setShowEdit(false);
                setInputValue("");
            }}
            >
                <input
                autoFocus 
                type="text"
                value={inputValue}
              
                onChange = {(e)=> setInputValue(e.target.value)}
                placeholder={props.placeholder ||
                "Enter Workspace Name"}/> 
               
            
            <div className="edit_footer">
                    <button type="submit">{props.buttonText || "Add"}</button>
                  <X onClick={() => setShowEdit(false)} />
                </div>  
                </form>
           
            )
          :(
          
           <p  className={`edit_display ${props.displayClass || ''}`}   
           onClick={() => setShowEdit(true)}><Plus className="plus" />{props.text || "Add item"} </p>
          )}
        </div>
    );
}