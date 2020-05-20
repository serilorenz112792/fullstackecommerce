const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(express.json())

const db = process.env.DB
const db2 = process.env.DB2

mongoose.connect(db2, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, () => {
    try {
        console.log('Connected to db')
    }
    catch (err) {
        console.log(err)
    }
})

app.use('/uploads', express.static('uploads'));


app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/product'))

//Serve static assets if we're in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(process.env.PORT, () => {
    try {
        console.log(`Running to port ${process.env.PORT}`)
    }
    catch (err) {
        console.log(err)
    }
})