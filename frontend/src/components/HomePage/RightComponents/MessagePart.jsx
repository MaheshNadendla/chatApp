import React, { useState } from 'react'
import { GrSearch } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";

import { FaPlus } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";

import { IoSendSharp } from "react-icons/io5";


import { RiEmojiStickerFill } from "react-icons/ri";

function MessagePart() {

        const[inputValue,setInputValue] = useState("");
    
    
          const[senderMessages,setSenderMessages] = useState([]);
    
          console.log(inputValue);
          console.log(senderMessages);


  return (
    <div className='MessagePart'>
        <div className='Top'>
          
            <div className='RightPhoto'>
              <div className="RPhoto"></div>
            </div>
            <div className="RightName">
              <div className="RName">Name (You)</div>
              <div className="RInfo">Click here for info</div>
            </div>
            <div className="RightIcons">
              <div className="RSearch"><GrSearch/></div>
              <div className="RThreeLines"><BsThreeDotsVertical/></div>
            </div>
          
        </div>


        <div className='Center'>
          
          {senderMessages.map((msg, index) => (
            <span key={index} className="RMess">
              {msg}
            </span>
          ))}
          
        </div>



        <div className='Bottom'>
          <div className="Plus"><FaPlus/></div>

          <div className="InputBar">
            
            <button className="Sticker"><RiEmojiStickerFill /></button>
              <input value={inputValue} type="text" onChange={(e)=>setInputValue(e.target.value)} className="RInput" />
            </div>

          <div className="Mic">
            
            {inputValue!=="" ? <IoSendSharp onClick={ ()=>{

                setSenderMessages( (p)=> [inputValue,...p]);
                setInputValue(""); 
              
              } } /> : <FaMicrophone/>}
            
            </div>
        </div>
    </div>
  )
}

export default MessagePart
