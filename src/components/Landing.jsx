import React from "react";  
import NewNav from "./NewNav";

import "./Landing.css";
import Board from "./Board";


const Landing = ({title}) =>{

    return(
    <>
      <div className="teamspace-css">
        <div className="teamspace-content">
        <h1>hello {title}</h1>
         <p>Yes this should be board</p>
       
        </div>
    

      </div>
       
        </>
    )
}

export default Landing;