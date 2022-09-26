const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
var sql = require("mssql");
var dbConfig = require('../Database/sqlConfig');
require('dotenv').config()

loginRouter.post('/', async (request, response) => {
  const body = request.body

  let pool = await sql.connect(dbConfig)
  let userSearch = await pool.request()
  .input('_user_name',sql.VarChar(25),body.username)
  .query('SELECT * FROM Users WHERE Username=@_user_name')
  let user = userSearch.recordset[0]
  console.log("username:"+body.username,"password"+body.password,user)
  
  const passwordCorrect = user === undefined
    ? false
    : await bcrypt.compare(body.password, user.password.trim())
  //let pwHash = user.password.trim()
  
  //console.log(body.password,await bcrypt.compare(body.password, pwHash))

  if (!(passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.Username,
    id: user.UserID,
    email: user.email
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, userid: user.UserID, username: user.Username, email: user.email })
})

module.exports = loginRouter