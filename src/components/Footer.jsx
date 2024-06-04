import React from "react";

import { Facebook, Twitter,Instagram,Linkedin } from "react-feather";
import { Link } from "react-router-dom";
export default function Footer(){
    return(
       
            <footer className="flex flex-col justify-center items-center w-full bg-myblue text-center h-40 footer">
		  <span className="flex text-mytextwhite">Built with ❤️ by <Link to="https://prachip.netlify.app/" target="_blank" className="text-primary underline">Prachi.</Link></span>
		
	     </footer>
        
    )
}