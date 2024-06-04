import React from "react";

import './Modal.css';

export default function Modal (props){
    return(
        <div className="modal-main" 
        onClick={() => (props.onClose ? props.onClose() : "")}
         >


            <div className="modal-content custom-scroll"
            onClick = {(event) => event.stopPropagation()}
            >
                {props.children}
            </div>
        </div>

    );
}