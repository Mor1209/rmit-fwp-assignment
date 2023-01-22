// This starter code is taken from the week08 practical

'use strict'

import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import errorController from './controllers/errorController.js'
import postRouter from './routes/PostRoutes.js'
import commentRouter from './routes/commentRoutes.js'
import reactionRouter from './routes/reactionRoutes.js'

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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Add helmet
app.use(helmet())

// Add xss protection
app.use(xss())

// Add parameter pollution protection
// add whitelist if needed
app.use(hpp())

app.use(cookieParser())

// Simple Hello World route.
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.use('/comments', commentRouter)
app.use('/posts', postRouter)
app.use('/reactions', reactionRouter)

// Add user routes.
app.use('/users', userRouter)

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
