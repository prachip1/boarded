import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import WorkModal from './WorkModal';
import { ChevronDown } from 'react-feather';


export default function SideBar(props){
    const[showModal, setShowModal] = useState(false);



    return(
        <>
        <div className="side-main">
        
        <div className="sidebar-buttons">
       
        <p className='sidebar-create-p'>All Workspaces <ChevronDown /></p>
        <div className='dropdown-container'>
            <Link to='/create-work'>Floxies </Link>
            <Link to='/create-work'>Floxies New</Link>
            
        </div>
        <p className='sidebar-create-p' ><Link to="/board">All Boards</Link></p>
        </div>
       
          
        </div>
        </>
    );
}