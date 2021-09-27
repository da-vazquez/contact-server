const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const contactRouter = require('./contact/contact-router')
const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(contactRouter)

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
})

server.get('/', (req, res) => {
  res.json({
    message: 'Contact Server Up and Running!'
  })
})


module.exports = server;
