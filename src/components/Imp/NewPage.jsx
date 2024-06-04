import React from 'react';

import NewNav from '../NewNav';
import WorkTitle from './WorkTitle';
import Board from './Board';

export default function NewPage(props){

    const sometitle = props.workspace?.title;

   
    return(
        <div>
            <NewNav />
            <WorkTitle sometitle={sometitle} />
            <Board />
        </div>
    )
}