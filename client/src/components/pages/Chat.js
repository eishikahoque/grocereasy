import React, { useState, useEffect, useRef } from 'react'
import io from "socket.io-client";
import { makeStyles } from '@material-ui/styles'
import { TextField, Button } from '@material-ui/core'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'

const useStyles = makeStyles({
  inputText: {
    position: 'fixed',
    bottom: '58px',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    width: '100%',
  },
  btn: {
    color: '#fff',
    width: '40%',
    margin: 'auto 1rem'
  }
})

function Chat() {
  const classes = useStyles()

  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]); //set a message thats why empty
  const [message, setMessage] = useState(""); // the message that ties into the body

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/"); //defined in packgae.json under proxy

    socketRef.current.on("your id", (id) => {
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    });
  }, []);

  
  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }


  return (
    <div>
      <NavBar/>
      <div className={classes.context}>


      </div>
      <div className={classes.inputText}>
        <TextField 
          label=""
          placeholder="Send a message to your shopper... "
          value={message}
          onChange={handleChange}
          className={classes.textfield}
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={sendMessage}
          className={classes.btn}
        >
          Send
        </Button>
      </div>
      <BottomNavBar />
    </div>
  )
}

export default Chat
