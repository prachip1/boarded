import React, { useState } from "react";
import { X } from "react-feather";


export default function Editable(props){
    const[showEdit,setShowEdit] = useState(false);
    const [inputValue,setInputValue] = useState(props.text || "");
    
    
    return(
        <div className="w-100 overflow-hidden">
          
            { showEdit ? (
            <form className ="flex flex-col gap-6"
            onSubmit={(event)=>{
                event.preventDefault()
                if(props.onSubmit)props.onSubmit(inputValue)
                setShowEdit(false);
                setInputValue("");
            }}
            >
                <input
                className="text-sm bg-mytextwhite text-myblue border-2 border-myblue"
                autoFocus 
                type="text"
                value={inputValue}
                onChange = {(e)=> setInputValue(e.target.value)}
                placeholder={props.placeholder ||
                "Enter items"}/>

                <div className="flex gap-6 items-center">
                    <button className="pt-2 pb-2 pr-4 pl-4 bg-myblue rounded text-mytextwhite hover:font-bold cursor-pointer" type="submit">{props.buttonText || "Add"}</button>
                    <button className="pt-2 pb-2 pr-4 pl-4 bg-myblue rounded text-mytextwhite hover:font-bold cursor-pointer" type="submit" onClick={() => setShowEdit(false)}>Close</button>
                 {/** <X onClick={() => setShowEdit(false)} />  */}
                </div>
               
            </form>)
          :(

           <p className={`edit_display ${props.displayClass || ''}`} onClick={() => setShowEdit(true)}>{props.text || "Add"}</p>
          )}
        </div>
    );
}