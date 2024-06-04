import React, {useState, useEffect} from 'react';
import{ NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar(){


    const [toggleMenu, setToggleMenu] = useState(false);
    
   const toggleNav = () => {
    setToggleMenu(!toggleMenu)
   }

   const [screenWidth, setScreenWidth] = useState(window.innerWidth)

   useEffect(() => {
    const changeWidth = () => {
        
            setScreenWidth(window.innerWidth);
        
        
    }
    window.addEventListener('resize', changeWidth)
  
return () => {
    window.removeEventListener('resize', changeWidth)
}

}, [])

    return(
        <div className="main-navbar">
            
            <div className="logo">
              <ul>
                <li><NavLink to="/">SnapThat</NavLink></li>
              </ul>
            </div>
         <div className="nav-links">
         {(toggleMenu || screenWidth > 500) &&(
                 <ul className="ul-links">
                 <li className="li-links">
                   <NavLink to="/">Home</NavLink>
                   
                 </li>
                 <li className="li-links">
                     <NavLink to="/workspace">Workspace</NavLink>
                 </li>
                 <li className="li-links">
                     <NavLink to="/board">Board</NavLink>
                 </li>
                
             </ul>
             
            
            )}
             <button onClick={toggleNav} className="btn">Menu</button>
            </div>
        
        </div>
    );
}