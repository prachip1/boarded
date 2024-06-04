import React,{useEffect, useState} from 'react';
import {db} from '../firebase';
import {collection, getDocs,query} from 'firebase/firestore';
function AccessTo (){

const[view, setView] = useState([]);
const accessTable = collection(db,'access')
 const getAccessData = async() =>{
    const data= await getDocs(query(accessTable));
    console.log("this is giving user id",data);
   setView (data.docs.map(doc=>({
    id:doc.id,
    read:doc.data().read,
    write:doc.data().write
  })))
  console.log("from accesstable",view)
  }
  
  useEffect(() => { getAccessData();},[])
    return(
      <div>
        <form>
          <textarea placeholder='write something here...'/>
          <label for='view'>select view</label>
          {view.map((v)=>(
            <select name='view' key={v.id}>
            <option>{v.read}</option>
            <option>{v.write}</option>
          </select>
          
  
  
  ))
  }
    
          <button>Send Invite</button>
        </form>
      </div>
    )
  }

export default AccessTo;