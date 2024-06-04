import React, { useState } from "react";
import { X, PlusCircle } from "react-feather";
import './OpenModal.css';

const OpenModal = ({
  text,
  editClass,
  onSubmit,
  placeholder,
  modalbuttonText,
  headerText
}) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [inputValue, setInputValue] = useState(text || "");

  const openModal = () => {
    setModalDisplay(true);
  };

  const closeDisplay = () => {
    setModalDisplay(false);
  };

  return (
    <div className="text-linkcolor">
      <div className="cursor-pointer">
     
        <button
        type="button"
        className="flex flex-col justify-center items-center lg:flex-row text-sm gap-2 bg-transparent border-0 lg:text-lg text-center"
        onClick={openModal}
        disabled={modalDisplay} // Disable button while modal is open
      ><PlusCircle/>
     Create
      </button>
      </div>
    

      {modalDisplay && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-modalbg flex flex-col justify-center items-center">
          <div className="flex flex-col text-center h-72 bg-mytextwhite relative rounded-md">
          <h6 className="mt-20">{headerText}</h6>
         
            <div className="text-myblue bg-transparent flex justify-center cursor-pointer absolute bg-mytextwhite rounded-lg">
              <X className="flex flex-col hover:text-red-500" onClick={closeDisplay} />
            </div>
            
        <div className="openmodal-main-content">
            <div className="createmodal-header"> 
          
          <img src="/desk14.png" alt="" />
          
         </div>
           <div className="openmodal-form">
            <form
              className="edit_mainmodal"
              onSubmit={(event) => {
                event.preventDefault();
                if (onSubmit) onSubmit(inputValue);
                setInputValue("");
                setModalDisplay(false); // Close modal after submission
              }}
            >
              <input
                autoFocus
                type="text"
                className="bg-mytextwhite text-myblue border-2 border-myblue p-4"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder || "Workspace Name"}
              />

              <div className="edit_footermodal">
                <button type="submit">{modalbuttonText || "Add"}</button>
              </div>
            </form>
            </div>
            
            
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenModal;
