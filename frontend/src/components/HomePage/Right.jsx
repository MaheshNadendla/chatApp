import React from 'react'
import MessagePart from './RightComponents/MessagePart'

function Right() {


  const rightStyle = {
    height: '100%',
    width: '55%',
    backgroundColor: '#f0f2f5',
  };

  return (
    <div style={rightStyle}>
        <MessagePart/>
    </div>
  )
}

export default Right
