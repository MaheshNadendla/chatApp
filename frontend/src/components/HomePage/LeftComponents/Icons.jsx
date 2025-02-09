import React, { useContext } from 'react'

import { LuMessageSquareText } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaMeta } from "react-icons/fa6";

import { IoSettingsOutline } from "react-icons/io5";
import { ContextDef } from '../contextDef';




function Icons() {

  const {setMiddlePage}= useContext(ContextDef);

  return (
    <div className='Icons'>
        
        <div className='start' >

            <div className='Icon' onClick={()=>{setMiddlePage("chats")}}><LuMessageSquareText /></div>
            <div className='Icon' onClick={()=>{setMiddlePage("status")}}><MdOutlineVideoLibrary /></div>
            <div className='Icon' onClick={()=>{setMiddlePage("channels")}}><GrChannel /></div>
            <div className='Icon' onClick={()=>{setMiddlePage("community")}}><RiUserCommunityFill /></div>
            <div className='Icon' onClick={()=>{setMiddlePage("ai")}}><FaMeta /></div>

        </div>


        <div className='end' >

            <div className='Icon' onClick={()=>{setMiddlePage("profile")}}>#</div>
            <div className='Icon' onClick={()=>{setMiddlePage("settings")}}><IoSettingsOutline /></div>

        </div>

    </div>
  )
}

export default Icons
