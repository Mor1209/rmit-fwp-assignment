// This starter code is taken from the week08 practical

'use strict'

import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import errorController from './controllers/errorController.js'
import postRouter from './routes/PostRoutes.js'
import commentRouter from './routes/commentRoutes.js'
// const { sequelize } = require('./models')

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...')
  console.log(err)
  process.exit(1)
})

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(err)
  process.exit(1)
})

dotenv.config()

const app = express()

// Database will be sync'ed in the background.
// no need for sync since we use migration and sequilize-cli
// sequelize.sync()

// Parse requests of content-type - application/json.
app.use(express.json())

// Add CORS suport.
app.use(cors())

// Simple Hello World route.
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.use('/api/comments', commentRouter)
app.use('/api/posts', postRouter)

// Add user routes.
app.use('/rest-api/users', userRouter)

// All other routes result in 404
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Url: ${req.originalUrl} not found!`,
  })
})

// Requsts resulting in error call error Controller
app.use(errorController)

// Set port, listen for requests.
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
