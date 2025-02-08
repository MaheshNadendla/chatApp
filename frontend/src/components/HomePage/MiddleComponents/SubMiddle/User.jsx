import React from 'react'

function User({name}) {
  return (
    <div className='UserBoxs'>

        <div className='User'>
                
                <div className='PhotoBox'><div className='Photo'></div></div>
                <div className='MessagesInfo'>
                    <div className='NameBox'>
                      <div className='Name'>{name}</div>
                      <div className='Time'>time</div>
                    </div>
                    <div className='MessageBox'>
                      <div className='Message'>message</div>
                      <div className='UnreadCount'>5</div>
                    </div>
                </div>
            
        </div>
        <div className='LineBox'>
                    <div className='Empty'></div>
                    <div className='Line'></div>
        </div>

      
    </div>
  )
}

export default User
