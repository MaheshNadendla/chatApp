import React, { useState } from 'react'

import { BsThreeDotsVertical } from "react-icons/bs";
import { LuMessageSquarePlus } from "react-icons/lu";

import { IoMdArrowBack } from "react-icons/io";

import { GrSearch } from "react-icons/gr";
import User from './SubMiddle/User';

function Chats() {
    const [searchDisplay,setSearchDisplay]=useState(true);
  return (
    <div className='Chats'>
      <div className='Nav'>

            <div className='NavLeft'>
                <label className='Charts'>Chats</label>
            </div>
            <div className='NavRight'>
                <div className='Icon'>< BsThreeDotsVertical/></div>
                <div className='Icon'><LuMessageSquarePlus/></div>
            </div>

      </div>
      <div className='Search'>
        <div className='SearchBox'>
          <button className='SearchBack'  onClick={()=>setSearchDisplay(!searchDisplay)}>
            {searchDisplay ? <GrSearch/> : <IoMdArrowBack/>  }
            </button>
          <input onClick={()=>setSearchDisplay(!searchDisplay)} className='SearchBar' placeholder={ searchDisplay ? "Search" : ""}  type='text'/ >
        </div>
        
      </div>
      <div className='List'>
        <div className='ListItem'>All</div>
        <div className='ListItem'>Unread</div>
        <div className='ListItem'>Favourites</div>
        <div className='ListItem'>Groups</div>
        <div className='ListItem'>Others</div>
      </div>
      <div className='Users'>
         
         <User name="one1"/>
         <User name="one2"/>
         <User name="one3"/>
         <User name="one4"/>

         <User name="one1"/>
         <User name="one2"/>

         <User name="one3"/>
         <User name="one4"/>
         
         <User name="one1"/>
         <User name="one2"/>
         <User name="one3"/>
         <User name="one4"/>
         
         <User name="one1"/>
         <User name="one2"/>
         <User name="one3"/>
         <User name="one4"/>
    

      </div>
      

    </div>
  )
}

export default Chats
