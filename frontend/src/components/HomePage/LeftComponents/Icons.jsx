import React, { useContext } from 'react'

import { LuMessageSquareText } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaMeta } from "react-icons/fa6";

import { FaUsersViewfinder } from "react-icons/fa6";

import { IoSettingsOutline } from "react-icons/io5";

import { IoMdNotificationsOutline } from "react-icons/io";

import { ContextDef } from '../contextDef';
import './Icons.css'

function Icons() {

  const {middlePage,setMiddlePage,authUser}= useContext(ContextDef);


  return (
    <div className='Icons'>
        
        <div className='start' >

            <div className='Icon' style={{backgroundColor : middlePage==="chats" ? "#25d366" : ""}} onClick={()=>{setMiddlePage("chats")}}><LuMessageSquareText /></div>
            <div className='Icon' style={{backgroundColor : middlePage==="status" ? "#25d366" : ""}} onClick={()=>{setMiddlePage("status")}}><MdOutlineVideoLibrary /></div>
            <div className='Icon' style={{backgroundColor : middlePage==="channels" ? "#25d366" : ""}} onClick={()=>{setMiddlePage("channels")}}><GrChannel /></div>
            <div className='Icon' style={{backgroundColor : middlePage==="community" ? "#25d366" : ""}} onClick={()=>{setMiddlePage("community")}}><RiUserCommunityFill /></div>
            <div className='Icon' style={{backgroundColor : middlePage==="ai" ? "#25d366" : ""}} onClick={()=>{setMiddlePage("ai")}}><FaMeta /></div>
            <div className='Icon' style={{backgroundColor : middlePage==="addfriends" ? "#25d366" : ""}} onClick={()=>{setMiddlePage("addfriends")}}><FaUsersViewfinder /></div>
            <div className='Icon' style={{backgroundColor : middlePage==="notifications" ? "#25d366" : ""}} onClick={()=>{setMiddlePage("notifications")}}><IoMdNotificationsOutline  /></div>

        </div>


        <div className='end' >

            <div className='Icon' onClick={()=>{setMiddlePage("profile")}}><img className='Icon-Image' src={authUser.profilePic || "defaultImg.png"}></img></div>
            <div className='Icon' style={{backgroundColor : middlePage==="settings" ? "#25d366" : "white"}} onClick={()=>{setMiddlePage("settings")}}><IoSettingsOutline /></div>

        </div>

    </div>
  )
}

export default Icons
