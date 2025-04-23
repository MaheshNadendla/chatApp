
// import socket from '../../../socket';

// import React, { useContext, useEffect, useState} from 'react';

// import { BsThreeDotsVertical } from "react-icons/bs";
// import { LuMessageSquarePlus } from "react-icons/lu";

// import { IoMdArrowBack } from "react-icons/io";

// import { GrSearch } from "react-icons/gr";
// import User from './SubMiddle/User';
// import { ContextDef } from '../contextDef';

// function Chats() {
//     const [searchDisplay,setSearchDisplay]=useState(true);

//     const [users,setUsers]=useState([]);

    

//     const [newUser,setNewUser]=useState(null);







//     const {setYourName} = useContext(ContextDef);
 


//     useEffect(() => {
//       socket.on("new_user", (id) => {
//         // console.log("Received new_user event:", id); // Debugging log
//         setNewUser(id);
//         setYourName(id);
//       });

      

//       socket.emit("get_user_id");
    
//       return () => {
//         socket.off("new_user");
//       };
//     }, []);



//     useEffect(() => {
//       socket.on("allUsers", (data) => {
//         setUsers(data); // Update state with the latest users list
//       });
//       socket.emit("receive_users");
//       return () => {
//         socket.off("allUsers");
//       };
//     }, []);

//     // console.log(messages);



//   return (
//     <div className='Chats'>
//       <div className='Nav'>

//             <div className='NavLeft'>
//                 <label className='Charts'>{newUser}</label>
//             </div>
//             <div className='NavRight'>
//                 <div className='Icon'>< BsThreeDotsVertical/></div>
//                 <div className='Icon'><LuMessageSquarePlus/></div>
//             </div>

//       </div>
//       <div className='Search'>
//         <div className='SearchBox'>
//           <button className='SearchBack'  onClick={()=>setSearchDisplay(!searchDisplay)}>
//             {searchDisplay ? <GrSearch/> : <IoMdArrowBack/>  }
//             </button>
//           <input onClick={()=>setSearchDisplay(!searchDisplay)} className='SearchBar' placeholder={ searchDisplay ? "Search" : ""}  type='text'/ >
//         </div>
        
//       </div>
//       <div className='List'>
//         <div className='ListItem'>All</div>
//         <div className='ListItem'>Unread</div>
//         <div className='ListItem'>Favourites</div>
//         <div className='ListItem'>Groups</div>
//         <div className='ListItem'>Others</div>
//       </div>
//       <div className='Users'>

//         {
//             users.map((data,index)=>
//             (
//               <User  name={data} key={index}/>
//             ))
//         }

        



//          {/* <User name="one2"/>
//          <User name="one3"/>
//          <User name="one4"/>

//          <User name="one1"/>
//          <User name="one2"/>

//          <User name="one3"/>
//          <User name="one4"/>
         
//          <User name="one1"/>
//          <User name="one2"/>
//          <User name="one3"/>
//          <User name="one4"/>
         
//          <User name="one1"/>
//          <User name="one2"/>
//          <User name="one3"/>
//          <User name="one4"/> */}
    

//       </div>
      

//     </div>
//   )
// }

// export default Chats




// import socket from '../../../socket';
// import React, { useContext, useEffect, useState } from 'react';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { LuMessageSquarePlus } from "react-icons/lu";
// import { IoMdArrowBack } from "react-icons/io";
// import { GrSearch } from "react-icons/gr";
// import User from './SubMiddle/User';
// import { ContextDef } from '../contextDef';

// function Chats() {
//   const [searchDisplay, setSearchDisplay] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState(null); // Will hold the socket ID
//   const { setYourName } = useContext(ContextDef);
//   const [socketConnected, setSocketConnected] = useState(false);

//   useEffect(() => {
//     // This will run when the socket is connected
//     socket.on('connect', () => {
//       setSocketConnected(true);
//       console.log('Socket connected with ID:', socket.id); // Check socket ID on connection
//     });

//     // Once connected, emit `get_user_id`
//     if (socketConnected) {
//       socket.emit('get_user_id');
//     }

//     socket.on('new_user', (id) => {
//       console.log('Received new_user event:', id); // Debugging log
//       setNewUser(id); // Set the socket ID once received
//       setYourName(id); // Assuming you're setting the name based on socket ID
//     });

//     // Cleanup socket listeners
//     return () => {
//       socket.off('connect');
//       socket.off('new_user');
//     };
//   }, [socketConnected, setYourName]);

//   useEffect(() => {
//     socket.on('allUsers', (data) => {
//       setUsers(data); // Update state with the latest users list
//     });

//     socket.emit('receive_users'); // Emit event to get all users

//     // Cleanup
//     return () => {
//       socket.off('allUsers');
//     };
//   }, []);

//   return (
//     <div className='Chats'>
//       <div className='Nav'>
//         <div className='NavLeft'>
//           <label className='Charts'>{newUser ? newUser : 'Loading...'}</label>
//         </div>
//         <div className='NavRight'>
//           <div className='Icon'>< BsThreeDotsVertical /></div>
//           <div className='Icon'><LuMessageSquarePlus /></div>
//         </div>
//       </div>
//       <div className='Search'>
//         <div className='SearchBox'>
//           <button className='SearchBack' onClick={() => setSearchDisplay(!searchDisplay)}>
//             {searchDisplay ? <GrSearch /> : <IoMdArrowBack />}
//           </button>
//           <input onClick={() => setSearchDisplay(!searchDisplay)} className='SearchBar' placeholder={searchDisplay ? "Search" : ""} type='text' />
//         </div>
//       </div>
//       <div className='List'>
//         <div className='ListItem'>All</div>
//         <div className='ListItem'>Unread</div>
//         <div className='ListItem'>Favourites</div>
//         <div className='ListItem'>Groups</div>
//         <div className='ListItem'>Others</div>
//       </div>
//       <div className='Users'>
//         {
//           users.map((data, index) => (
//             <User name={data} key={index} />
//           ))
//         }
//       </div>
//     </div>
//   );
// }

// export default Chats;




import socket from '../../../socket';
import React, { useContext, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuMessageSquarePlus } from "react-icons/lu";
import { IoMdArrowBack } from "react-icons/io";
import { GrSearch } from "react-icons/gr";
import User from './SubMiddle/User';
import { ContextDef } from '../contextDef';

function Chats() {
  const [searchDisplay, setSearchDisplay] = useState(true);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(null); // Will hold the socket ID
  const { setYourName } = useContext(ContextDef);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    // Listen for socket connection
    socket.on('connect', () => {
      setSocketConnected(true);
      console.log('Socket connected with ID:', socket.id);
    });

    // Emit get_user_id once socket is connected
    if (socketConnected) {
      socket.emit('get_user_id');
    }

    // Listen for new user event and set the user's socket ID
    socket.on('new_user', (msg) => {
      console.log('Received new_user event:', msg.sid); // Debugging log
      setNewUser(msg.uid); // Set the socket ID once received
      setYourName(msg.sid); // Assuming you're setting the name based on socket ID
    });

    // Listen for all users event and update user list
    socket.on('allUsers', (data) => {
      setUsers(data); // Update users state with the latest list
    });

    // Request the list of users from the server
    socket.emit('receive_users');

    // Cleanup socket listeners when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('new_user');
      socket.off('allUsers');
    };
  }, [socketConnected, setYourName]);

  return (
    <div className="Chats">
      <div className="Nav">
        <div className="NavLeft">
          <label className="Charts">{newUser}</label>
        </div>
        <div className="NavRight">
          <div className="Icon"><BsThreeDotsVertical /></div>
          <div className="Icon"><LuMessageSquarePlus /></div>
        </div>
      </div>
      
      <div className="Search">
        <div className="SearchBox">
          <button className="SearchBack" onClick={() => setSearchDisplay(!searchDisplay)}>
            {searchDisplay ? <GrSearch /> : <IoMdArrowBack />}
          </button>
          <input 
            onClick={() => setSearchDisplay(!searchDisplay)} 
            className="SearchBar" 
            placeholder={searchDisplay ? "Search" : ""} 
            type="text" 
          />
        </div>
      </div>

      <div className="List">
        <div className="ListItem">All</div>
        <div className="ListItem">Unread</div>
        <div className="ListItem">Favourites</div>
        <div className="ListItem">Groups</div>
        <div className="ListItem">Others</div>
      </div>

      <div className="Users">
        {users.map((user, index) => (
          <User key={index} name={user} />
        ))}
      </div>
    </div>
  );
}

export default Chats;
