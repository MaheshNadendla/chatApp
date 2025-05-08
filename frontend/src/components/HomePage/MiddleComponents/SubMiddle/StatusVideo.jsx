import React from 'react'
import './StatusVideo.css'
function StatusVideo({name,time}) {
  return (
    <div className='StatusVideoBox'>

      <div className='LineBox'>
                  <div className='Empty'></div>
                  <div className='Line'></div>
      </div>
      <div className='OthersStatus'>
                
                <div className='OthersStatusPhotoBox'><div className='OthersStatusPhoto'></div></div>
                <div className='OthersStatusMessagesInfo'>
                      <div className='OthersMyStatusName'>{name}</div>
                      <div className='OthersStatusClick'>{time}</div>
                </div>
            
      </div>
       
    </div>
  )
}

export default StatusVideo
