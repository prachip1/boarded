import React, { useEffect, useState } from 'react';
import Modal from '../../../Modal/Modal';
import { Type, List } from 'react-feather';
import WorkEdit from '../../Editable/WorkEdit';




import './WorkCardDetails.css';

export default function WorkCardDetails(props){
    const colors = [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
    ];
   const [activeColor, setActiveColor] = useState("");
  
    const [values, setValues] = useState({...props.workcard});


    const addLabel = (value, color) => {
        const index = values.labels?.findIndex((item) => item.text === value);
        if(index > -1) return;


        const label = {
            text: value,
            color,
        };
        setValues({...values, labels: [...values.labels, label]});
        setActiveColor("");
    };


    const removeLabel = (text) => {
      const tempLabels = values.labels?.filter(item => item.text !== text);

       setValues({...values, labels: tempLabels});
    };


 



    useEffect(()=>{
 
          if(
            values.title === props.workcard?.title &&
            values.desc === props.workcard?.desc &&
            values.email=== props.workcard?.email
          
          )
           return;

           props.updateCard(props.workcard.id, props.boardId, values);
    },[values])

    return(
       
         <Modal onClose ={()=> props.onClose()}>
            <div className="card-details-main">
                <div className="card-details-box">
                    <div className="card-details-box-title">
                     <Type />
                     Workspcace Name
                    </div>
                    <div className="card-details-body">
                    <WorkEdit
                    text ={values.title}
                   default = {values.title}
                    placeholder = "Enter Title"
                    buttonText= "Add Title"
                    onSubmit = {(value => setValues({...values, title: value}))}
                     />
                    </div>
                    
                 </div>   


                 <div className="card-details-box">
                    <div className="card-details-box-title">
                    <Type />
                     Description
                    </div>
                    <div className="card-details-body">
                    <WorkEdit
                    text ={values.desc}
                    default={values.desc}
                    placeholder = "Enter Description"
                    buttonText= "Add Description"
                    onSubmit = {(value => setValues({...values, desc: value}))}
                     />
                    </div>
                    
                 </div> 

                 <div className="card-details-box">
                    <div className="card-details-box-title">
                     <List />
                   Invite Email
                    </div>
                    <div className="card-details-body">
                    <WorkEdit
                    text ={values.email}
                    default={values.email}
                    placeholder = "Enter Email"
                    buttonText= "Send Invite"
                    onSubmit = {(value => setValues({...values, email: value}))}
                     />
                    </div>
                    
                 </div> 

          


                
        
                
                 

                 </div> 

          
        </Modal>

       
    )
}