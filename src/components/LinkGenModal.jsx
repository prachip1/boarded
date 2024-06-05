import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';

import { Share2 } from 'react-feather';




const LinkGenModal = ({workspacetitle, boardstitle, boardsId }) => {
  const [generatedLink, setGeneratedLink] = useState('');
  const [buttonText, setButtonText] = useState('COPY');
  const [display, setDisplay] = useState(true);

  const [modal, setModal] = useState(false);

  const {user}= useUser();

  const generateLink = () => {
    // Generate a unique token (you can use any logic for this)
    const token = generateToken();

    // Generate the link with the token appended
    const linkWithToken = `https://boarded.netlify.app/${workspacetitle}/${boardstitle}/${boardsId}?token=${token}`;

    // Set the generated link to the state
    setGeneratedLink(linkWithToken);
    setButtonText('COPY');

    alert('Link generated successfully!');
    setDisplay(false);
    setModal(true);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => {
        setButtonText('COPIED');
        setTimeout(() => setButtonText('CLOSE'), 2000); 
        // Reset button text after 2 seconds
      })
     
      .catch(err => console.error('Error copying to clipboard:', err));

      if(buttonText == 'CLOSE'){
        setModal(false)
        setDisplay(true)
      }
      
  };

  const generateToken = () => {
    // Implement your logic for generating a unique token
    // For example, you can use a combination of UUID and timestamp
    return 'xxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  

  return (
   
    <div>
      {user && (
    <div>
      {display && <button onClick={generateLink} className='flex gap-2 text-sm
      justify-center items-center bg-myblue p-2 gap-2 
      rounded-md hover:font-bold ml-2 mr-2'><Share2 className='w-4' />Share</button>}
      
     <div>
      { modal && (
        <div className='flex gap-4 ml-6'>
          <div className=''>  
            <Link to={generatedLink} target="_blank" rel="noopener noreferrer" className='text-myblue text-sm'>
            {generatedLink}
            </Link>
          </div>
         <button onClick={copyToClipboard} className='bg-myblue text-sm p-2 rounded-md hover:font-bold'>{buttonText}</button>
         

       
        </div>
       
      )}
       
      </div> 
    </div>
    )}
    </div>

  );
};

export default LinkGenModal;
