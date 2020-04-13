const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket.listen(server)

const db = require('./db')
const userRouter = require('./routes/user-router')
const orderRouter = require('./routes/order-router')
const listRouter = require('./routes/list-router')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors({ credentials: true }))

app.get('/', function(req, res){
  res.send('working');
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', userRouter)
app.use('/api', orderRouter)
app.use('/api', listRouter)

io.set('origins', '*:*')
io.on('connection', (socket) => {
  socket.emit('your id', socket.id)
  socket.on('send message', (body) => {
    io.emit('message', body)
  })
})

server.listen(8000, () => {
  console.log('listening on port 8000')
})
