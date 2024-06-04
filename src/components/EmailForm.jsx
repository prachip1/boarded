import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {db} from '../firebase';
import {collection, getDocs, addDoc,query,updateDoc,deleteDoc,doc,where, getDoc, serverTimestamp} from 'firebase/firestore';
import './EmailForm.css';
const EmailForm = ({title, workspaceId}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [shouldShowForm, setShouldShowForm] = useState(true);

  const [accessLevel, setAccessLevel] = useState('view');
  const invitedUserCollectionRef = collection(db, 'invitedUser');
  
  //function to store the invited user data


  const storeAccessInfo = async(accessLevel) =>{
    try{
        await addDoc(invitedUserCollectionRef,{ 
            accessLevel: accessLevel,
            email:email,
            title:title,
            workspaceId:workspaceId
          
        });

        console.log('Access Information stored in Firestore.');
        console.log("this is title",title, workspaceId)
       
    } catch(error){
        console.log('Error storing data', error)
    }
  
  }

  useEffect(() => {
    // Check if there is a token in the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // If a token is present, hide the form
      setShouldShowForm(false);
    }

   
  }, []); // Run this effect only once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to your backend server to send the email
    //  const response = await axios.post('http://localhost:5000/send-email', { email, message, title, workspaceId });
      //const token = response.data.token;
      const response = await axios.post('http://localhost:5000/send-email', { email, message, title, workspaceId });
      // Constructing email invitation
    //  const invitationLink = `http://localhost:3000/invitation?token=${token}`;

      // Store access information in Firestore
      // For demonstration, assuming user ID is retrieved from authenticationhttps://server-hq6e7878n-prachis-projects-74c95a62.vercel.app/
      //const userId = 'user123'; // Replace with actual user ID https://server-orpp7uh5p-prachis-projects-74c95a62.vercel.app
      await storeAccessInfo(accessLevel);

      // Send email with invitation link
     // await axios.post('http://localhost:5000/send-email', { email, message: `${message}\n\nClick here to view the invitation: ${invitationLink}` });
      alert('Email sent successfully!');
      
     
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    }
    setShouldShowForm(false);
  };


  return (
    <div className='email-form-main'>

 {shouldShowForm && <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      ></textarea>

        {/* Select access level */}
        <label htmlFor="accessLevel">Access Level:</label>
      <select
        id="accessLevel"
        value={accessLevel}
        onChange={(e) => setAccessLevel(e.target.value)}
      >
        <option value="view">View Only</option>
        <option value="edit">Edit</option>
      </select>

      <button type="submit">Send</button>
    </form> }
    
    </div>
  );
};

export default EmailForm;