const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db')
const userRouter = require('./routes/user-router')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('use postman & mongoDB compass to make this work');
})

app.use('/api', userRouter)

app.listen(8000, () => {
    console.log('listening on port 8000');
})
