import React, { useContext } from 'react'
import { ContextDef } from '../../contextDef'

function User({name}) {

  const {setChatName} = useContext(ContextDef);
  const {messages}= useContext(ContextDef);
  const{userMessages,setUserMessages} = useContext(ContextDef);
  const{yourName}= useContext(ContextDef);

  const showMessages = ()=>{

    setChatName(name)
    setUserMessages([{senderId : null,message:null,reciverId : null}]);


    console.log(yourName+"  "+name);
    

    messages.forEach(user => {

      if((user.senderId===yourName && user.reciverId===name))
      {
        setUserMessages((p)=>{return [{senderId:user.senderId,message:user.message,reciverId : user.reciverId},...p]});
      }
      else if( (user.senderIdId===name && user.reciverId===yourName) )
      {
        setUserMessages((p)=>{return [{senderId:user.senderId,message:user.message,reciverId : user.reciverId},...p]});
      }
      
    });

    console.log(`User Messages : ${userMessages}`);

  }



  return (
    <div className='UserBoxs'>

        <div onClick={showMessages} className='User'>
                
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
