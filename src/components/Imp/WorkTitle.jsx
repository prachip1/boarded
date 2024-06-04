import React, {useState, useEffect} from "react";


export default function WorkTitle (props){


    return(
        <div>
            <h1 contentEditable="true" >[untitled]</h1>
          <h2>{props.sometitle}</h2>
        </div>
        
    )
}