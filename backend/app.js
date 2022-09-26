const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const musicRouter = require('./routes/music')
const userRouter = require('./routes/user')
const loginRouter = require('./controllers/login')

require('express-async-errors')
//const middleware = require('./utils/middleware')
//const logger = require('./utils/logger')

//logger.info('connecting to', config.<database server>)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(middleware.requestLogger)

app.use('/api/musics', musicRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app