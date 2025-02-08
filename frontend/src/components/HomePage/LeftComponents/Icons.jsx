import React from 'react'

import { LuMessageSquareText } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaMeta } from "react-icons/fa6";

import { IoSettingsOutline } from "react-icons/io5";


function Icons() {
  return (
    <div className='Icons'>
        
        <div className='start' >

            <div className='Icon'><LuMessageSquareText /></div>
            <div className='Icon'><MdOutlineVideoLibrary /></div>
            <div className='Icon'><GrChannel /></div>
            <div className='Icon'><RiUserCommunityFill /></div>
            <div className='Icon'><FaMeta /></div>

        </div>


        <div className='end' >

            <div className='Icon'>#</div>
            <div className='Icon'><IoSettingsOutline /></div>

        </div>

    </div>
  )
}

export default Icons
