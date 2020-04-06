import React, { useState, useEffect, useRef } from 'react'
import io from "socket.io-client";
import { makeStyles } from '@material-ui/styles'
import { TextField, Button, Paper, Divider, Typography} from '@material-ui/core'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  divider: {
    margin: '1rem 0'
  },
  inputText: {
    position: 'fixed',
    bottom: '56px',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    width: '92%',
  },
  btn: {
    color: '#fff',
    width: '40%',
    margin: 'auto'
  },
  context: {
    margin: '3rem 0',
    height: '100%',
    marginBottom: '16rem',

  },
  chat: {
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    overflowX: 'hidden',
    padding: '2rem',
    height: '100%'
  },
  myRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0.5rem 0'
  },
  myRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0.5rem 0'
  },
  partnerRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '0.5rem 0'
  },
  myMessage: {
    width: '45%',
    backgroundColor: '#58C9BE',
    color: '#fff',
    fontFamily: 'Raleway',
    fontSize: '1rem',
    fontWeight: 400,
    textAlign: 'center',
    padding: '1rem',
    borderRadius: '0.375rem',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
    wordBreak: 'break-word'
  },
  partnerMessage: {
    width: '45%',
    backgroundColor: '#F2F2F2',
    color: '#000',
    fontFamily: 'Raleway',
    fontSize: '1rem',
    fontWeight: 400,
    textAlign: 'center',
    padding: '1rem',
    borderRadius: '0.375rem',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
    wordBreak: 'break-word'
  }


})

function Chat() {
  const classes = useStyles()

  const [yourID, setYourID] = useState()
  const [messages, setMessages] = useState([]) //set a message thats why empty
  const [message, setMessage] = useState("") // the message that ties into the body

  const socketRef = useRef()

  const messagesEndRef = useRef(null)

  useEffect(() => {
    socketRef.current = io.connect('/'); //defined in packgae.json under proxy

    socketRef.current.on('your id', (id) => {
      setYourID(id);
    })

    socketRef.current.on('message', (message) => {
      console.log('here')
      receivedMessage(message)
    })
  }, [])

  
  const receivedMessage = (message) => {
    setMessages((oldMsgs) => [...oldMsgs, message]);
    scrollToBottom()
  }

  const sendMessage = () => {
    if(message && message.length > 0) {
      const messageObject = {
        body: message,
        id: yourID,
      }
      setMessage('')
      socketRef.current.emit('send message', messageObject)
    }
  }

  const handleOnClick = (e) => {
    e.preventDefault()
    sendMessage()
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      sendMessage()
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={classes.root}>
      <NavBar/>
      <div className={classes.context}>
        <Paper elevation={3} className={classes.chat}>
          <Typography variant="h5">Chat</Typography>
          <Divider className={classes.divider} />
          {messages.map((message, index) => {
            if (message.id === yourID) {
              return (
                <div className={classes.myRow} key={index}>
                  <div className={classes.myMessage}>{message.body}</div>
                </div>
              );
            }
            return (
              <div className={classes.partnerRow} key={index}>
                <div className={classes.partnerMessage}>{message.body}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </Paper>
      </div>
      <div className={classes.inputText}>
        <TextField 
          label=""
          multiline
          rows="5"
          placeholder="Send a message to your shopper... "
          value={message}
          onKeyDown={handleKeyDown}
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
          onClick={handleOnClick}
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
