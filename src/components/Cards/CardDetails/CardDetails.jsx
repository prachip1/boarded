import React, { useEffect, useState } from 'react';
import Modal from '../../../Modal/Modal';
import { Type, List, Calendar, Tag, CheckSquare, Trash, AlignLeft } from 'react-feather';
import Editable from '../../Editable/Editable';

import Chip from '../../Chip/Chip';


import './CardDetails.css';

export default function CardDetails(props){
    const colors = [
        '#ECEE81',
        '#8DDFCB',
        '#82A0D8',
        '#EDB7ED',
        
    ];
   const [activeColor, setActiveColor] = useState("");
  
    const [values, setValues] = useState({...props.card});

    

    

    const calculateProgress = () => {
    if(!values.tasks?.length) return 0;
       const completed = values.tasks?.filter(item => item.completed)?.length;

        return (completed / values.tasks?.length) * 100 ;
    };

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


    const addTask =(value) => {
        const task = {
            id: Date.now() + Math.random(),
            text: value,
            completed: false,
        }
        setValues({...values, tasks: [...values.tasks, task]});
    }

    const removeTask = (id) => {
        const tasks = [...values.tasks];

        const tempTasks = tasks.filter((item) => item.id !== id);
        setValues({
          ...values,
          tasks: tempTasks,
        });
    }

    const updateTask =(id, completed) =>{
        const index = values.tasks?.findIndex((item) => item.id === id)
        if(index < 0) return;

        const tempTasks = [...values.tasks];
        tempTasks[index].completed = completed;
        setValues({...values, tasks: tempTasks});
    }

    useEffect(()=>{
 
          if(
            values.title === props.card?.title &&
            values.date === props.card?.date &&
            values.desc === props.card?.desc &&
            values.labels?.length === props.card?.labels?.length &&
            values.tasks?.length === props.card?.tasks?.length
          )
           return;

           props.updateCard(props.card.id, props.boardId, values);
    },[values])

    const[dontShowMe, setDontShowMe] = useState(true)
    return(
       
     <Modal onClose ={()=> props.onClose()}>
        <>
      <div className="text-myblue card-details-main">
                
                <div className="card-details-box">
                    
                    <div className="card-details-box-title">
                     <Type />
                     Title
                    </div>
                    <div className="card-details-body">
                    <Editable 
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
                        <AlignLeft />
            
                     Description
                    </div>
                    <div className="card-details-body">
                    <Editable 
                    text ={values.desc}
                    default={values.desc}
                    placeholder = "Enter Description"
                    buttonText= "Add Description"
                    onSubmit = {(value => setValues({...values, desc: value}))}
                     />
                    </div>
                    
                 </div> 

                 <div className="flex flex-col gap-4">
                    <div className="flex gap-6 text-xl font-bold text-black">
                     <Calendar className='text-black' />
                     Date
                    </div>
                    <div className="w-fit">
                    <input type="date" 
                     className="text-lg w-48 bg-blue-200 text-myblue border-2 border-myblue outline-none p-4"
                    defaultValue={values.date}
                    min={new Date().toISOString().substring(0,10)}
                    onChange={(event) => setValues({...values, date: event.target.value})}
                    />
                    </div>

                   
                    
                 </div> 


                 <div className="card-details-box">
                    <div className="card-details-box-title">
                     <Tag />
                     Tags
                    </div>
                    <div className="card-deatils-box-labels">
                        {values.labels?.map((item,index ) => (
                            <Chip
                            close
                            onClose={() => removeLabel(item.text)}
                            key ={item.text + index}
                            color={item.color}
                            text={item.text}
                            />


                        )
                        
                        )}
                    </div>
                       
                    <div className="card-details-box-colors">
                        
                        {
                            colors.map((item,index) => (
                                <li key={index + item} style = {{ backgroundColor: item}}
                                className={item === activeColor ? "active" : ""}
                                onClick = {() => setActiveColor(item)}
                                />
                            ))}
                    </div>
                    <div className="card-details-body">
                    <Editable 
                    text={"Add labels"}
                    placeholder = "Enter Label"
                    buttonText= "Add Label"
                    onSubmit={(value) => addLabel(value, activeColor)}
                    />
                   
                    </div>
                    
                 </div> 
                
                 

                 <div className="card-details-box">
                    <div className="card-details-box-title">
                    <List />
                       Tasks
                    </div>
                   
                   <div className="card-details-progress-bar">
                    <div className = {`card-details-progress`}
                    style={{ 
                        width: `${calculateProgress()}%`,
                        backgroundColor: calculateProgress() === 100 ? "lightgreen" : "",
                    }} 
                        
                    />

                    
                   </div>
                  
                    {values.tasks?.map((item) => (
                         <div key={item.id} className="flex justify-between items-center">
                        <div className='bg-white'> <input className='bg-white w-4' type="checkbox" defaultValue={item.completed} 
                         onChange={(event) => updateTask(item.id, event.target.checked)}
                         /> </div>
                         <div><p>{item.text}</p> </div>
                        <div> <Trash onClick={() => removeTask(item.id)} className='w-4 text-red-500' /> </div>
                     </div>


                    ))}
                  
                   <div className="card-details-body">
                    <Editable 
                    text ={"Click to Add Task"}
                    placeholder = "Enter Task"
                    buttonText= "Add Task"
                    onSubmit= {(value) => addTask(value)}
                    />
                    </div>
                    
                 </div> 

            </div>
            </>
        </Modal>

       
    )
}