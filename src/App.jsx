
import React from 'react';

import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import './index.css';



import Home from './components/Home';
import WorkSpace from './components/WorkSpace';
import Landing from './components/Landing';

import SignIn from './components/Forms/SignIn';
import SignUp from './components/Forms/SignUp';

import Board from './components/Board';
import Kanban from './components/Kanban';
import CreateBoard from './components/CreateBoard';
import { UserProvider } from './components/UserContext';

import HowTo from './components/HowTo';

import InvitedUserView from './components/InvitedUserView';
import EmailForm from './components/EmailForm';
import WorkBoard from './components/Imp/WorkBoard';
import NewBoard from './components/NewWorks';
import NewWorks from './components/NewWorks';
import LoaderPage from './components/LoaderPage';
import Boards from './components/Boards';






function App() {

  return (
    <>
    <div>
      
     <Router>
     <UserProvider>

      <Routes>
      
        <Route exact path ="/" element={<Home />} />
      <Route path ="/landing" element={<Landing />} />
      <Route path="/signin" element={<SignIn/>} />
        <Route path ="/signup" element={<SignUp />} />
   
      <Route path="/createboard" element={<CreateBoard />} />
     
     <Route path="/board" element={<Board />} />  {/*this create a single board */}
     <Route path="/boards" element={<Boards />} />  {/*this displays all  boards */}
     <Route path ="/workspace" element={<WorkSpace />} />
      <Route exact path="/:works/:workspaceId/" element={<NewWorks/>} /> 
   
      <Route exact path="/:works/:boardTitle/:boardsId/" element={<Kanban />} />
       <Route path="/howto" element={<HowTo />} />
        <Route path="/send-email" element={<EmailForm />} />
        <Route path="/workboard" element={<WorkBoard />} />
        <Route path="/loaderpage" element={<LoaderPage />} />
      
      {/*create a path with token but same as kanban }
    

      
      {/*  <Route exact path ="/" element={<Home />} />
        <Route path="/WorkSpace" element={<WorkSpace />} />
        <Route path="/SideBar" element={<SideBar />} />
        <Route path="/createboard" element={<CreateBoard />} />
        
        <Route path="/creatework" element={<CreateWork />} />
        <Route path="/workboard" element={<WorkBoard/>} />
        <Route path="/worktitle" element={<WorkTitle/>} />
        <Route path="/newpage" element={<NewPage/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path ="/signup" element={<SignUp />} />*/}
    
     
      </Routes>
      </UserProvider>
    </Router>
    
    </div>
    </>

 
  );
}

export default App;
