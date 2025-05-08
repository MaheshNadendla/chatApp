import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import MyStatus from './SubMiddle/MyStatus';
import StatusVideo from './SubMiddle/StatusVideo';

import './Status.css'

function Status() {
  return (
    <div className='Status'>
        
        <div className="StatusHeader">
          <label htmlFor="" className="StatusLabel">Status</label>
          <div className="StatusButtons">
            
            <div className="StatusPlus"><FaPlus/></div>
            <div className="StatusThreeLines"><BsThreeDotsVertical/></div>
            
            </div>
        </div>

        <div className="StatusBar">
              <MyStatus/>
              <div className="StatusBox">

                name
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
                <StatusVideo name="Your Name" time="Click to add Status update"/>
              </div>
        </div>

    </div>
  )
}

export default Status
