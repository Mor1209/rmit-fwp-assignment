// This starter code is taken from the week08 practical

'use strict'

const express = require('express')
const cors = require('cors')
// const { sequelize } = require('./models')

// Database will be sync'ed in the background.
// no need for sync since we use migration and sequilize-cli
// sequelize.sync()

const app = express()

// Parse requests of content-type - application/json.
app.use(express.json())

// Add CORS suport.
app.use(cors())

// Simple Hello World route.
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

// Add user routes.
// require('./src/routes/user.routes.js')(express, app)
// require('./src/routes/post.routes.js')(express, app)

// Set port, listen for requests.
const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
