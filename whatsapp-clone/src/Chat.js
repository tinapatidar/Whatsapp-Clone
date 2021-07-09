import { Avatar,IconButton } from '@material-ui/core';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmotiIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic'
import React, { useState , useEffect } from 'react'
import "./Chat.css";
import { AttachFile, SearchOutlined } from '@material-ui/icons';
import {useParams} from "react-router-dom";
import db from './firebase';
import firebase from "firebase";
import { useStateValue } from './StateProvider';


function Chat() {
    
    const [input , setInput] = useState("");
    const[messages,setMessages] = useState([]);
    const{roomId} = useParams();
    const[roomName, setRoomName] = useState("");
    const[{user},dispatch] = useStateValue();




    useEffect(()=>{
    if(roomId){
        db.collection('rooms').doc(roomId)
        .onSnapshot((snapshot)=>
             setRoomName(snapshot.data().name));

        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot)=>
        setMessages(snapshot.docs.map((doc)=>doc.data()))
        );
    };
    },[roomId]);



    

     const sendMessage = (e) =>{
         e.preventDefault();
         console.log("You typed>>>",input);
         db.collection('rooms').doc(roomId).collection('messages').add({
             message : input,
             name:user.displayName,
             timestamp:firebase.firestore.FieldValue.serverTimestamp(),
         })
         setInput("");
     }
    



    return (
        <div className= "chat">
            <div className="chat_header">
             <Avatar src = {`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>
             <div className="chat_headerInfo">
                 <h3 className = 'chat_room_name'>{roomName}</h3>
                 <p className="chat_room_last_seen"> Last seen {" "}
                 {new Date(
                     messages[messages.length-1]?.timestamp?.toDate()
                 ).toUTCString}</p>
             </div>
             <div className="chat_headerRight">
             <IconButton>
                  <DonutLargeIcon/>
                  </IconButton>
                 <IconButton>
                 <AttachFile/>
                 </IconButton>
                 <IconButton>
                 <MoreVertIcon/>
                 </IconButton>
                  
                  


             </div>

            </div>
             <div className="chat_body">
                 {messages.map((message)=>(
                     <p 
                     className={`chat_message ${message.name===
                     user.displayName && 'chat_receiver'}`}>
                     <span className = "chat_name">{message.name}</span>   
                         {message.message}
                         <span className="chat_timestamp">
                             {new Date(message.timestamp ?.toDate()).toUTCString()}
                         </span>
                     </p>

                 ))}
                 
             </div>
             <div className="chat_footer">
                 <InsertEmotiIcon />
                 <form>
                     <input value={input} onChange={(e) =>setInput(e.target.value)} placeholder= "type a message" type = "text"/>
                     <button onClick= {sendMessage} type = "submit">send message</button>
                 </form>
                 <MicIcon />


             </div>
        </div>

    )
}

export default Chat;
