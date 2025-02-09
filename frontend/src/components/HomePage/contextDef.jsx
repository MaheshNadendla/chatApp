
import {createContext, useState} from 'react'

export const ContextDef= createContext();

const ContextProvider =(props)=> 
    {

        const[middlePage,setMiddlePage]=useState("chats");

        return (
                <ContextDef.Provider value={{middlePage,setMiddlePage}}>
                    {props.children}
                </ContextDef.Provider>
        )
    }

export default ContextProvider