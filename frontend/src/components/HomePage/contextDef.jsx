
import {createContext, useState} from 'react'

export const ContextDef= createContext();

const ContextProvider =(props)=> 
    {

        const[middlePage,setMiddlePage]=useState("chats");
        const[chatName,setChatName]=useState(null);

        const[yourName,setYourName]=useState(null);
        const[messages,setMessages] = useState([{senderId : null,message:null,reciverId : null}]);
         const[userMessages,setUserMessages] = useState([{senderId : null,message:null,reciverId : null}]);

        return (
                <ContextDef.Provider value={{middlePage,setMiddlePage,chatName,setChatName,yourName,setYourName,messages,setMessages,userMessages,setUserMessages}}>
                    {props.children}
                </ContextDef.Provider>
        )
    }

export default ContextProvider